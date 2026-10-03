# Dev-Quest — BackEnd API

API REST desenvolvida em **.NET 10** para a plataforma **Dev-Quest**, oferecendo serviços de autenticação com segurança criptográfica, persistência de dados com PostgreSQL via Entity Framework Core, versionamento de rotas e integração com modelos de Inteligência Artificial (OpenRouter / APIs compatíveis com chat completions).

---

## 🛠️ Tecnologias e Bibliotecas

- **Framework**: [.NET 10 (ASP.NET Core Web API)](https://dotnet.microsoft.com/)
- **Linguagem**: C# 13 / 14
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Entity Framework Core 10](https://learn.microsoft.com/ef/core/) com [Npgsql.EntityFrameworkCore.PostgreSQL](https://www.npgsql.org/efcore/)
- **Autenticação & Criptografia**:
  - [BCrypt.Net-Next](https://github.com/BcryptNet/bcrypt.net): Hash seguro de senhas com salt automático.
  - [System.IdentityModel.Tokens.Jwt](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet): Emissão de tokens JWT com claims de usuário.
- **Versionamento de API**: [Asp.Versioning.Mvc](https://github.com/dotnet/aspnet-api-versioning) (suporte a versionamento semântico nas rotas `/api/v{version}/...`).
- **Documentação Interativa**: [Swagger / OpenAPI](https://swagger.io/) (`Swashbuckle.AspNetCore` e `Microsoft.AspNetCore.OpenApi`).
- **Resiliência e Comunicação HTTP**: `HttpClient` tipado gerenciado pelo `IHttpClientFactory` para chamadas resilientes ao serviço de IA.

---

## 📁 Estrutura do Projeto

O projeto adota uma arquitetura em camadas clara e desacoplada:

```text
BackEnd/
├── Configuration/               # Classes de configuração tipadas (Options Pattern)
│   ├── JwtSettings.cs           # Mapeamento das configurações de emissão do JWT
│   └── OpenRouterSettings.cs    # Configurações do provedor de IA (URL, Modelo, Chave, Timeout)
│
├── Controller/                  # Camada de apresentação e roteamento HTTP
│   └── v1/
│       ├── AuthV1Controller.cs  # Endpoints de cadastro e autenticação de usuários
│       └── AiV1Controller.cs    # Endpoint de comunicação com a Inteligência Artificial
│
├── Data/                        # Acesso a dados e persistência
│   └── AppDbContext.cs          # Contexto do banco de dados (Entity Framework Core)
│
├── DTOs/                        # Data Transfer Objects (Contratos de entrada/saída)
│   ├── ApiResponse.cs           # Envelope padronizado de resposta (Sucesso, Mensagem, Dados)
│   └── v1/
│       ├── UserV1Dto.cs         # DTOs de envio e retorno de usuário (UserV1Dto, UserV1Response)
│       ├── AiCompletionRequestV1Dto.cs  # Payload estruturado para envio de mensagens à IA
│       └── AiCompletionResponseV1Dto.cs # DTOs de leitura de resposta do provedor de IA
│
├── Interfaces/                  # Contratos de abstração para injeção de dependência
│   ├── IAuthService.cs          # Interface de regras de negócio de autenticação
│   ├── IJwtService.cs           # Interface do gerador de tokens JWT
│   └── IAiRequestService.cs     # Interface de comunicação com o provedor de IA
│
├── Middlewares/                 # Interceptadores do pipeline HTTP
│   └──  ExceptionMiddleware.cs  # Captura global de exceções e padronização de erro 500
│
├── Migrations/                  # Histórico de migrações do banco de dados (EF Core)
│   ├── 20260814152033_InitialCreate.cs
│   └── AppDbContextModelSnapshot.cs
│
├── Models/                      # Entidades de domínio mapeadas para o banco
│   └── User.cs                  # Entidade Users (Id, UserName, Email, Password)
│
├── Services/                    # Camada de lógica de negócios e integrações externas
│   ├── AuthService.cs           # Validação, hash de senha e orquestração de usuário
│   ├── JwtService.cs            # Assinatura de credenciais e construção de tokens JWT
│   └── AiRequestService.cs      # Cliente HTTP seguro com logs, métricas e tratamento de IA
│
├── BackEnd.http                 # Arquivo para testes de requisições diretas via VS Code / IDE
├── BackEnd.csproj               # Manifesto do projeto e dependências NuGet
└── Program.cs                   # Ponto de entrada, injeção de dependências e pipeline HTTP
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
    "ExpirationMinutes": 60
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
- Ferramenta de linha de comando do Entity Framework Core (opcional, instalável via `dotnet tool install --global dotnet-ef`)

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
- **Descrição:** Registra um novo usuário no banco com senha criptografada via BCrypt e retorna um token JWT de acesso imediato.
- **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "userName": "joaosilva",
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
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
- **Descrição:** Autentica o usuário validando login por e-mail ou username em conjunto com a senha criptografada.
- **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
  ```
  *(Ou informando `"userName"` no lugar de `"email"`)*
- **Respostas:**
  - `200 OK` — Autenticação bem-sucedida:
    ```json
    {
      "sucesso": true,
      "mensagem": "Bem vindo de volta joaosilva",
      "dados": {
        "userName": "joaosilva",
        "email": "joao@exemplo.com",
        "token": null
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

## 🛡️ Segurança e Resiliência

1. **Criptografia de Senhas**: As senhas são processadas com `BCrypt.Net-Next`, garantindo que nenhuma senha em texto plano seja persistida no banco.
2. **Tokens JWT com Assinatura Segura**: Implementação com `HmacSha256`, incluindo claims de `Subject`, `Email`, `UniqueName` e controle de expiração em minutos ou dias (`rememberMe`).
3. **Tratamento Centralizado de Erros**: O `ExceptionMiddleware` intercepta falhas inesperadas no pipeline e devolve um JSON padronizado com HTTP 500, evitando o vazamento de stack traces e detalhes internos da infraestrutura.
4. **Resiliência do Serviço de IA**:
   - Tratamento detalhado de códigos HTTP do provedor:
     - `401 / 403`: Detecta falha de credencial do provedor.
     - `429 (TooManyRequests)`: Alerta sobre sobrecarga ou rate limit temporário.
     - `400`: Informa payload ou modelo inválido.
   - Tratamento de `Timeout` (`TaskCanceledException`) e desconexão de rede (`HttpRequestException`).
   - Propagação de `CancellationToken` para que requisições interrompidas pelo cliente encerrem imediatamente a chamada externa.
   - Observabilidade com medição de latência em milissegundos e contagem de tokens consumidos via `ILogger`.
5. **Controle de CORS**:
   - Política `AllowFrontend` liberada em ambiente de desenvolvimento e restrita a `http://localhost:3000` em produção.

---

## 🧪 Testes Manuais com `BackEnd.http`

O arquivo `BackEnd.http` na raiz do projeto permite testar endpoints diretamente do Visual Studio, VS Code (com extensão REST Client) ou JetBrains Rider.

Exemplo de teste de IA:
```http
POST http://localhost:5263/api/v1/ai/completion
Content-Type: application/json
Accept: application/json

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

---

## 📌 Status e Próximos Passos Sugeridos

- [x] Arquitetura em camadas com Injeção de Dependências.
- [x] Autenticação e cadastro com hash de senha BCrypt.
- [x] Serviço de geração de tokens JWT.
- [x] Integração desacoplada e observável com IA (OpenRouter).
- [x] Middleware global para tratamento de exceções.
- [ ] Ativar proteção de rotas privadas com atributo `[Authorize]` nos endpoints necessários.
- [ ] Gerar e retornar o token JWT também no endpoint de Login (`AuthService.Authenticate`).
- [ ] Implementar política de Rate Limiting nativa no endpoint de IA para evitar abusos de requisições.
