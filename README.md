# ⚙️ SIG-Manutenção: Sistema Integrado de Gestão da Célula de Manutenção
Keywords: Nexus One - Instituto Robótica Sustentável - Projeto Integrado - Sistemas e Mídias Digitais - Universidade Federal do Ceará

[![Status](https://img.shields.io/badge/Status-Checkpoint_1-orange.svg)](#-status-do-projeto)
[![Licença](https://img.shields.io/badge/License-GPL_v3-blue.svg)](#-licença)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express.js-black.svg)](#backend)
[![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748.svg)](#banco-de-dados)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React-black.svg)](#frontend)

## 🧭 Sumário
  - [📝 Sobre o Projeto](#-sobre-o-projeto)
    - [O Desafio](#o-desafio)
    - [A Solução](#a-solução)
  - [🤝 Quem Somos Nós!](#-quem-somos-nós)
  - [📜 Licença](#-licença)
  - [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Banco de Dados](#banco-de-dados)
    - [Integração](#integração)
  - [✨ Escopo Funcional e Requisitos](#-escopo-funcional-e-requisitos)
    - [Módulos do Sistema](#-módulos-do-sistema)
      - [1. Módulo de Autenticação e Gestão de Usuários](#-1-módulo-de-autenticação-e-gestão-de-usuários)
      - [2. Módulo de Cadastro e Atendimento](#-2-módulo-de-cadastro-e-atendimento)
      - [3. Gestão de Fluxo e Status](#-3-gestão-de-fluxo-e-status)
      - [4. Ordem de Serviço (OS) e Financeiro](#-4-ordem-de-serviço-os-e-financeiro)
      - [5. Comunicação Automatizada](#-5-comunicação-automatizada)
      - [6. Dashboard Gerencial](#-6-dashboard-gerencial)
  - [📄 Documentação Completa](#-documentação-completa)
  - [🚧 Status do Projeto](#-status-do-projeto)

---

## 📝 Sobre o Projeto

> O **SIG-Manutenção** é um Sistema Integrado de Gestão desenvolvido para o **Instituto Robótica Sustentável**, uma ONG com foco em educação e sustentabilidade tecnológica.

### O Desafio
> A célula de Manutenção da ONG, responsável por gerar receita através de serviços de manutenção de hardware e fornecer insumos para as atividades educativas, carecia de um sistema unificado. Esta ausência resultava, entre outras coisa, em:
* Fluxo de atendimento informal e ineficiente (demasiado verbal).
* Falta de registro formal de prazos e garantias (3 dias para diagnóstico, 3 meses de garantia informal).
* Inexistência de controle e documentação digitalizada de Ordens de Serviço (OS).
* Dificuldade em realizar análises financeiras (receita, gastos e lucro da célula).

### A Solução
> O SIG-Manutenção nasce para digitalizar e otimizar todos os processos da Célula de Manutenção. O sistema permitirá o **registro unificado** de Ordens de Serviço (internas e externas), o **gerenciamento de todo o ciclo de vida do serviço** e a **análise de desempenho financeiro**, promovendo transparência e profissionalismo na gestão.

---

## 🤝 Sobre a Equipe

Este projeto é desenvolvido pela equipe **Nexus One**, formada por alunos do curso de **Sistemas e Mídias Digitias** da **Universidade Federal do Ceará**.

* [**🔗 Perfil da Organização no GitHub**](https://github.com/NxusI)
 
 ---

## 📜 Licença

Este projeto está licenciado sob a **GNU General Public License v3.0**.

Você pode encontrar o texto completo da licença no arquivo `LICENSE` na raiz do repositório.

[Alternativamente, acesse a Licença GPLv3 aqui.](https://www.gnu.org/licenses/gpl-3.0.en.html)

---

## 🛠️ Tecnologias Utilizadas

A arquitetura foi desenhada priorizando escalabilidade, componentização e performance. O sistema utilizará uma arquitetura moderna baseada em JavaScript, com foco em componentes acessíveis e desempenho.

### 🎨 Frontend (Client-Side)
> Focado na Experiência do Usuário (UX) e Acessibilidade. Utiliza o framework Next.js e React, com bibliotecas ShadCN/UI e Lucide Icons para componentes modernos e acessíveis.

| Tecnologia | Função / Motivo da Escolha |
| :--- | :--- |
|[ ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ](https://nextjs.org/)| Framework React para renderização híbrida (SSR/CSR) e rotas otimizadas. |
|[ ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ](https://react.dev/)| Biblioteca base para construção de interfaces reativas baseadas em estados. |
|**[Tailwind CSS](https://tailwindcss.com/)**| Estilização *utility-first* para desenvolvimento ágil e responsivo. |
|[ ![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-000000?style=for-the-badge&logo=react&logoColor=white) ](https://ui.shadcn.com/)| Coleção de componentes acessíveis e customizáveis (Radix UI) para consistência visual. |
|[Lucide Icons](https://lucide.dev/icons/)| Biblioteca de ícones vetoriais leves e padronizados. |

### ⚙️ Backend (Server-Side)
> API RESTful robusta para regra de negócios e segurança. Construído com Node.js e Express.js.

| Tecnologia | Função / Motivo da Escolha |
| :--- | :--- |
|[ ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ](https://nodejs.org/en/download/)| Runtime JavaScript para execução de alta performance no servidor. |
|[ ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ](https://expressjs.com/)| Framework minimalista para estruturação de rotas e middlewares. |
| **[Nodemailer](https://nodemailer.com/)** | Módulo para automação de envio de e-mails transacionais (Orçamentos/Avisos). |
| **[JWT (JsonWebToken)](https://jwt.io/)** | Padrão para autenticação *stateless* e segura entre cliente e servidor. |

### 🗄️ Banco de Dados
> A persistência de dados é gerenciada pelo **Prisma ORM**, garantindo tipagem segura e migrações eficientes para o banco de dados MySQL.

| Tecnologia | Função |
| :--- | :--- |
| [ ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ](https://www.prisma.io/) | ORM moderno que garante acesso ao banco de dados com tipagem segura (*Type-Safe*) e migrações ágeis. |
| [ ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ](https://www.mysql.com/) | Banco de dados relacional robusto utilizado para a persistência estruturada das informações. |

### Integração
> Implementa um serviço de disparo automático de e-mails para comunicação com o cliente.

## ✨ Escopo Funcional e Requisitos

O levantamento de requisitos foi realizado através de uma abordagem qualitativa, utilizando entrevistas semiestruturadas e observação direta no **Instituto Robótica Sustentável**. O sistema foi desenhado para atender dois perfis principais: o **Técnico Operacional**, focado em agilidade e redução de papelada, e o **Gestor/Supervisor**, focado em métricas e controle financeiro.

### 🧩 Módulos do Sistema

Abaixo, a lista de Requisitos Funcionais (RF) ativos no projeto, alinhados com a **Seção 8 do Relatório Técnico**.

> ⚠️ **Nota:** Os requisitos *RF007, RF015, RF016, RF025, RF027 e RF028* foram suspensos ou despriorizados nesta versão para adequação ao cronograma.

### 🔐 1. Segurança e Administração
| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF001` | **Autenticação:** Login seguro (Admin/Técnico). | ✅ Feito |
| `RF002` | **Recuperação:** Alteração de senha ("Esqueci minha senha"). | ✅ Feito |
| `RF003` | **Gestão de Equipe:** Listagem de usuários do sistema. | ✅ Feito |
| `RF004` | **Permissões:** Edição de dados cadastrais de usuários. | ✅ Feito |
| `RF005` | **Soft Delete:** Desativação lógica de usuários (sem perda de histórico). | ✅ Feito |

### 👤 2. Operacional: Clientes e Chamados
| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF006` | **CRUD Clientes:** Gestão completa da base de clientes. | ✅ Feito |
| `RF007` | **Alterar cadastro de clientes Cadastro e Atendimento** | 📝 SUSPENSO |
| `RF008` | **Solicitação:** Registro de entrada de equipamento. | ✅ Feito |
| `RF009` | **Ticket Automático:** Geração de protocolo único por solicitação. | 📝 SUSPENSO |
| `RF010` | **Prioridade:** Classificação visual (Normal/Urgente). | 📝 SUSPENSO |
| `RF011` | **Assign:** Atribuição de responsabilidade técnica. | ✅ Feito |

### 🔄 3. Fluxo de Trabalho (Kanban)
| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF012` | **Status Dinâmico:** Atualização automática baseada em ações. | ✅ Feito |
| `RF013` | **Visualização Kanban:** Colunas de Triagem, Bancada e Saída. | ✅ Feito |
| `RF014` | **Filtros:** Ordenação por data de entrada e criticidade. | ✅ Feito |
| `RF017` | **Monitor de SLA:** Alerta visual para diagnósticos atrasados (>3 dias). | ✅ Feito |

### 🧾 4. Financeiro e OS
| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF018` | **Orçamento:** Composição de Peças + Mão de Obra. | ✅ Feito |
| `RF019` | **Custos:** Registro de custo interno (para cálculo de margem). | ✅ Feito |
| `RF020` | **Receita:** Definição de preço final ao consumidor. | ✅ Feito |
| `RF021` | **Baixa Técnica:** Encerramento da ordem de serviço. | ✅ Feito |
| `RF022` | **Finalização:** Mudança de status global do chamado. | ✅ Feito |

### 📨 5. Automação e Gestão
| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF023` | **Disparo de Orçamento:** E-mail automático para aprovação. | ✅ Feito |
| `RF024` | **Coleta de Decisão:** Interface de Aceite/Recusa do cliente. | ✅ Feito |
| `RF026` | **Aviso de Retirada:** E-mail automático de serviço concluído. | ✅ Feito |
| `RF029` | **Dashboard:** Volumetria (Abertos vs. Fechados). | ✅ Feito |
| `RF030` | **Financeiro:** Lucro Líquido vs. Custos Operacionais. | ✅ Feito |
| `RF031` | **KPI:** Tempo Médio de Resolução. | ✅ Feito |

---

## 📄 Documentação Completa

Para detalhes aprofundados sobre as regras de negócio, diagramas e user stories, consulte o relatório técnico oficial.

* 📝 **Relatório Técnico:** [Acessar Documento Completo (ODT)](https://github.com/NxusI/SIG-Manutencao/blob/main/documentos/relatorio_tecnico_v.1.2.odt)

---

## 🚧 Status do Projeto

* **Status:** 🚧 ** Em Conclusão** | Fase: **Desenvolvimento do Módulo de Gestão e Automação - Ajustes Finais.**
