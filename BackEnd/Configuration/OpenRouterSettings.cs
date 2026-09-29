namespace BackEnd.Configuration;

public class OpenRouterSettings
{
    public const string SectionName = "OpenRouter";

    private string _baseUrl = "https://openrouter.ai/api/v1/";
    private string _defaultModel = "meta-llama/llama-3-8b-instruct";
    private int _timeoutSeconds = 60;

    public string ApiKey { get; set; } = string.Empty;

    public string BaseUrl
    {
        get => string.IsNullOrWhiteSpace(_baseUrl) ? "https://openrouter.ai/api/v1/" : _baseUrl;
        set => _baseUrl = value;
    }

    public string DefaultModel
    {
        get => string.IsNullOrWhiteSpace(_defaultModel) ? "meta-llama/llama-3-8b-instruct" : _defaultModel;
        set => _defaultModel = value;
    }

    public int TimeoutSeconds
    {
        get => _timeoutSeconds <= 0 ? 60 : _timeoutSeconds;
        set => _timeoutSeconds = value;
    }
}
