using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using BackEnd.interfaces;
using BackEnd.DTOs.v1;


namespace BackEnd.controller;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/ai")]
public class AiV1Controller : ControllerBase
{
    private readonly IAiRequestService _aiService;

    public AiV1Controller(IAiRequestService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("completion")]
    public async Task<IActionResult> RequestCompletion([FromBody] AiCompletionRequestV1Dto request, CancellationToken cancellationToken)
    {
        var response = await _aiService.RequestOpenRouterCompletion(request, cancellationToken);
        if (!response.Sucesso)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}
