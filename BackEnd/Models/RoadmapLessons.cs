
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class RoadmapLessons
    {
        [Key]
        public int IdLesson { get; set; }
        
        [ForeignKey("RoadmapTopics")]
        public int RoadmapTopicId { get; set; }
        public string Subject { get; set; }
        public int PointsXp { get; set; }
        
        public RoadmapTopics RoadmapTopics { get; set; }
    }
}