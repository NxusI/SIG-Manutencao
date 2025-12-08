# 📁 MÓDULO BACK-END: AUTENTICAÇÃO E GESTÃO DE ACESSO

Este módulo implementa os requisitos de **RF001 a RF004** até agora.

## 🧭 Sumário

1. [🔑 Base de Acesso e Segurança](#-base-de-acesso-e-segurança)
2. [🔐 Endpoints Públicos (Autenticação)](#-endpoints-públicos-autenticação)
3. [🛡️ Endpoints Protegidos (Gestão)](#-endpoints-protegidos-gestão)

---

## 🔑 Base de Acesso e Segurança

| Item | Descrição | Configuração |
| :--- | :--- | :--- |
| **Base URL** | Endereço de acesso para as rotas do módulo. | `http://localhost:3001/api/auth` (Ajustar para produção) |
| **Autenticação** | Mecanismo de segurança. | **JWT (Bearer Token)** |
| **Uso do Token** | O token deve ser enviado em todas as rotas protegidas. | **`Authorization: Bearer <TOKEN>`** |
| **Middleware** | Função que verifica e decodifica o token. | `verificarToken` (popula `req.usuario`) |

---

## 🔐 Endpoints Públicos (Autenticação)

Rotas que **NÃO exigem** o `Authorization` Header para acesso.

### 1. [RF0003] Cadastrar Novo Usuário (`POST /cadastro)

Rota de *setup* para criação inicial de usuários, no primeiro uso ela server só para cadastrar o **GESTOR**. Após cadsatrar ele, a rota será protegida e só o gestor vai poder cadastrar novos usuários.

* **Corpo da Requisição (JSON):**
    ```json
    {
      "nome": "Usuário Teste",
      "login": "Tester",
      "email": "teste@gmail.com",
      "senha": "123",
      "tipo": "GESTOR"  
    }
    ```
* **Resposta:** `201 Created`

### 2. [RF0001] Login (`POST /login`)

Rota para autenticação e emissão do JWT.

* **Corpo da Requisição (JSON):**
    ```json
    {
      "login": "Tester",
      "senha": "123"
    }
    ```
* **Resposta (Sucesso - `200 OK`):**
    ```json
    {
      "token": "eyJhbGciOi...", 
      "usuario": { 
        "id": 1, 
        "nome": "Gabriel", 
        "tipo": "GESTOR" 
      }  
    }
    ```
    > **⚠️ IMPORTANTE:** O `token` deve ser armazenado pelo *front-end* para uso futuro.

---

## 🛡️ Endpoints Protegidos (Gestão)

**REQUISITO DE SEGURANÇA:** Todas as rotas abaixo **EXIGEM** o cabeçalho `Authorization: Bearer <TOKEN>`.

### 4.  Listar Usuários (`GET /users`)

Retorna a lista de usuários cadastrados com suporte a paginação.

* **Permissão:** Usuário Logado (TÉCNICO ou GESTOR)
* **Parâmetros (Query Params):**
    * `page`: Número da página (Padrão: 1)
    * `limit`: Itens por página (Padrão: 10)
* **Exemplo de Requisição:**
    `GET /users?page=1&limit=5`
* **Resposta (Sucesso - `200 OK`):**
    ```json
    {
      "data": [
        {
          "idUsuario": 1,
          "nome": "Gabriel",
          "login": "gabriel.dev",
          "email": "gabriel@sig.com",
          "tipo": "GESTOR",
          "ativo": true
        },
        {
          "idUsuario": 2,
          "nome": "Usuário Excluído",
          "perfil": "TÉCNICO",
          "ativo": false
        }
      ],
      "meta": {
        "total": 15,
        "page": 1,
        "limit": 5,
        "totalPages": 3
      }
    }
    ```

### 5. [RF0002] Alterar Própria Senha (`PATCH /alterar-senha`)

Permite que qualquer usuário logado altere sua senha.

* **Permissão:** Usuário Logado (TÉCNICO ou GESTOR)
* **Corpo da Requisição (JSON):**
    ```json
    {
      "senha": "senhaAtual",
      "novaSenha": "novaSenhaForte"
    }
    ```
* **Resposta:** `200 OK`

### 4. [RF0004] Editar Dados de Outro Usuário (`PATCH /users/editar-user/:id`)

Permite que um Gestor edite o nome ou o tipo de outros usuários.

* **Permissão:** **GESTOR**
* **Corpo da Requisição (JSON):** (Campos opcionais)
    ```json
    {
      "nome": "Novo Nome",
      "tipo": "TECNICO" 
    }
    ```
* **Status de Bloqueio:** `403 Forbidden` se o token não pertencer a um Gestor.

### 6. [RF0005] Remover Usuário (`DELETE /users/:id`)

Realiza a **Remoção Lógica (Soft Delete)** do usuário. O registro não é apagado do banco, apenas marcado como inativo (`ativo: false`), impedindo novos logins.

* **Permissão:** **GESTOR**
* **Regra de Negócio:**
    1. O usuário logado não pode deletar a própria conta.
    2. Usuários inativos perdem o acesso ao sistema imediatamente.
* **Resposta:** `204 No Content` (Sucesso sem corpo de resposta).