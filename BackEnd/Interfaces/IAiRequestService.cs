using BackEnd.dtos.v1;
using BackEnd.dtos;
namespace BackEnd.interfaces
{
    public interface IAiRequestService
    {
        Task<ApiResponse<string>> RequestOpenRouterCompletion(
            AiCompletionRequestV1Dto request,
            string apiKey,
            CancellationToken cancellationToken = default
        );
    }
}