using BackEnd.Data;
using BackEnd.interfaces;
using BackEnd.Middlewares;
using BackEnd.services;
using Microsoft.EntityFrameworkCore;
using BackEnd.Configuration;
using Asp.Versioning;
using Microsoft.Extensions.Options;

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
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
        else

        {
            policy
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
            ;
        }
    });
});

builder.Services.AddApiVersioning(options => {

    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    
});

var connectString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext> (options =>
{
    options.UseNpgsql(connectString);
    
});

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt")
);

builder.Services.Configure<OpenRouterSettings>(
    builder.Configuration.GetSection(OpenRouterSettings.SectionName)
);

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
app.MapControllers();
app.Run();

public partial class Program { }
