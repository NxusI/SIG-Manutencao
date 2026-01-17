Com certeza! Aqui está o **README.md** completamente atualizado, organizado por módulos, com as rotas novas, os corpos de requisição ajustados para o novo Schema (`idUsuario`, `idEmpresa`, `idCliente`) e sem os números de requisitos.

Pode copiar e substituir o conteúdo do seu arquivo atual.

---

# 📁 DOCUMENTAÇÃO DA API - SIG MANUTENÇÃO

Este documento detalha os endpoints disponíveis no Back-end, organizados por módulos.

## 🧭 Visão Geral e Segurança

| Item | Descrição | Configuração |
| --- | --- | --- |
| **Base URL** | Endereço base da API. | `http://localhost:3001/api` |
| **Autenticação** | Mecanismo de segurança. | **JWT (Bearer Token)** |
| **Header** | O token deve ser enviado nas rotas protegidas. | **`Authorization: Bearer <TOKEN>`** |

---

## 1. 🔐 Módulo de Autenticação e Usuários

**Base URL:** `/api/auth`

### 🔓 Rotas Públicas

#### **Login**

Autentica o usuário e retorna o token de acesso.

* **Método:** `POST`
* **Rota:** `/login`
* **Body:**
```json
{
  "login": "admin",
  "senha": "123456"
}

```


* **Resposta (200):**
```json
{
  "token": "eyJhbGciOi...",
  "usuario": {
    "idUsuario": 1,
    "nome": "Administrador",
    "tipo": "GESTOR",
    "idEmpresa": 1
  }
}

```



#### **Cadastro Inicial**

Cadastra novos usuários. Se for o primeiro uso do sistema, cria o Gestor.

* **Método:** `POST`
* **Rota:** `/cadastro`
* **Body:**
```json
{
  "nome": "Técnico Lucas",
  "login": "lucas.tech",
  "email": "lucas@email.com",
  "senha": "123",
  "tipo": "TECNICO",
  "idEmpresa": 1
}

```



### 🛡️ Rotas Protegidas (Requer Token)

#### **Listar Usuários**

* **Método:** `GET`
* **Rota:** `/users`
* **Query Params:** `page` (pág), `limit` (itens por pág).

#### **Editar Usuário (Gestor)**

* **Método:** `PATCH`
* **Rota:** `/editar-user/:id`
* **Body:** (Envie apenas o que deseja alterar)
```json
{ "nome": "Lucas Silva", "tipo": "GESTOR" }

```



#### **Alterar Senha (Própria)**

* **Método:** `PATCH`
* **Rota:** `/alterar-senha`
* **Body:** `{ "senha": "atual", "novaSenha": "nova" }`

#### **Remover Usuário (Soft Delete)**

* **Método:** `DELETE`
* **Rota:** `/remover-user/:id`

#### **Alternar Status (Ativar/Desativar)**

* **Método:** `PATCH`
* **Rota:** `/status/:id`

---

## 2. 👤 Módulo de Clientes

**Base URL:** `/api/cliente`
**Requisito:** Todas as rotas exigem Token.

#### **Cadastrar Cliente**

* **Método:** `POST`
* **Rota:** `/cadastro`
* **Body:**
```json
{
  "nome": "Padaria Estrela",
  "email": "contato@padaria.com",
  "telefone": "85999998888",
  "endereco": "Rua das Flores, 123",
  "idEmpresa": 1
}

```



#### **Listar Clientes**

* **Método:** `GET`
* **Rota:** `/`
* **Query Params:** `page`, `limit`, `nome` (filtro).

#### **Editar Cliente**

* **Método:** `PATCH`
* **Rota:** `/editar-cliente/:id`
* **Body:** `{ "telefone": "85988887777", "endereco": "Novo endereço..." }`

#### **Excluir Cliente (Soft Delete)**

* **Método:** `DELETE`
* **Rota:** `/excluir-cliente/:id`

#### **Alternar Status Cliente**

* **Método:** `PATCH`
* **Rota:** `/status/:id`

---

## 3. 🛠️ Módulo de Chamados (Ordens de Serviço)

**Base URL:** `/api/chamado`
**Requisito:** Todas as rotas exigem Token.

#### **Criar Chamado**

O `idUsuarioCriacao` é capturado automaticamente do token.

* **Método:** `POST`
* **Rota:** `/criar`
* **Body:**
```json
{
  "idCliente": 1,
  "titulo": "PC não liga",
  "equipamento": "Desktop Dell Vostro",
  "descricao": "Ao apertar o botão power, nada acontece.",
  "idResponsavel": null 
}

```


*(Nota: Se enviar `idResponsavel`, o status muda para "Em Andamento" automaticamente).*

#### **Listar Chamados (Filtros)**

* **Método:** `GET`
* **Rota:** `/`
* **Query Params:**
* `idCliente`: ID do cliente.
* `idResponsavel`: ID do técnico.
* `idStatus`: ID do status (1=Aberto, 2=Andamento...).
* `titulo`: Busca por texto.
* `dataInicio` / `dataFim`: Filtro por data de criação.



#### **Detalhes do Chamado**

Retorna o objeto completo com dados do Cliente, Status e Responsável.

* **Método:** `GET`
* **Rota:** `/:id`

#### **Editar / Atribuir Chamado**

Usado para mudar status, editar descrição ou atribuir técnico.

* **Método:** `PATCH`
* **Rota:** `/editar-chamado/:id`
* **Body:**
```json
{
  "idResponsavel": 2,
  "idStatus": 2,
  "descricao": "Nova descrição técnica..."
}

```



#### **Listar Status Disponíveis**

* **Método:** `GET`
* **Rota:** `/lista/status`
