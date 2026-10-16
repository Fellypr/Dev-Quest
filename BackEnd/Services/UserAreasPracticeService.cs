// using BackEnd.DTOs.v1;
// using BackEnd.interfaces;
// using Microsoft.EntityFrameworkCore;
// using BackEnd.Data;
// using BackEnd.Models;

// namespace BackEnd.Services
// {
//     public class UserAreasPracticeService : IUserAreasPracticeService
//     {
//         private readonly AppDbContext _context;

//         public UserAreasPracticeService(AppDbContext context)
//         {
//             _context = context;
//         }
//         public async Task<ApiResponse<UserAreasPracticeV1Response>> CreateUserAreasPractice(UserAreasPracticeV1Request request)
//         {
//             var userTechProfile = new UserTechProfile
//             {
//                 Specialty = request.Specialty,
//                 Stack = request.Stack,
//                 Language = request.Language,
//                 IdUser = request.IdUser
//             };
//             _context.UserTechProfiles.Add(userTechProfile);
//             await _context.SaveChangesAsync();
//             return new ApiResponse<UserAreasPracticeV1Response>
//             {
//                 Data = new UserAreasPracticeV1Response
//                 {
//                     RoadmapId = userTechProfile.RoadmapId,
//                     Specialty = userTechProfile.Specialty,
//                     Stack = userTechProfile.Stack,
//                     Language = userTechProfile.Language,
//                     IdUser = userTechProfile.IdUser
//                 }
//             };
//         }
//     }
// }