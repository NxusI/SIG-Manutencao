# ⚙️ SIG-Manutenção: Sistema Integrado de Gestão da Célula de Manutenção
Keywords: Nexus One - Instituto Robótica Sustentável - Projeto Integrado - Sistemas e Mídias Digitais - Universidade Federal do Ceará

[![Status](https://img.shields.io/badge/Status-Checkpoint_1-orange.svg)](#-status-do-projeto)
[![Licença](https://img.shields.io/badge/License-GPL_v3-blue.svg)](#-licença)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express.js-black.svg)](#backend)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React-black.svg)](#frontend)

## 🧭 Sumário
  - [📝 Sobre o Projeto](#-sobre-o-projeto)
    - [O Desafio](#o-desafio)
    - [A Solução](#a-solução)
  - [🤝 Quem Somos Nos!](#-quem-somos-nos)
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

Este projeto é desenvolvido pela equipe **Nexus One**, alunos da **Universidade Federal do Ceará**.

* [**🔗 Perfil da Organização no GitHub**](https://github.com/NxusI)
 
 ---

## 📜 Licença

Este projeto está licenciado sob a **GNU General Public License v3.0**.

Você pode encontrar o texto completo da licença no arquivo `LICENSE` na raiz do repositório.

[Alternativamente, acesse a Licença GPLv3 aqui.](https://www.gnu.org/licenses/gpl-3.0.en.html)

---

## 🛠️ Tecnologias Utilizadas

O sistema utilizará uma arquitetura moderna baseada em JavaScript, com foco em componentes acessíveis e desempenho.

| Componente | Tecnologia |
| :--- | :--- |
| **Frontend** | [ ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ](https://nextjs.org/) + [ ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ](https://react.dev/) |
| **UI/UX** | [ ![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-000000?style=for-the-badge&logo=react&logoColor=white) ](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/icons/)|
| **Backend** | [ ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ](https://nodejs.org/en/download/) + [ ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ](https://expressjs.com/) |
| **Banco de Dados** | [ ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ](https://dev.mysql.com/downloads/) |
 
### Frontend
> Utiliza o framework Next.js e React, com bibliotecas ShadCN/UI e Lucide Icons para componentes modernos e acessíveis.

### Backend
> Construído com Node.js e Express.js.

### Banco de Dados
> MySQL para armazenamento estruturado de clientes, chamados, OS e relatórios.

### Integração
> Implementa um serviço de disparo automático de e-mails para comunicação com o cliente.

### Teste das Tecnologias

> Uma prova de conceito inicial foi desenvolvida utilizando as tecnologias indicadas, demonstrando a viabilidade técnica do projeto.

[A demonstração da prova de conceito pode ser acessada aqui.](https://github.com/NxusI/Teste-Tecnologias)

---

## ✨ Escopo Funcional e Requisitos

O levantamento de requisitos foi realizado através de uma abordagem qualitativa, utilizando entrevistas semiestruturadas e observação direta no **Instituto Robótica Sustentável**. O sistema foi desenhado para atender dois perfis principais: o **Técnico Operacional**, focado em agilidade e redução de papelada, e o **Gestor/Supervisor**, focado em métricas e controle financeiro.

### 🧩 Módulos do Sistema

Abaixo estão listados os requisitos funcionais (RF) organizados por módulos, conforme definido na especificação técnica do projeto.

#### 🔐 1. Módulo de Autenticação e Gestão de Usuários
> *Foco: Segurança e controle de acesso hierárquico (Técnico vs. Supervisor).*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF001` | **Login Seguro:** Autenticação via usuário e senha. | 🚧 Em Desenv. |
| `RF002` | **Gestão de Credenciais:** Alteração de senha pelo próprio usuário. | 📝 To Do |
| `RF003` | **Cadastro de Usuários:** Inserção de novos colaboradores pelo gestor. | 📝 To Do |
| `RF004` | **Edição de Perfil:** Atualização de permissões e dados cadastrais. | 📝 To Do |
| `RF005` | **Desativação:** Remoção lógica de usuários do sistema. | 📝 To Do |

#### 👤 2. Módulo de Cadastro e Atendimento
> *Foco: Eliminar fichas de papel e padronizar a entrada de dados.*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF006` | **Gestão de Clientes:** CRUD completo (Nome, e-mail, telefone, endereço). | 📝 To Do |
| `RF008` | **Solicitação de Serviço:** Registro do equipamento e problema relatado. | 📝 To Do |
| `RF009` | **Abertura Automática:** Geração automática do "Chamado" após solicitação. | 📝 To Do |
| `RF010` | **Matriz de Prioridade:** Classificação visual (Prioritário/Normal). | 📝 To Do |
| `RF011` | **Atribuição:** Vínculo do chamado ao técnico responsável. | 📝 To Do |

#### 🔄 3. Gestão de Fluxo e Status
> *Foco: Visibilidade do progresso em tempo real.*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF012` | **Transição Automática:** Atualização de status ao vincular técnico. | 📝 To Do |
| `RF013` | **Kanban de Chamados:** Agrupamento visual por status (Diagnóstico, Reparo, etc.). | 📝 To Do |
| `RF014` | **Ordenação Inteligente:** Filtro automático por prioridade e data de criação. | 📝 To Do |
| `RF017` | **Alertas de SLA:** Notificação de atraso em diagnósticos (> 3 dias). | 📝 To Do |

#### 🧾 4. Ordem de Serviço (OS) e Financeiro
> *Foco: Profissionalização do orçamento e clareza fiscal.*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF018` | **Orçamentação:** Registro detalhado de peças e mão de obra. | 📝 To Do |
| `RF019` | **Controle de Custos:** Registro do total gasto com insumos na OS. | 📝 To Do |
| `RF020` | **Registro de Receita:** Definição do preço final cobrado do cliente. | 📝 To Do |
| `RF021` | **Encerramento Técnico:** Finalizar a OS após a conclusão do reparo. | 📝 To Do |
| `RF022` | **Status Finalizado:** Atribuir o status 'Finalizado' ao Chamado automaticamente após finalização da OS (RF0016) | 📝 To Do |

#### 📨 5. Comunicação Automatizada
> *Foco: Reduzir o tempo gasto no WhatsApp/Telefone.*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF023` | **Envio de Orçamento:** E-mail automático solicitando aprovação do cliente. | 📝 To Do |
| `RF024` | **Registro de Aprovação:** Input da resposta do cliente (Aceite/Recusa) no sistema. | 📝 To Do |
| `RF026` | **Notificação de Conclusão:** E-mail automático informando finalização do reparo. | 📝 To Do |

#### 📊 6. Dashboard Gerencial
> *Foco: Tomada de decisão baseada em dados.*

| ID | Funcionalidade | Status |
| :--- | :--- | :---: |
| `RF029` | **Volumetria:** Estatísticas de serviços (Abertos vs. Concluídos). | 📝 To Do |
| `RF030` | **Saúde Financeira:** Visão consolidada de Custos Operacionais vs. Lucro. | 📝 To Do |
| `RF031` | **Eficiência:** Indicador de Tempo Médio de Resolução de chamados. | 📝 To Do |

---

## 📄 Documentação Completa

Para detalhes aprofundados sobre as regras de negócio, diagramas e user stories, consulte o relatório técnico oficial.

* 📝 **Relatório Técnico:** [Acessar Documento Completo (ODT)](https://github.com/NxusI/SIG-Manutencao/blob/main/documentos/relatorio_tecnico_v.1.2.odt)

---

## 🚧 Status do Projeto

* **Status:** 🚧 **Checkpoint 1 Concluído** | Fase: **Prototipação Inicial e Prova de Conceito (Next.js/Node.js).**
