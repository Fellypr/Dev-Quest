namespace BackEnd.Configuration;

public class OpenRouterSettings
{
    public const string SectionName = "OpenRouter";

    private string _baseUrl = "http://147.15.108.122:20128/v1/chat/completions";
    private string _defaultModel = "devQuest";
    private int _timeoutSeconds = 60;

    public string ApiKey { get; set; } = string.Empty;

    public string BaseUrl
    {
        get => string.IsNullOrWhiteSpace(_baseUrl) ? "http://147.15.108.122:20128/v1/chat/completions" : _baseUrl;
        set => _baseUrl = value;
    }

    public string DefaultModel
    {
        get => string.IsNullOrWhiteSpace(_defaultModel) ? "devQuest" : _defaultModel;
        set => _defaultModel = value;
    }

    public int TimeoutSeconds
    {
        get => _timeoutSeconds <= 0 ? 60 : _timeoutSeconds;
        set => _timeoutSeconds = value;
    }
}
