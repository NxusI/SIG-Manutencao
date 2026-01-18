
# 🛠️ SIG Manutenção - Documentação da API

Sistema de gerenciamento de ordens de serviço, chamados técnicos e controle de clientes.
**Funcionalidades principais:** Aprovação de orçamentos via Gmail, Controle de Estoque, Perfis de Acesso (Gestor/Técnico).

---

## 🚀 Instalação e Configuração

### 1. Instalar Dependências
```bash
npm install

```

### 2. Configurar Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/sig"
JWT_SECRET="seu_segredo_super_seguro"
API_URL="http://localhost:3001"

# Obrigatório para envio de e-mail (Gere a senha de app no Google)
EMAIL_USER="seu.email@gmail.com"
EMAIL_PASS="sua senha de app sem espacos"

```

### 3. Banco de Dados

```bash
npx prisma migrate dev --name init

```

### 4. Rodar o Servidor

```bash
npm run dev
# O servidor iniciará em: http://localhost:3001

```

---

## 📚 Endpoints da API

> **Autenticação:** Todas as rotas (exceto `/login`, `/cadastro` inicial e `/resposta` de email) exigem o Header:
> `Authorization: Bearer <SEU_TOKEN>`

### 🔐 Autenticação & Usuários (`/api/auth`)

| Método | Rota | Descrição |
| --- | --- | --- |
| **POST** | `/login` | Autentica e retorna o Token JWT. |
| **POST** | `/cadastro` | Cria um novo usuário (Requer token de GESTOR). |
| **GET** | `/users` | Lista todos os usuários cadastrados. |
| **POST** | `/logout` | O logout real é feito no Front removendo o token. |
| **PATCH** | `/alterar-senha` | Altera a senha do usuário logado. |
| **PATCH** | `/editar-user/:id` | Edita dados de um usuário (Gestor). |
| **PATCH** | `/status/:id` | Ativa/Desativa um usuário (Soft Delete). |
| **DELETE** | `/remover-user/:id` | Remove um usuário do banco (Cuidado). |

#### 📥 Body: Login

```json
{
  "login": "admin",
  "senha": "123456"
}

```

#### 📥 Body: Cadastro de Usuário

```json
{
  "nome": "Carlos Técnico",
  "login": "carlos",
  "email": "carlos@empresa.com",
  "senha": "123",
  "tipo": "TECNICO" // ou "GESTOR"
}

```

---

### 🎫 Chamados (`/api/chamado`)

| Método | Rota | Descrição |
| --- | --- | --- |
| **GET** | `/` | Lista chamados. Filtros opcionais na URL (ex: `?idStatus=1`). |
| **POST** | `/criar` | Abre um novo chamado (Triagem inicial). |
| **GET** | `/:id` | Retorna detalhes completos do chamado + cliente + histórico. |
| **GET** | `/lista/status` | Retorna a lista de status possíveis (Aberto, Em Andamento, etc). |
| **PATCH** | `/editar-chamado/:id` | Atualiza informações ou transfere o chamado. |

#### 📥 Body: Criar Chamado

```json
{
  "idCliente": 1,
  "titulo": "Notebook não liga",
  "equipamento": "Dell Inspiron 15",
  "descricao": "Cliente relatou cheiro de queimado.",
  "idResponsavel": 2, // (Opcional) Já atribui a um técnico
  "dataSolicitacao": "2026-01-18T14:00:00.000Z" // (Opcional) Data retroativa
}

```

#### 📥 Body: Editar Chamado

```json
{
  "titulo": "Notebook não dá vídeo",
  "descricao": "Atualização: O led liga mas a tela não.",
  "idStatus": 2, // Forçar mudança de status manual
  "idResponsavel": 3 // Trocar técnico
}

```

---

### 🛠️ Ordens de Serviço (`/api/os`)

| Método | Rota | Descrição |
| --- | --- | --- |
| **POST** | `/gerar` | **Principal:** Cria OS, insere produtos, calcula valor e envia E-mail. |
| **GET** | `/` | Lista todas as OS geradas. |
| **GET** | `/:id` | Busca OS específica com seus itens e produtos. |
| **PATCH** | `/editar/:id` | Adiciona mais itens ou muda observações (Reenvia e-mail se valor mudar). |
| **PATCH** | `/finalizar/:id` | Conclui a OS e fecha o chamado (Status 4). |
| **GET** | `/resposta/:id/:resp` | **Link Público:** Usado pelos botões do e-mail (Aprova/Reprova). |

#### 📥 Body: Gerar OS (Orçamento)

```json
{
  "idChamado": 10,
  "dataPrazo": "2026-01-25",
  "maoDeObra": 150.00,
  "obs": "Necessário troca da fonte.",
  "diagnostico": "Fonte queimada.",
  "produtos": [
    {
      "nome": "Fonte ATX 500W",
      "quantidade": 1,
      "preco": 200.50
    },
    {
      "nome": "Cabo de força",
      "quantidade": 2,
      "preco": 10.00
    }
  ]
}

```

---

### 👥 Clientes (`/api/cliente`)

| Método | Rota | Descrição |
| --- | --- | --- |
| **GET** | `/` | Lista clientes (Paginado). |
| **POST** | `/cadastro` | Cadastra novo cliente PF ou PJ. |
| **PATCH** | `/editar-cliente/:id` | Atualiza dados cadastrais. |
| **PATCH** | `/status/:id` | Ativa ou Inativa um cliente (Não apaga do banco). |
| **DELETE** | `/excluir-cliente/:id` | Tenta excluir (Só funciona se não tiver chamados). |

#### 📥 Body: Cadastro Cliente

```json
{
  "nome": "Maria Souza",
  "email": "maria@cliente.com",
  "telefone": "85999999999",
  "endereco": "Rua das Flores, 123",
  "idEmpresa": 1 // (Opcional) Apenas se for vinculado a uma empresa
}

```

---

### 🏢 Empresas (`/api/empresa`)

| Método | Rota | Descrição |
| --- | --- | --- |
| **GET** | `/` | Lista empresas parceiras. |
| **POST** | `/` | Cadastra nova empresa. |
| **GET** | `/:id` | Busca detalhes da empresa. |
| **PATCH** | `/:id` | Edita dados da empresa. |
| **DELETE** | `/:id` | Desativa a empresa. |

#### 📥 Body: Nova Empresa

```json
{
  "nomeFantasia": "Tech Solutions LTDA",
  "cnpj": "12345678000199",
  "endereco": "Av. Central, 500",
  "telefone": "8533330000"
}

```

---

## 📧 Fluxo Automático de E-mail

O sistema envia e-mails automaticamente nestas condições:

1. **Geração de OS:** Quando `POST /api/os/gerar` é chamado com valor total > 0.
2. **Edição de OS:** Quando `PATCH /api/os/editar/:id` altera o valor final.

**Comportamento dos Links no E-mail:**

* **Aprovar:** Status do Chamado vira `2` (Em Andamento).
* **Reprovar:** Status do Chamado vira `5` (Cancelado/Recusado).

```

```
