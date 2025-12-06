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
      "perfil": "GESTOR"  
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
        "perfil": "GESTOR" 
      }  
    }
    ```
    > **⚠️ IMPORTANTE:** O `token` deve ser armazenado pelo *front-end* para uso futuro.

---

## 🛡️ Endpoints Protegidos (Gestão)

**REQUISITO DE SEGURANÇA:** Todas as rotas abaixo **EXIGEM** o cabeçalho `Authorization: Bearer <TOKEN>`.

### 3. [RF0002] Alterar Própria Senha (`PATCH /alterar-senha`)

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

### 4. [RF0004] Editar Dados de Outro Usuário (`PATCH /editar-user/:id`)

Permite que um Gestor edite o nome ou o perfil de outros usuários.

* **Permissão:** **GESTOR**
* **Corpo da Requisição (JSON):** (Campos opcionais)
    ```json
    {
      "nome": "Novo Nome",
      "perfil": "TECNICO" 
    }
    ```
* **Status de Bloqueio:** `403 Forbidden` se o token não pertencer a um Gestor.