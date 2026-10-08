#nullable enable
using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using BackEnd.Configuration;
using BackEnd.DTOs.v1;
using BackEnd.interfaces;
using Microsoft.Extensions.Options;

namespace BackEnd.services;

public class AiRequestService : IAiRequestService
{
    private readonly HttpClient _httpClient;
    private readonly OpenRouterSettings _settings;
    private readonly ILogger<AiRequestService> _logger;

    public AiRequestService(
        HttpClient httpClient,
        IOptions<OpenRouterSettings> settings,
        ILogger<AiRequestService> logger)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<ApiResponse<string>> RequestOpenRouterCompletion(
        AiCompletionRequestV1Dto request,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_settings.ApiKey))
        {
            _logger.LogError("[AI] A chave de API do OpenRouter não está configurada no backend.");
            return ApiResponse<string>.Erro("A integração com IA não está configurada corretamente.");
        }

        var model = string.IsNullOrWhiteSpace(request.Model) ? _settings.DefaultModel : request.Model;
        var requestPayload = request with { Model = model };

        var stopwatch = Stopwatch.StartNew();
        _logger.LogInformation("[AI] Requisição iniciada | model={Model}", model);

        try
        {
            var isEndpointIncluded = _httpClient.BaseAddress?.AbsolutePath.TrimEnd('/').EndsWith("chat/completions", StringComparison.OrdinalIgnoreCase) == true;
            var relativeUri = isEndpointIncluded ? "" : "chat/completions";

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, relativeUri)
            {
                Content = JsonContent.Create(requestPayload)
            };

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _settings.ApiKey);
            httpRequest.Headers.Add("HTTP-Referer", "https://devquest.local");
            httpRequest.Headers.Add("X-Title", "Dev-Quest");

            using var response = await _httpClient.SendAsync(httpRequest, cancellationToken);
            stopwatch.Stop();

            if (!response.IsSuccessStatusCode)
            {
                var statusCode = (int)response.StatusCode;

                _logger.LogWarning(
                    "[AI] Falha na resposta da API | statusCode={StatusCode} | duração={Duration}ms",
                    statusCode,
                    stopwatch.ElapsedMilliseconds);

                return response.StatusCode switch
                {
                    HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden =>
                        ApiResponse<string>.Erro("Falha de autenticação junto ao provedor de IA."),
                    HttpStatusCode.TooManyRequests =>
                        ApiResponse<string>.Erro("Limite de requisições à IA temporariamente excedido. Tente novamente em instantes."),
                    HttpStatusCode.BadRequest =>
                        ApiResponse<string>.Erro("Requisição inválida enviada ao provedor de IA."),
                    _ =>
                        ApiResponse<string>.Erro($"O provedor de IA retornou uma falha temporária ({statusCode}).")
                };
            }

            var completionResponse = await response.Content.ReadFromJsonAsync<AiCompletionResponseV1Dto>(
                cancellationToken: cancellationToken);

            var firstChoice = completionResponse?.Choices?.FirstOrDefault();
            var assistantContent = firstChoice?.Message?.Content?.Trim();

            if (string.IsNullOrEmpty(assistantContent))
            {
                _logger.LogWarning("[AI] Resposta da IA vazia ou sem choices válidas.");
                return ApiResponse<string>.Erro("O provedor de IA retornou uma resposta vazia.");
            }

            _logger.LogInformation(
                "[AI] Concluída com sucesso | model={Model} | duração={Duration}ms | prompt_tokens={PromptTokens} | completion_tokens={CompletionTokens}",
                model,
                stopwatch.ElapsedMilliseconds,
                completionResponse?.Usage?.PromptTokens ?? 0,
                completionResponse?.Usage?.CompletionTokens ?? 0);

            return ApiResponse<string>.Ok(assistantContent, "Resposta gerada com sucesso");
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            _logger.LogWarning("[AI] Requisição cancelada pelo cliente.");
            return ApiResponse<string>.Erro("A requisição foi cancelada.");
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogError(ex, "[AI] Timeout ao aguardar resposta do OpenRouter.");
            return ApiResponse<string>.Erro("Tempo limite excedido ao aguardar resposta da IA.");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "[AI] Falha de rede ou conexão recusada com o servidor de IA.");
            return ApiResponse<string>.Erro($"Não foi possível conectar ao provedor de IA ({_settings.BaseUrl}). Verifique se o serviço local está em execução.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[AI] Erro inesperado ao comunicar com OpenRouter.");
            return ApiResponse<string>.Erro("Ocorreu um erro interno ao processar a requisição de IA.");
        }
    }
}
