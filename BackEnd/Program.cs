using System.Text;
using Asp.Versioning;
using BackEnd.Configuration;
using BackEnd.Data;
using BackEnd.interfaces;
using BackEnd.Middlewares;
using BackEnd.services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy
                .SetIsOriginAllowed(origin =>
                {
                    if (string.IsNullOrEmpty(origin)) return false;
                    var uri = new Uri(origin);
                    return uri.Host is "localhost" or "127.0.0.1";
                })
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
        else
        {
            policy
                .WithOrigins("http://localhost:3000", "http://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
    });
});

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});

var connectString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectString);
});

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt")
);

builder.Services.Configure<OpenRouterSettings>(
    builder.Configuration.GetSection(OpenRouterSettings.SectionName)
);

// Configuração de Autenticação JWT Bearer
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"] ?? string.Empty;
var jwtIssuer = jwtSection["Issuer"] ?? string.Empty;
var jwtAudience = jwtSection["Audience"] ?? string.Empty;

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidateIssuer = !string.IsNullOrWhiteSpace(jwtIssuer),
        ValidIssuer = jwtIssuer,
        ValidateAudience = !string.IsNullOrWhiteSpace(jwtAudience),
        ValidAudience = jwtAudience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddHttpClient<IAiRequestService, AiRequestService>((serviceProvider, client) =>
{
    var settings = serviceProvider.GetRequiredService<IOptions<OpenRouterSettings>>().Value;
    client.BaseAddress = new Uri(settings.BaseUrl);
    client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

public partial class Program { }
