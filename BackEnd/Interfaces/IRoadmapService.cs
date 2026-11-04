using BackEnd.DTOs.v1;

namespace BackEnd.interfaces;

public interface IRoadmapService
{
    Task<ApiResponse<CreateRoadmapResponseV1Dto>> CreateRoadmapAsync(
        int userId,
        CreateRoadmapRequestV1Dto request,
        CancellationToken cancellationToken = default);

    Task<ApiResponse<CreateRoadmapResponseV1Dto>> GetRoadmapByIdAsync(
        int roadmapId,
        int userId,
        CancellationToken cancellationToken = default);

    Task<ApiResponse<IEnumerable<CreateRoadmapResponseV1Dto>>> GetUserRoadmapsAsync(
        int userId,
        CancellationToken cancellationToken = default);
}

