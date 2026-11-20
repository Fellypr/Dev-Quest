# Especificação da API REST (v1.0) — Dev-Quest BackEnd

Documentação completa dos endpoints, contratos de requisição e resposta, cabeçalhos, parâmetros e regras de autenticação da API **Dev-Quest** (versão 1.0).

---

## 1. Padrões Globais da API

### 1.1. URL Base e Versionamento
* **Desenvolvimento Local:** `http://localhost:5263` ou `https://localhost:7196`
* **Docker:** `http://localhost:8080`
* **Padrão de Rota:** `/api/v1/{recurso}`

### 1.2. Envelope Padrão de Resposta (`ApiResponse<T>`)
Todas as rotas da API retornam respostas encapsuladas no padrão unificado:

```json
{
  "sucesso": true,
  "mensagem": "Descrição textual do resultado",
  "dados": { ... }
}
```

* Em caso de **sucesso**: `"sucesso": true`, `"dados"` contém o payload e `"mensagem"` confirma a operação.
* Em caso de **erro de negócio ou validação**: `"sucesso": false`, `"dados": null` e `"mensagem"` descreve a razão da falha.

### 1.3. Cabeçalhos Comuns
| Cabeçalho | Obrigatório? | Descrição |
| :--- | :--- | :--- |
| `Content-Type` | Sim (em POST/PUT) | `application/json` |
| `Accept` | Recomendado | `application/json` |
| `Authorization` | Em rotas protegidas | `Bearer <access_token>` |
| `X-User-Id` | Opcional | Identificador do usuário para testes ou clientes sem JWT |

---

## 2. Autenticação e Gestão de Sessão (`/api/v1/auth`)

O sistema adota uma estratégia híbrida: o **Access Token** (JWT de 15 minutos) é devolvido no corpo da resposta para manutenção no estado volátil da memória RAM, enquanto o **Refresh Token** (criptográfico de 7 dias) é enviado em um Cookie `HttpOnly` com rotação automática OWASP.

---

### 2.1. Cadastro de Usuário
Cria uma nova conta de usuário, criptografa a senha com BCrypt, gera o par de tokens e cria a sessão inicial.

