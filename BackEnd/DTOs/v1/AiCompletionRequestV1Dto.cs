namespace BackEnd.dtos.v1;

public class AiCompletionRequestV1Dto
{
    public record CompletionRequest(
        string Model,
        double Temperature,
        ResponseFormatDto ResponseFormatDto,
        IaMessage[] Messages,
        bool Stream = true
    );
    public record ResponseFormatDto(string Type);
    public record IaMessage(string Role, string Content);
}
