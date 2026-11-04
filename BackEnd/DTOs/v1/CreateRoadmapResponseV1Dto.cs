namespace BackEnd.DTOs.v1
{
    public class CreateRoadmapResponseV1Dto
    {
        public int RoadmapId { get; set; }
        public int IdUser { get; set; }
        public string Specialty { get; set; } = string.Empty;
        public string Stack { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string ExperienceLevel { get; set; } = string.Empty;
        public int TotalXp { get; set; }
        public int PercentProgress { get; set; }
        public List<RoadmapTopicResponseV1Dto> Topics { get; set; } = new();
    }

    public class RoadmapTopicResponseV1Dto
    {
        public int IdTopic { get; set; }
        public int RoadmapId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Challenge { get; set; } = string.Empty;
        public int PointsXpTotal { get; set; }
        public int PercentProgress { get; set; }
        public bool IsCompleted { get; set; }
        public List<RoadmapLessonResponseV1Dto> Lessons { get; set; } = new();
    }

    public class RoadmapLessonResponseV1Dto
    {
        public int IdLesson { get; set; }
        public int RoadmapTopicId { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string ExplanationOfTheSubject { get; set; } = string.Empty;
    }
}
