using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Asp.Versioning;
using BackEnd.DTOs.v1;
using BackEnd.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.controller;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/roadmaps")]
public class RoadmapV1Controller : ControllerBase
{
    private readonly IRoadmapService _roadmapService;

    public RoadmapV1Controller(IRoadmapService roadmapService)
    {
        _roadmapService = roadmapService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRoadmap(
        [FromBody] CreateRoadmapRequestV1Dto request,
        [FromQuery] int? userId,
        CancellationToken cancellationToken)
    {
        if (!TryResolveUserId(userId, out var resolvedUserId))
        {
            return BadRequest(ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Identificador do usuário não informado ou inválido."));
        }

        var response = await _roadmapService.CreateRoadmapAsync(resolvedUserId, request, cancellationToken);
        if (!response.Sucesso)
        {
            return BadRequest(response);
        }

        return StatusCode(201, response);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetRoadmapById(
        [FromRoute] int id,
        [FromQuery] int? userId,
        CancellationToken cancellationToken)
    {
        if (!TryResolveUserId(userId, out var resolvedUserId))
        {
            return BadRequest(ApiResponse<CreateRoadmapResponseV1Dto>.Erro("Identificador do usuário não informado ou inválido."));
        }

        var response = await _roadmapService.GetRoadmapByIdAsync(id, resolvedUserId, cancellationToken);
        if (!response.Sucesso)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserRoadmaps(
        [FromQuery] int? userId,
        CancellationToken cancellationToken)
    {
        if (!TryResolveUserId(userId, out var resolvedUserId))
        {
            return BadRequest(ApiResponse<IEnumerable<CreateRoadmapResponseV1Dto>>.Erro("Identificador do usuário não informado ou inválido."));
        }

        var response = await _roadmapService.GetUserRoadmapsAsync(resolvedUserId, cancellationToken);
        if (!response.Sucesso)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetRoadmapsByUserRoute(
        [FromRoute] int userId,
        CancellationToken cancellationToken)
    {
        if (userId <= 0)
        {
            return BadRequest(ApiResponse<IEnumerable<CreateRoadmapResponseV1Dto>>.Erro("Identificador do usuário inválido."));
        }

        var response = await _roadmapService.GetUserRoadmapsAsync(userId, cancellationToken);
        if (!response.Sucesso)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    private bool TryResolveUserId(int? explicitUserId, out int userId)
    {
        if (explicitUserId.HasValue && explicitUserId.Value > 0)
        {
            userId = explicitUserId.Value;
            return true;
        }

        var claimValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (int.TryParse(claimValue, out var parsedClaimId) && parsedClaimId > 0)
        {
            userId = parsedClaimId;
            return true;
        }

        if (Request.Headers.TryGetValue("X-User-Id", out var headerValue) &&
            int.TryParse(headerValue, out var parsedHeaderId) && parsedHeaderId > 0)
        {
            userId = parsedHeaderId;
            return true;
        }

        userId = 0;
        return false;
    }
}

