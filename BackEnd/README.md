# Dev-Quest — BackEnd API

API REST de alta performance desenvolvida em **.NET 10 (C# 13/14)** para a plataforma de aprendizagem técnica gamificada **Dev-Quest**. 

O sistema oferece autenticação corporativa híbrida (Access Token em RAM + Refresh Token SHA-256 em Cookie HttpOnly com rotação OWASP), persistência relacional com PostgreSQL via Entity Framework Core, versionamento semântico de rotas e geração inteligente de trilhas de aprendizado (Roadmaps) com modelos de IA via OpenRouter.

---

## 📚 Documentação do Projeto

Para facilitar a navegação e a manutenção contínua, a documentação está organizada de forma modular:

* 📡 **[Especificação Completa da API (API.md)](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/docs/API.md)**: Todos os endpoints (Auth, IA, Roadmaps), contratos JSON de requisição/resposta, parâmetros e códigos HTTP.
* 🏗️ **[Arquitetura e Engenharia de Software (ARCHITECTURE.md)](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/docs/ARCHITECTURE.md)**: Camadas, fluxo de segurança de tokens (XSS/CSRF), pipeline pedagógico de IA e DTOs.
* 🗄️ **[Arquitetura de Dados e Esquema Relacional (schema.md)](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/schema.md)**: Diagrama ERD Mermaid, tabelas (`AppUsers`, `RefreshTokens`, `UserTechProfiles`, `RoadmapTopics`, `RoadmapLessons`) e integridade relacional.

---

## 🛠️ Tecnologias e Bibliotecas

- **Framework**: [.NET 10 (ASP.NET Core Web API)](https://dotnet.microsoft.com/)
- **Linguagem**: C# 13 / 14
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Entity Framework Core 10](https://learn.microsoft.com/ef/core/) com [Npgsql.EntityFrameworkCore.PostgreSQL](https://www.npgsql.org/efcore/)
- **Autenticação & Segurança**:
  - [BCrypt.Net-Next](https://github.com/BcryptNet/bcrypt.net): Hash de senhas com salt automático.
  - [Microsoft.AspNetCore.Authentication.JwtBearer](https://learn.microsoft.com/aspnet/core/security/authentication/jwt-authn): Validação nativa de JWT.
  - [System.IdentityModel.Tokens.Jwt](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet): Assinatura de tokens JWT (`HmacSha256`).
  - **Estratégia Híbrida OWASP**: Access Token volátil (15 min) na RAM do Front-End + Refresh Token criptográfico (7 dias) em Cookie `HttpOnly` com armazenamento em **Hash SHA-256** no banco de dados.
- **Versionamento de API**: [Asp.Versioning.Mvc](https://github.com/dotnet/aspnet-api-versioning) (rotas `/api/v{version}/...`).
- **Documentação Interativa**: [Swagger / OpenAPI](https://swagger.io/) (`Swashbuckle.AspNetCore` e `Microsoft.AspNetCore.OpenApi`).
- **Comunicação Resiliente**: `HttpClientFactory` tipado para integração com provedores de IA (OpenRouter).

---

## 📁 Estrutura do Projeto

```text
BackEnd/
├── Configuration/               # Classes de configuração tipadas (Options Pattern)
│   ├── JwtSettings.cs           # Parâmetros de JWT e tempos de expiração
│   └── OpenRouterSettings.cs    # Configurações do provedor de IA (URL, Modelo, Chave, Timeout)
│
├── Controller/                  # Camada de apresentação e roteamento HTTP
│   └── v1/
│       ├── AuthV1Controller.cs     # Endpoints: register, login, refresh e logout
│       ├── AiV1Controller.cs       # Endpoint de chat completion com a IA
│       └── RoadmapV1Controller.cs  # Endpoints: geração, busca e listagem de roadmaps
│
├── Data/                        # Persistência e contexto do EF Core
│   └── AppDbContext.cs          # Mapeamento das tabelas e regras de DeleteBehavior.Cascade
│
├── DTOs/                        # Data Transfer Objects (Contratos de entrada/saída)
│   └── v1/
│       ├── ApiResponse.cs               # Envelope padronizado de resposta (Sucesso, Mensagem, Dados)
│       ├── UserV1Dto.cs                 # DTOs de envio e retorno de autenticação
│       ├── AiCompletionRequestV1Dto.cs  # Payload estruturado para envio de mensagens à IA
│       ├── AiCompletionResponseV1Dto.cs # DTO de leitura de resposta do provedor de IA
│       ├── AiRoadmapOutputDto.cs        # Contrato de saída esperado do JSON da IA
│       ├── CreateRoadmapRequestV1Dto.cs # DTO de entrada para criação de roadmap
│       └── CreateRoadmapResponseV1Dto.cs# DTO completo com IDs persistidos e progresso
│
├── Interfaces/                  # Contratos de abstração para injeção de dependência
│   ├── IAuthService.cs          # Contrato de registro, login, refresh e logout
│   ├── IJwtService.cs           # Emissão de AccessToken, RefreshToken e Hash SHA-256
│   ├── IAiRequestService.cs     # Comunicação com a API de IA
│   └── IRoadmapService.cs       # Orquestração da geração e persistência de roadmaps
│
├── Middlewares/                 # Interceptadores do pipeline HTTP
│   └── ExceptionMiddleware.cs   # Captura global de exceções e padronização de erro 500
│
├── Migrations/                  # Histórico de migrações do banco (EF Core)
│   ├── 20261023125354_AddRefreshTokenTable.cs
│   ├── 20261120182825_RenameTokenToTokenHashInRefreshToken.cs
│   └── AppDbContextModelSnapshot.cs
│
├── Models/                      # Entidades de domínio mapeadas para o PostgreSQL
│   ├── User.cs                  # Tabela AppUsers
│   ├── RefreshToken.cs          # Tabela RefreshTokens (armazena TokenHash)
│   ├── UserTechProfile.cs       # Tabela UserTechProfiles (trilhas do usuário)
│   ├── RoadmapTopics.cs         # Tabela RoadmapTopics (módulos e desafios gamificados)
│   └── RoadmapLessons.cs        # Tabela RoadmapLessons (conteúdo teórico e didático)
│
├── Prompts/                     # Engenharia de prompts e guardrails pedagógicos
│   └── RoadmapPrompt.cs         # System prompts, guardrails anti-injection e construtor de mensagens
│
├── Services/                    # Regras de negócio e integrações externas
│   ├── AuthService.cs           # Lógica de login, hash de senha e rotação de sessão
│   ├── JwtService.cs            # Assinatura de JWT e geração de hash SHA-256
│   ├── AiRequestService.cs      # Cliente HTTP seguro com logs e tratamento de IA
│   └── RoadmapService.cs        # Validação, chamada de IA e transação atômica no banco
│
├── docs/                        # Documentação técnica complementar
│   ├── API.md                   # Catálogo completo de endpoints e exemplos JSON
│   └── ARCHITECTURE.md          # Detalhes de segurança, tokens e fluxos de IA
│
├── schema.md                    # Modelagem relacional e Diagrama ERD Mermaid
├── BackEnd.http                 # Arquivo para testes de requisições diretas via VS Code / IDE
├── BackEnd.csproj               # Manifesto do projeto e dependências NuGet
├── Dockerfile                   # Build multi-stage otimizado com usuário não-root
└── Program.cs                   # Ponto de entrada, injeção de dependências, CORS e autenticação
```

---

## ⚙️ Configuração do Ambiente

As configurações da aplicação residem nos arquivos `appsettings.json` ou `appsettings.Development.json` (ou via variáveis de ambiente / User Secrets):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=devquest;Username=seu_usuario;Password=sua_senha;"
  },
  "Jwt": {
    "Key": "sua-chave-secreta-super-segura-com-pelo-menos-32-caracteres",
    "Issuer": "DevQuestBackend",
    "Audience": "DevQuestFrontend",
    "ExpirationMinutes": 15,
    "RefreshTokenExpirationDays": 7
  },
  "OpenRouter": {
    "ApiKey": "sua_chave_de_api_openrouter_ou_provedor",
    "BaseUrl": "http://147.15.108.122:20128/v1/chat/completions",
    "DefaultModel": "devQuest",
    "TimeoutSeconds": 60
  },
  "AllowedHosts": "*"
}
```

> ⚠️ **Atenção:** Nunca versione chaves de API ou segredos JWT em commits públicos. Em ambiente de desenvolvimento local, prefira o uso do [.NET Secret Manager (`dotnet user-secrets`)](https://learn.microsoft.com/aspnet/core/security/app-secrets).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/) em execução
- Ferramenta de linha de comando do Entity Framework Core (`dotnet tool install --global dotnet-ef`)

### Passo a Passo Local

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd Dev-Quest/BackEnd
   ```

2. **Configure a string de conexão:**
   Atualize o valor de `ConnectionStrings:DefaultConnection` em `appsettings.Development.json` com suas credenciais do PostgreSQL.

3. **Aplique as Migrations no Banco de Dados:**
   ```bash
   dotnet ef database update
   ```

4. **Execute a aplicação:**
   ```bash
   dotnet run
   ```

5. **Acesse a documentação Swagger:**
   Abra no seu navegador:
   ```text
   http://localhost:5263/swagger
   # ou https://localhost:7196/swagger
   ```

---

## 🐳 Executando com Docker (Multi-Stage Build)

A aplicação conta com um [Dockerfile](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/Dockerfile) otimizado com **Multi-Stage Build**:
* **Estágio `builder` (`dotnet/sdk:10.0`)**: Compila os binários em modo Release com cache de camadas.
* **Estágio `runtime` (`dotnet/aspnet:10.0`)**: Executa a aplicação com o usuário sem privilégios de root (`USER app`).

```bash
# 1. Construir a imagem Docker
docker build -t devquest-backend:latest .

# 2. Executar o contêiner
docker run -d \
  --name devquest-api \
  -p 8080:8080 \
  -e ConnectionStrings__DefaultConnection="Host=host.docker.internal;Port=5432;Database=devquest;Username=seu_usuario;Password=sua_senha;" \
  -e Jwt__Key="sua-chave-secreta-super-segura-com-pelo-menos-32-caracteres" \
  -e OpenRouter__ApiKey="sua_chave_de_api" \
  devquest-backend:latest
```

---

## 📡 Resumo dos Endpoints da API

Para contratos completos, corpos de requisição e respostas detalhadas, consulte a **[Especificação da API (docs/API.md)](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/docs/API.md)**.

| Módulo | Método | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Cadastro com hash BCrypt, par de tokens e cookie HttpOnly |
| **Auth** | `POST` | `/api/v1/auth/login` | Login via e-mail ou username com emissão de sessão |
| **Auth** | `POST` | `/api/v1/auth/refresh` | Renovação silenciosa com Rotação de Refresh Token (OWASP) |
| **Auth** | `POST` | `/api/v1/auth/logout` | Revogação de sessão e limpeza do cookie |
| **IA** | `POST` | `/api/v1/ai/completion` | Chat completion resiliente com telemetria via OpenRouter |
| **Roadmaps** | `POST` | `/api/v1/roadmaps` | Geração com IA e persistência atômica da trilha no banco |
| **Roadmaps** | `GET` | `/api/v1/roadmaps/{id}` | Busca de roadmap detalhado por identificador |
| **Roadmaps** | `GET` | `/api/v1/roadmaps` | Listagem de todos os roadmaps do usuário |
| **Roadmaps** | `GET` | `/api/v1/roadmaps/user/{userId}` | Listagem de roadmaps por rota de usuário |

---

## 🧪 Como o Front-End Deve Consumir

1. **Configuração de Requisições (com envio de cookies)**:
   - **Axios**: `axios.defaults.withCredentials = true;`
   - **Fetch API**: `fetch(url, { credentials: 'include', ... })`
2. **Armazenamento de Credenciais**:
   - Guarde o `dados.token` (Access Token) no estado em memória da aplicação (`useState`, Pinia, Vuex ou Zustand).
   - **Nunca** salve tokens no `localStorage` ou `sessionStorage`.
3. **Restauração de Sessão (F5)**:
   - Ao iniciar a aplicação, faça uma requisição silenciosa para `POST /api/v1/auth/refresh`. Se o cookie for válido, a sessão é restaurada na memória sem solicitar nova senha ao usuário.
4. **Interceptor de Renovação Automática**:
   - Configure o interceptor de resposta HTTP para interceptar `401 Unauthorized`, chamar silenciosamente `/api/v1/auth/refresh` e reenviar a requisição original com o novo token de acesso.

---

## 📌 Status e Próximos Passos Sugeridos

- [x] Arquitetura em camadas com Injeção de Dependências.
- [x] Autenticação e cadastro com hash de senha BCrypt.
- [x] Geração e validação de Access Tokens JWT (15 minutos).
- [x] Refresh Token seguro em Cookie `HttpOnly` com Rotação Automática (OWASP).
- [x] Armazenamento de Refresh Token com **Hash SHA-256** no banco de dados.
- [x] Endpoints `/api/v1/auth/refresh` e `/api/v1/auth/logout`.
- [x] Módulo completo de Roadmaps com integração pedagógica à IA e persistência no PostgreSQL.
- [x] CORS configurado com suporte a Cookies HttpOnly (`AllowCredentials`).
- [x] Middleware global para tratamento uniforme de exceções (500).
- [x] Containerização com Docker e Multi-Stage Build otimizado.
- [ ] Ativar proteção de rotas privadas com atributo `[Authorize]` nos endpoints de roadmaps.
- [ ] Implementar política de Rate Limiting nativa no endpoint de IA para evitar abusos de requisições.
