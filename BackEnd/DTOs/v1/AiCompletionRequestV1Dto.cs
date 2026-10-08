#nullable enable
using System.Text.Json.Serialization;

namespace BackEnd.DTOs.v1;

public record AiCompletionRequestV1Dto(
    [property: JsonPropertyName("model")] string Model,
    [property: JsonPropertyName("messages")] IEnumerable<AiMessageV1Dto> Messages,
    [property: JsonPropertyName("temperature")] double? Temperature = null,
    [property: JsonPropertyName("response_format")] AiResponseFormatV1Dto? ResponseFormat = null,
    [property: JsonPropertyName("stream")] bool Stream = false
);

public record AiMessageV1Dto(
    [property: JsonPropertyName("role")] string Role,
    [property: JsonPropertyName("content")] string Content
);

public record AiResponseFormatV1Dto(
    [property: JsonPropertyName("type")] string Type
);
