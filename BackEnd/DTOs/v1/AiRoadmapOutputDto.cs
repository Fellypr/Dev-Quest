using System.Text.Json.Serialization;

namespace BackEnd.DTOs.v1
{
   
    public class AiRoadmapOutputDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("topics")]
        public List<AiTopicOutputDto> Topics { get; set; } = new();
    }

    public class AiTopicOutputDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("challenge")]
        public string Challenge { get; set; } = string.Empty;

        [JsonPropertyName("pointsXpTotal")]
        public int PointsXpTotal { get; set; }

        [JsonPropertyName("lessons")]
        public List<AiLessonOutputDto> Lessons { get; set; } = new();
    }

    public class AiLessonOutputDto
    {
        [JsonPropertyName("subject")]
        public string Subject { get; set; } = string.Empty;

        [JsonPropertyName("explanationOfTheSubject")]
        public string ExplanationOfTheSubject { get; set; } = string.Empty;
    }
}

