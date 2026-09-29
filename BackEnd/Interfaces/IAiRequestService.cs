using BackEnd.dtos;
using BackEnd.dtos.v1;

namespace BackEnd.interfaces;

public interface IAiRequestService
{
    Task<ApiResponse<string>> RequestOpenRouterCompletion(
        AiCompletionRequestV1Dto request,
        CancellationToken cancellationToken = default
    );
}