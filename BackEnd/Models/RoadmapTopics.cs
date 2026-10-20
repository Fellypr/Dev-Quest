using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BackEnd.Models
{
    public class RoadmapTopics
    {
        [Key]
        public int IdTopic { get; set; }
        
        [ForeignKey("UserTechProfiles")]
        public int RoadmapId { get; set; }

        public string Title { get; set; }
        public string Challenge { get; set; }
        public int PointsXpTotal { get; set; }
        public int PercentProgress { get; set; } = 0;
        public bool IsCompleted { get; set; } = false;
        public UserTechProfile UserTechProfiles { get; set; }
        public ICollection<RoadmapLessons> RoadmapLessons { get; set; }
    }
}