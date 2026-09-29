#nullable enable
using System.Text.Json.Serialization;

namespace BackEnd.dtos.v1;

public record AiCompletionResponseV1Dto(
    [property: JsonPropertyName("id")] string? Id,
    [property: JsonPropertyName("choices")] IReadOnlyList<AiChoiceV1Dto>? Choices,
    [property: JsonPropertyName("usage")] AiUsageV1Dto? Usage
);

public record AiChoiceV1Dto(
    [property: JsonPropertyName("finish_reason")] string? FinishReason,
    [property: JsonPropertyName("message")] AiMessageV1Dto? Message
);

public record AiUsageV1Dto(
    [property: JsonPropertyName("prompt_tokens")] int PromptTokens,
    [property: JsonPropertyName("completion_tokens")] int CompletionTokens,
    [property: JsonPropertyName("total_tokens")] int TotalTokens
);
