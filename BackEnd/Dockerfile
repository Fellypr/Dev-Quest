# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder
WORKDIR /src

COPY BackEnd.csproj ./
RUN dotnet restore "BackEnd.csproj"

COPY . ./
RUN dotnet publish "BackEnd.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app


COPY --from=builder /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

USER app

ENTRYPOINT ["dotnet", "BackEnd.dll"]