* **Método / Rota:** `POST /api/v1/auth/register`
* **Autenticação:** Pública (não requer token)
* **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "userName": "joaosilva",
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
  ```
* **Cabeçalhos de Resposta:**
  ```http
  Set-Cookie: refreshToken=dGhpcy1pcy1hLXNlY3VyZS1yZWZyZXNoLXRva2Vu...; Path=/api/v1/auth; HttpOnly; SameSite=Lax
  ```
* **Respostas:**
  * `201 Created` — Cadastro realizado com sucesso:
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
  * `401 Unauthorized` — Conta já cadastrada:
    ```json
    {
      "sucesso": false,
      "mensagem": "Essa conta já existe.",
      "dados": null
    }
    ```

---

### 2.2. Login de Usuário
Autentica o desenvolvedor via e-mail ou username junto com a senha cadastrada.

* **Método / Rota:** `POST /api/v1/auth/login`
* **Autenticação:** Pública
* **Corpo da Requisição (`UserV1Dto`):**
  ```json
  {
    "email": "joao@exemplo.com",
    "password": "SenhaSegura123!"
  }
  ```
  *(Também é permitido enviar `"userName"` no lugar de `"email"`)*
* **Cabeçalhos de Resposta:**
  ```http
  Set-Cookie: refreshToken=dGhpcy1pcy1hLXNlY3VyZS1yZWZyZXNoLXRva2Vu...; Path=/api/v1/auth; HttpOnly; SameSite=Lax
  ```
* **Respostas:**
  * `200 OK` — Autenticação bem-sucedida:
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
  * `400 Bad Request` — Credenciais inválidas ou usuário inexistente:
    ```json
    {
      "sucesso": false,
      "mensagem": "Usuário ou senha incorretos",
      "dados": null
    }
    ```

---

### 2.3. Renovação Silenciosa de Sessão (Silent Refresh)
Renova o Access Token sem intervenção do usuário. Aplica **Rotação de Refresh Token (OWASP)**: o token anterior é invalidado no banco e um novo par é emitido.

* **Método / Rota:** `POST /api/v1/auth/refresh`
* **Autenticação:** Requer o Cookie `refreshToken` enviado automaticamente pelo navegador (`withCredentials = true` / `credentials: 'include'`).
* **Corpo da Requisição:** Vazio (`{}` ou sem corpo).
* **Respostas:**
  * `200 OK` — Sessão renovada com sucesso:
    ```json
    {
      "sucesso": true,
      "mensagem": "Token renovado com sucesso",
      "dados": {
        "userName": "joaosilva",
        "email": "joao@exemplo.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  * `401 Unauthorized` — Sessão expirada ou token revogado (o cookie é automaticamente limpo pelo servidor):
    ```json
    {
      "sucesso": false,
      "mensagem": "Sessão expirada. Faça login novamente.",
      "dados": null
    }
    ```

---

### 2.4. Logout e Encerramento de Sessão
Revoga o Refresh Token ativo no banco de dados e instrui o navegador a remover o cookie.

* **Método / Rota:** `POST /api/v1/auth/logout`
* **Autenticação:** Requer o Cookie `refreshToken`.
* **Corpo da Requisição:** Vazio.
* **Respostas:**
  * `200 OK` — Sessão encerrada:
    ```json
    {
      "sucesso": true,
      "mensagem": "Sessão encerrada com sucesso.",
      "dados": true
    }
    ```

---

## 3. Inteligência Artificial (`/api/v1/ai`)

---

### 3.1. Solicitação de Conclusão / Chat Completion
Envia mensagens estruturadas ao modelo de IA configurado (OpenRouter) com timeout resiliente e telemetria de execução.

* **Método / Rota:** `POST /api/v1/ai/completion`
* **Autenticação:** Aberta para clientes autorizados.
* **Corpo da Requisição (`AiCompletionRequestV1Dto`):**
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
* **Respostas:**
  * `200 OK` — Conclusão gerada com sucesso:
    ```json
    {
      "sucesso": true,
      "mensagem": "Resposta gerada com sucesso",
      "dados": "Conexão bem-sucedida!"
    }
    ```
  * `400 Bad Request` — Falha de comunicação, limite de taxa (429) ou erro no provedor:
    ```json
    {
      "sucesso": false,
      "mensagem": "Limite de requisições à IA temporariamente excedido. Tente novamente em instantes.",
      "dados": null
    }
    ```

---

## 4. Roadmaps e Trilhas de Aprendizado (`/api/v1/roadmaps`)

O módulo de roadmaps orquestra a geração de trilhas didáticas via IA e as persiste atomicamente no banco PostgreSQL (`UserTechProfiles`, `RoadmapTopics` e `RoadmapLessons`).

### 4.1. Resolução da Identidade do Usuário
Os endpoints de roadmaps identificam o usuário através do método de resolução hierárquica:
1. Parâmetro de Query: `?userId=123` (caso informado explicitamente).
2. Claims do JWT: `ClaimTypes.NameIdentifier` ou `sub` no cabeçalho `Authorization: Bearer <token>`.
3. Cabeçalho Customizado: `X-User-Id: 123`.

---

### 4.2. Criar Novo Roadmap Personalizado
Invoca o mentor de IA com base nas escolhas técnicas do desenvolvedor, valida a árvore pedagógica e persiste o roadmap completo em transação atômica.

* **Método / Rota:** `POST /api/v1/roadmaps`
* **Query Params Opcionais:** `?userId={id}`
* **Corpo da Requisição (`CreateRoadmapRequestV1Dto`):**
  ```json
  {
    "specialty": "Backend",
    "stack": ".NET 10 / ASP.NET Core",
    "language": "C#",
    "experienceLevel": "Junior"
  }
  ```
* **Respostas:**
  * `201 Created` — Roadmap gerado e gravado com sucesso:
    ```json
    {
      "sucesso": true,
      "mensagem": "Roadmap gerado e salvo com sucesso.",
      "dados": {
        "roadmapId": 1,
        "specialty": "Backend",
        "stack": ".NET 10 / ASP.NET Core",
        "language": "C#",
        "topics": [
          {
            "idTopic": 1,
            "title": "Fundamentos de Web APIs em .NET",
            "challenge": "Construir uma API REST com injeção de dependência e persistência EF Core.",
            "pointsXpTotal": 100,
            "percentProgress": 0,
            "isCompleted": false,
            "lessons": [
              {
                "idLesson": 1,
                "subject": "Controllers e Roteamento",
                "explanationOfTheSubject": "Entenda como configurar rotas com atributos e receber DTOs tipados."
              },
              {
                "idLesson": 2,
                "subject": "Injeção de Dependência",
                "explanationOfTheSubject": "Aprenda as diferenças entre AddTransient, AddScoped e AddSingleton."
              }
            ]
          }
        ]
      }
    }
    ```
  * `400 Bad Request` — Usuário não informado, campos obrigatórios ausentes ou resposta da IA inválida:
    ```json
    {
      "sucesso": false,
      "mensagem": "Especialidade, stack e linguagem são campos obrigatórios.",
      "dados": null
    }
    ```

---

### 4.3. Buscar Roadmap por ID
Retorna a árvore completa de tópicos e lições de um roadmap específico pertencente ao usuário.

* **Método / Rota:** `GET /api/v1/roadmaps/{id}`
* **Parâmetros de Rota:** `id` (inteiro) — ID do Roadmap (`RoadmapId`).
* **Query Params Opcionais:** `?userId={id}`
* **Respostas:**
  * `200 OK` — Roadmap encontrado:
    ```json
    {
      "sucesso": true,
      "mensagem": "Roadmap carregado com sucesso.",
      "dados": {
        "roadmapId": 1,
        "specialty": "Backend",
        "stack": ".NET 10 / ASP.NET Core",
        "language": "C#",
        "topics": [ ... ]
      }
    }
    ```
  * `404 Not Found` — Roadmap não encontrado ou não pertencente ao usuário:
    ```json
    {
      "sucesso": false,
      "mensagem": "Roadmap não encontrado ou não pertence ao usuário informado.",
      "dados": null
    }
    ```

---

### 4.4. Listar Todos os Roadmaps do Usuário Atual
Retorna todas as trilhas cadastradas para o usuário autenticado.

* **Método / Rota:** `GET /api/v1/roadmaps`
* **Query Params Opcionais:** `?userId={id}`
* **Respostas:**
  * `200 OK` — Lista de roadmaps do usuário:
    ```json
    {
      "sucesso": true,
      "mensagem": "Roadmaps carregados com sucesso.",
      "dados": [
        {
          "roadmapId": 1,
          "specialty": "Backend",
          "stack": ".NET 10 / ASP.NET Core",
          "language": "C#",
          "topics": [ ... ]
        }
      ]
    }
    ```

---

### 4.5. Listar Roadmaps por ID de Usuário na Rota
Endpoint alternativo para recuperação de trilhas via rota explícita.

* **Método / Rota:** `GET /api/v1/roadmaps/user/{userId}`
* **Parâmetros de Rota:** `userId` (inteiro) — Identificador do usuário.
* **Respostas:**
  * `200 OK` — Lista de roadmaps do usuário especificado:
    ```json
    {
      "sucesso": true,
      "mensagem": "Roadmaps carregados com sucesso.",
      "dados": [ ... ]
    }
    ```
  * `400 Bad Request` — Identificador de usuário menor ou igual a zero.
