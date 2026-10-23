# Dev-Quest — BackEnd API

API REST desenvolvida em **.NET 10** para a plataforma **Dev-Quest**, oferecendo serviços de autenticação robusta (Access Token em memória RAM + Refresh Token persistido em Cookie HttpOnly com rotação OWASP), persistência de dados com PostgreSQL via Entity Framework Core, versionamento de rotas e integração com modelos de Inteligência Artificial (OpenRouter / APIs compatíveis com chat completions).

---

## 🛠️ Tecnologias e Bibliotecas

- **Framework**: [.NET 10 (ASP.NET Core Web API)](https://dotnet.microsoft.com/)
- **Linguagem**: C# 13 / 14
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Entity Framework Core 10](https://learn.microsoft.com/ef/core/) com [Npgsql.EntityFrameworkCore.PostgreSQL](https://www.npgsql.org/efcore/)
- **Autenticação & Criptografia**:
  - [BCrypt.Net-Next](https://github.com/BcryptNet/bcrypt.net): Hash seguro de senhas com salt automático.
  - [Microsoft.AspNetCore.Authentication.JwtBearer](https://learn.microsoft.com/aspnet/core/security/authentication/jwt-authn): Middleware e validação oficial de tokens JWT no pipeline do ASP.NET Core.
  - [System.IdentityModel.Tokens.Jwt](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet): Emissão de tokens JWT assinados com `HmacSha256`, claims e identificador `Jti`.
  - **Estratégia Híbrida de Tokens**: Access Token de curta duração (15 min) para estado volátil na RAM do Front-End + Refresh Token criptográfico de longa duração (7 dias) armazenado em Cookie `HttpOnly` com Rotação Automática de Tokens.
- **Versionamento de API**: [Asp.Versioning.Mvc](https://github.com/dotnet/aspnet-api-versioning) (suporte a versionamento semântico nas rotas `/api/v{version}/...`).
- **Documentação Interativa**: [Swagger / OpenAPI](https://swagger.io/) (`Swashbuckle.AspNetCore` e `Microsoft.AspNetCore.OpenApi`).
- **Resiliência e Comunicação HTTP**: `HttpClient` tipado gerenciado pelo `IHttpClientFactory` para chamadas resilientes ao serviço de IA.

---

## 📁 Estrutura do Projeto

O projeto adota uma arquitetura em camadas clara e desacoplada:

```text
BackEnd/
├── Configuration/               # Classes de configuração tipadas (Options Pattern)
│   ├── JwtSettings.cs           # Configurações de expiração do Access Token e Refresh Token
│   └── OpenRouterSettings.cs    # Configurações do provedor de IA (URL, Modelo, Chave, Timeout)
│
├── Controller/                  # Camada de apresentação e roteamento HTTP
│   └── v1/
│       ├── AuthV1Controller.cs  # Endpoints: register, login, refresh (silencioso) e logout
│       └── AiV1Controller.cs    # Endpoint de comunicação com a Inteligência Artificial
│
├── Data/                        # Acesso a dados e persistência
│   └── AppDbContext.cs          # Contexto do banco de dados (Entity Framework Core)
│
├── DTOs/                        # Data Transfer Objects (Contratos de entrada/saída)
│   ├── ApiResponse.cs           # Envelope padronizado de resposta (Sucesso, Mensagem, Dados)
│   └── v1/
│       ├── UserV1Dto.cs         # DTOs de envio e retorno de usuário (com RefreshToken protegido por [JsonIgnore])
│       ├── AiCompletionRequestV1Dto.cs  # Payload estruturado para envio de mensagens à IA
│       └── AiCompletionResponseV1Dto.cs # DTOs de leitura de resposta do provedor de IA
│
├── Interfaces/                  # Contratos de abstração para injeção de dependência
│   ├── IAuthService.cs          # Métodos de registro, login, refresh e logout/revogação
│   ├── IJwtService.cs           # Emissão de AccessToken (JWT) e RefreshToken criptográfico
│   └── IAiRequestService.cs     # Interface de comunicação com o provedor de IA
│
├── Middlewares/                 # Interceptadores do pipeline HTTP
│   └── ExceptionMiddleware.cs   # Captura global de exceções e padronização de erro 500
│
├── Migrations/                  # Histórico de migrações do banco de dados (EF Core)
│   ├── 20261023125354_AddRefreshTokenTable.cs # Tabela RefreshTokens vinculada a AppUsers
│   └── AppDbContextModelSnapshot.cs
│
├── Models/                      # Entidades de domínio mapeadas para o banco
│   ├── User.cs                  # Entidade Users (Id, UserName, Email, Password, Level)
│   ├── RefreshToken.cs          # Entidade RefreshTokens (Token, ExpiresAt, RevokedAt, UserId)
│   ├── UserTechProfile.cs       # Perfil técnico e trilhas de aprendizagem
│   ├── RoadmapTopics.cs         # Tópicos do roadmap
│   └── RoadmapLessons.cs        # Lições e assuntos de cada tópico
│
├── Services/                    # Camada de lógica de negócios e integrações externas
│   ├── AuthService.cs           # Validação, hash de senha, emissão e rotação de Refresh Token
│   ├── JwtService.cs            # Assinatura de JWT e geração de tokens aleatórios seguros
│   └── AiRequestService.cs      # Cliente HTTP seguro com logs, métricas e tratamento de IA
│
├── BackEnd.http                 # Arquivo para testes de requisições diretas via VS Code / IDE
├── BackEnd.csproj               # Manifesto do projeto e dependências NuGet
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

### Passo a Passo

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
   # ou https://localhost:7196/swagger (conforme a porta configurada no launchSettings.json)
   ```

---

## 📡 Endpoints da API (Versão 1.0)

Todas as respostas da API seguem o envelope padronizado `ApiResponse<T>`:

```json
{
  "sucesso": true,
  "mensagem": "Descrição do resultado",
  "dados": { ... }
}
```

---

### 1. Autenticação (`/api/v1/auth`)

#### 📌 Cadastro de Usuário
- **Rota:** `POST /api/v1/auth/register`
- **Descrição:** Registra um novo usuário no banco com senha criptografada via BCrypt. Emite o par de tokens: o **Access Token** é retornado no corpo da resposta para ser mantido na memória RAM do Front-End, e o **Refresh Token** é enviado através de um Cookie seguro `HttpOnly`.
- **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "userName": "joaosilva",
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
  ```
- **Cabeçalhos de Resposta:**
  ```http
  Set-Cookie: refreshToken=dGhpcy1pcy1hLXNlY3VyZS1yZWZyZXNoLXRva2Vu...; Path=/api/v1/auth; HttpOnly; SameSite=Lax
  ```
- **Respostas:**
  - `201 Created` — Cadastro realizado com sucesso:
    ```json
    {
      "sucesso": true,
      "mensagem": "Usuário cadastrado com sucesso",
      "dados": {
        "userName": "joaosilva",
        "email": "joao@exemplo.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  - `401 Unauthorized` — E-mail já cadastrado:
    ```json
    {
      "sucesso": false,
      "mensagem": "Essa conta já existe.",
      "dados": null
    }
    ```

---

#### 📌 Login de Usuário
- **Rota:** `POST /api/v1/auth/login`
- **Descrição:** Autentica o usuário validando login por e-mail ou username em conjunto com a senha criptografada. Emite um novo par de tokens (Access Token no body e Refresh Token via Cookie `HttpOnly`).
- **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
  ```
  *(Ou informando `"userName"` no lugar de `"email"`)*
- **Cabeçalhos de Resposta:**
  ```http
  Set-Cookie: refreshToken=dGhpcy1pcy1hLXNlY3VyZS1yZWZyZXNoLXRva2Vu...; Path=/api/v1/auth; HttpOnly; SameSite=Lax
  ```
- **Respostas:**
  - `200 OK` — Autenticação bem-sucedida:
    ```json
    {
      "sucesso": true,
      "mensagem": "Bem vindo de volta joaosilva",
      "dados": {
        "userName": "joaosilva",
        "email": "joao@exemplo.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  - `400 Bad Request` — Credenciais inválidas ou usuário inexistente:
    ```json
    {
      "sucesso": false,
      "mensagem": "Usuário ou senha incorretos",
      "dados": null
    }
    ```

---

#### 📌 Renovação Silenciosa de Sessão (Silent Refresh)
- **Rota:** `POST /api/v1/auth/refresh`
- **Descrição:** Renova o Access Token sem intervenção do usuário. O navegador anexa o Cookie `refreshToken` automaticamente. Aplica **Rotação de Refresh Token (OWASP)**: o token anterior é revogado no banco e um par totalmente novo é gerado.
- **Requisição:** Nenhum corpo obrigatório. O navegador envia o Cookie com `withCredentials = true` / `credentials: 'include'`.
- **Respostas:**
  - `200 OK` — Token renovado com sucesso:
    ```json
    {
      "sucesso": true,
      "mensagem": "Token renovado com sucesso",
      "dados": {
        "userName": "joaosilva",
        "email": "joao@exemplo.com",
        "token": "eyJhbGciOiJIUzI1NiIs..."
      }
    }
    ```
  - `401 Unauthorized` — Sessão expirada ou Refresh Token inválido/revogado (o cookie é automaticamente removido pelo servidor).

---

#### 📌 Logout e Encerramento de Sessão
- **Rota:** `POST /api/v1/auth/logout`
- **Descrição:** Revoga o Refresh Token ativo no banco de dados e limpa o Cookie `HttpOnly` do navegador.
- **Respostas:**
  - `200 OK` — Sessão encerrada:
    ```json
    {
      "sucesso": true,
      "mensagem": "Sessão encerrada com sucesso.",
      "dados": true
    }
    ```

---

### 2. Inteligência Artificial (`/api/v1/ai`)

#### 📌 Solicitação de Conclusão / Chat Completion
- **Rota:** `POST /api/v1/ai/completion`
- **Descrição:** Envia prompt e mensagens estruturadas para o provedor de IA configurado, retornando o conteúdo textual gerado pelo assistente com suporte a métricas de execução e cancelamento de requisição.
- **Corpo da Requisição (`AiCompletionRequestV1Dto`):**
  ```json
  {
    "model": "devQuest",
    "messages": [
      {
        "role": "user",
        "content": "Olá! Responda apenas: Conexão bem-sucedida!"
      }
    ],
    "temperature": 0.7,
    "stream": false
  }
  ```
- **Respostas:**
  - `200 OK` — Resposta gerada com sucesso pela IA:
    ```json
    {
      "sucesso": true,
      "mensagem": "Resposta gerada com sucesso",
      "dados": "Conexão bem-sucedida!"
    }
    ```
  - `400 Bad Request` — Erro de comunicação, limite de taxa ou falha no provedor externo:
    ```json
    {
      "sucesso": false,
      "mensagem": "Limite de requisições à IA temporariamente excedido. Tente novamente em instantes.",
      "dados": null
    }
    ```

---

## 🛡️ Arquitetura de Segurança de Tokens

A aplicação adota o padrão de mercado para proteção contra ataques **XSS (Cross-Site Scripting)** e **CSRF (Cross-Site Request Forgery)**:

```
                      ┌──────────────────────────────────────────┐
                      │                FRONT-END                 │
                      │  - Access Token: Estado RAM (React State)│
                      │  - Refresh Token: Cookie HttpOnly (Browser)│
                      └─────────────────────┬────────────────────┘
                                            │
                1. POST /login (Credenciais) │
                ◄───────────────────────────┤
                Retorna:                    │
                - Body: { token (access) }  │
                - Set-Cookie: refreshToken  │
                  (HttpOnly, Secure, SameSite, Path=/api/v1/auth)
                                            │
                2. Requisições normais à API│
                   (Header: Bearer <access>)│
                ───────────────────────────►│ Valida JWT no Middleware
                                            │
                3. Access Token expira (401)│
                ◄───────────────────────────┘
                                            │
                4. POST /auth/refresh       │
                   (Browser anexa o Cookie) │
                ───────────────────────────►│ Valida e Rotaciona no Banco
                ◄───────────────────────────┘ Devolve novo Access Token
                Novo Access Token na RAM    │ e atualiza Cookie do Refresh
```

1. **Access Token Volátil (RAM)**:
   - Expira em **15 minutos**.
   - Fica guardado **apenas na memória volátil** da aplicação front-end (ex: estado do React/Vue ou Context API).
   - **Nunca** é gravado no `localStorage` ou `sessionStorage`, prevenindo o roubo definitivo da sessão via injeções de script XSS.
2. **Refresh Token em Cookie `HttpOnly`**:
   - Expira em **7 dias**.
   - Possui as flags `HttpOnly = true`, `Secure = true` (em HTTPS), `SameSite = SameSiteMode.Lax` e `Path = "/api/v1/auth"`.
   - Scripts JavaScript **não possuem acesso de leitura** a esse cookie.
   - O escopo restrito (`Path = "/api/v1/auth"`) assegura que o cookie só trafegue em rotas de renovação e logout.
3. **Rotação de Refresh Token (OWASP)**:
   - A cada chamada ao `/api/v1/auth/refresh`, o token anterior é invalidado no banco (`RevokedAt = DateTime.UtcNow`) e um novo token é emitido.
   - Se um token comprometido tentar ser reutilizado, o sistema detecta a violação e encerra a sessão.
4. **CORS com Suporte a Credenciais**:
   - Política `AllowFrontend` com `.AllowCredentials()` e origens locais explícitas permitidas em desenvolvimento (`localhost:3000`, `localhost:5173`, etc.).
5. **Pipeline com `AddJwtBearer`**:
   - `app.UseAuthentication()` configurado antes de `app.UseAuthorization()`, validando assinaturas com `ClockSkew = TimeSpan.Zero`.
6. **Criptografia BCrypt**:
   - Senhas criptografadas com `BCrypt.Net-Next` com salt automático.

---

## 🧪 Como o Front-End Deve Consumir

1. **Configuração de Requisições (com envio de cookies)**:
   - **Axios**: `axios.defaults.withCredentials = true;`
   - **Fetch API**: `fetch(url, { credentials: 'include', ... })`
2. **Armazenamento**:
   - Guarde o `dados.token` em um estado (`useState` ou store global).
3. **Persistência ao Recarregar a Página (F5)**:
   - Ao iniciar a aplicação front-end, chame silenciosamente `POST /api/v1/auth/refresh`. Se o cookie for válido, a sessão é restaurada na RAM sem pedir nova senha ao usuário.
4. **Interceptor de Renovação Automática**:
   - Configure o interceptor de resposta para capturar `401 Unauthorized`, chamar `/api/v1/auth/refresh` e repetir a requisição original com o novo token de acesso.

---

## 🐳 Containerização com Docker (Multi-Stage Build)

A aplicação conta com um [Dockerfile](file:///c:/Users/Gal/Documents/Projetos/Dev-Quest/BackEnd/Dockerfile) configurado com a estratégia de **Multi-Stage Build**:

- **Estágio `builder` (`dotnet/sdk:10.0`)**: Restaura dependências, compila e gera os binários otimizados com cache de camadas.
- **Estágio `runtime` (`dotnet/aspnet:10.0`)**: Imagem final leve contendo apenas o runtime necessário, executando com o usuário não-root `app` (`USER app`).

### Como Construir e Executar
```bash
# Construir a imagem
docker build -t devquest-backend:latest .

# Executar o contêiner
docker run -d \
  --name devquest-api \
  -p 8080:8080 \
  -e ConnectionStrings__DefaultConnection="Host=host.docker.internal;Port=5432;Database=devquest;Username=seu_usuario;Password=sua_senha;" \
  -e Jwt__Key="sua-chave-secreta-super-segura-com-pelo-menos-32-caracteres" \
  -e OpenRouter__ApiKey="sua_chave_de_api" \
  devquest-backend:latest
```

---

## 📌 Status e Próximos Passos Sugeridos

- [x] Arquitetura em camadas com Injeção de Dependências.
- [x] Autenticação e cadastro com hash de senha BCrypt.
- [x] Geração e validação de tokens JWT (Access Token de 15 minutos).
- [x] Refresh Token persistido com Rotação Automática (OWASP) e Cookie `HttpOnly`.
- [x] Endpoints `/api/v1/auth/refresh` e `/api/v1/auth/logout`.
- [x] Pipeline de Autenticação JWT Bearer configurado nativamente no ASP.NET Core (`Program.cs`).
- [x] CORS configurado com suporte a Cookies HttpOnly (`AllowCredentials`).
- [x] Integração desacoplada e observável com IA (OpenRouter).
- [x] Middleware global para tratamento de exceções.
- [x] Containerização com Docker e Multi-Stage Build otimizado.
- [ ] Ativar proteção de rotas privadas com atributo `[Authorize]` nos endpoints necessários (ex: criação de perfis e tópicos).
- [ ] Implementar política de Rate Limiting nativa no endpoint de IA para evitar abusos de requisições.
