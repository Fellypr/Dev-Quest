namespace BackEnd.Configuration;

public class OpenRouterSettings
{
    public const string SectionName = "OpenRouter";

    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://openrouter.ai/api/v1/";
    public string DefaultModel { get; set; } = "meta-llama/llama-3-8b-instruct";
    public int TimeoutSeconds { get; set; } = 60;
}
