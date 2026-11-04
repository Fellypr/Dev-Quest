#nullable enable
using System.Text.Json;
using BackEnd.Data;
using BackEnd.DTOs.v1;
using BackEnd.interfaces;
using BackEnd.Models;
using BackEnd.Prompts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BackEnd.services;

public class RoadmapService : IRoadmapService
{
    private readonly AppDbContext _context;
    private readonly IAiRequestService _aiRequestService;
    private readonly ILogger<RoadmapService> _logger;

    public RoadmapService(
        AppDbContext context,
        IAiRequestService aiRequestService,
        ILogger<RoadmapService> logger)
    {
        _context = context;
        _aiRequestService = aiRequestService;
        _logger = logger;
    }

    public async Task<ApiResponse<CreateRoadmapResponseV1Dto>> CreateRoadmapAsync(
        int userId,
        CreateRoadmapRequestV1Dto request,
        CancellationToken cancellationToken = default)
    {
        if (request == null)
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Requisição inválida.");
        }

        if (string.IsNullOrWhiteSpace(request.Specialty) ||
            string.IsNullOrWhiteSpace(request.Stack) ||
            string.IsNullOrWhiteSpace(request.Language))
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Especialidade, stack e linguagem são campos obrigatórios.");
        }

        var userExists = await _context.AppUsers.AnyAsync(u => u.Id == userId, cancellationToken);
        if (!userExists)
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Usuário não encontrado.");
        }

        var experienceLevel = string.IsNullOrWhiteSpace(request.ExperienceLevel) ? "Estagiario" : request.ExperienceLevel.Trim();
        var messages = RoadmapPrompt.CreateMessages(
            request.Specialty.Trim(),
            request.Stack.Trim(),
            request.Language.Trim(),
            experienceLevel
        );

        var aiRequest = new AiCompletionRequestV1Dto(
            Model: string.Empty,
            Messages: messages
        );

        var aiResponse = await _aiRequestService.RequestOpenRouterCompletion(aiRequest, cancellationToken);
        if (!aiResponse.Sucesso || string.IsNullOrWhiteSpace(aiResponse.Dados))
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro(aiResponse.Mensagem ?? "Falha ao gerar o roadmap com inteligência artificial.");
        }

        AiRoadmapOutputDto? aiRoadmap;
        try
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            aiRoadmap = JsonSerializer.Deserialize<AiRoadmapOutputDto>(aiResponse.Dados, options);
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Erro ao desserializar JSON do roadmap gerado pela IA.");
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("A resposta gerada pela IA não possui uma estrutura JSON válida.");
        }

        if (aiRoadmap == null || aiRoadmap.Topics == null || aiRoadmap.Topics.Count == 0)
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("O roadmap gerado pela IA não contém tópicos válidos.");
        }

        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            var profile = new UserTechProfile
            {
                IdUser = userId,
                Specialty = request.Specialty.Trim(),
                Stack = request.Stack.Trim(),
                Language = request.Language.Trim(),
                RoadmapTopics = aiRoadmap.Topics.Select(t => new RoadmapTopics
                {
                    Title = t.Title?.Trim() ?? string.Empty,
                    Challenge = t.Challenge?.Trim() ?? string.Empty,
                    PointsXpTotal = t.PointsXpTotal,
                    PercentProgress = 0,
                    IsCompleted = false,
                    RoadmapLessons = (t.Lessons ?? new List<AiLessonOutputDto>()).Select(l => new RoadmapLessons
                    {
                        Subject = l.Subject?.Trim() ?? string.Empty,
                        ExplanationOfTheSubject = l.ExplanationOfTheSubject?.Trim() ?? string.Empty
                    }).ToList()
                }).ToList()
            };

            _context.UserTechProfiles.Add(profile);
            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            var responseDto = MapToResponseDto(profile, experienceLevel);
            return ApiResponse<CreateRoadmapResponseV1Dto>.Ok(responseDto, "Roadmap gerado e salvo com sucesso.");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);
            _logger.LogError(ex, "Erro ao persistir o roadmap no banco de dados para o usuário {UserId}.", userId);
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Ocorreu um erro ao salvar o roadmap no banco de dados.");
        }
    }

    // Recuperar os detalhes completos de uma trilha específica para exibição na tela de estudos do aluno.
    public async Task<ApiResponse<CreateRoadmapResponseV1Dto>> GetRoadmapByIdAsync(
        int roadmapId,
        int userId,
        CancellationToken cancellationToken = default)
    {
        var profile = await _context.UserTechProfiles
            .Include(p => p.User)
            .Include(p => p.RoadmapTopics)
                .ThenInclude(t => t.RoadmapLessons)
            .FirstOrDefaultAsync(p => p.RoadmapId == roadmapId && p.IdUser == userId, cancellationToken);

        if (profile == null)
        {
            return ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Roadmap não encontrado.");
        }

        var responseDto = MapToResponseDto(profile, profile.User?.Level ?? string.Empty);
        return ApiResponse<CreateRoadmapResponseV1Dto>.Ok(responseDto);
    }
    
    // Listar todas as trilhas já criadas pelo usuário (para exibir no painel/dashboard de "Meus Roadmaps").
    public async Task<ApiResponse<IEnumerable<CreateRoadmapResponseV1Dto>>> GetUserRoadmapsAsync(
        int userId,
        CancellationToken cancellationToken = default)
    {
        var profiles = await _context.UserTechProfiles
            .Include(p => p.User)
            .Include(p => p.RoadmapTopics)
                .ThenInclude(t => t.RoadmapLessons)
            .Where(p => p.IdUser == userId)
            .OrderByDescending(p => p.RoadmapId)
            .ToListAsync(cancellationToken);

        var dtos = profiles.Select(p => MapToResponseDto(p, p.User?.Level ?? string.Empty)).ToList();
        return ApiResponse<IEnumerable<CreateRoadmapResponseV1Dto>>.Ok(dtos);
    }

    private static CreateRoadmapResponseV1Dto MapToResponseDto(UserTechProfile profile, string experienceLevel)
    {
        var topics = profile.RoadmapTopics?.Select(t => new RoadmapTopicResponseV1Dto
        {
            IdTopic = t.IdTopic,
            RoadmapId = t.RoadmapId,
            Title = t.Title,
            Challenge = t.Challenge,
            PointsXpTotal = t.PointsXpTotal,
            PercentProgress = t.PercentProgress,
            IsCompleted = t.IsCompleted,
            Lessons = t.RoadmapLessons?.Select(l => new RoadmapLessonResponseV1Dto
            {
                IdLesson = l.IdLesson,
                RoadmapTopicId = l.RoadmapTopicId,
                Subject = l.Subject,
                ExplanationOfTheSubject = l.ExplanationOfTheSubject
            }).ToList() ?? new List<RoadmapLessonResponseV1Dto>()
        }).ToList() ?? new List<RoadmapTopicResponseV1Dto>();

        var totalXp = topics.Sum(t => t.PointsXpTotal);
        var overallProgress = topics.Count > 0
            ? (int)Math.Round(topics.Average(t => t.PercentProgress))
            : 0;

        return new CreateRoadmapResponseV1Dto
        {
            RoadmapId = profile.RoadmapId,
            IdUser = profile.IdUser,
            Specialty = profile.Specialty,
            Stack = profile.Stack,
            Language = profile.Language,
            ExperienceLevel = !string.IsNullOrWhiteSpace(experienceLevel) ? experienceLevel : profile.User?.Level ?? string.Empty,
            TotalXp = totalXp,
            PercentProgress = overallProgress,
            Topics = topics
        };
    }
}
