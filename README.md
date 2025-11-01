# ⚙️ SIG-Manutenção: Sistema Integrado de Gestão da Célula de Manutenção

###### Keywords: Projeto Integrado - Nexus One - Sistemas e Mídias Digitais - Universidade Federal do Ceará

## 🧭 Sumário
* [📝 Sobre o Projeto](#-sobre-o-projeto)
* [🤝 Quem Somos Nos!](#-quem-somos-nos)
* [📜 Licença](#licenca)
* [🛠️ Tecnologias Utilizadas](#tecnologias-utilizadas)
* [✨ Principais Funcionalidades](#principais-funcionalidades)
* [📄 Requisitos e Documentação](#requisitos-e-documentacao)

---

## 📝 Sobre o Projeto

> O **SIG-Manutenção** é um Sistema Integrado de Gestão desenvolvido para o **Instituto Robótica Sustentável**, uma ONG com foco em educação e sustentabilidade tecnológica.

### O Desafio
> A célula de Manutenção da ONG, responsável por gerar receita através de serviços de manutenção de hardware e fornecer insumos para as atividades educativas, carecia de um sistema unificado. Esta ausência resultava, entre outras coisa, em:
* Fluxo de atendimento informal e ineficiente (contato via WhatsApp/presencial).
* Falta de registro formal de prazos e garantias (3 dias para diagnóstico, 3 meses de garantia informal).
* Inexistência de controle e documentação digitalizada de Ordens de Serviço (OS).
* Dificuldade em realizar análises financeiras (receita, gastos e lucro da célula).

### A Solução
> O SIG-Manutenção nasce para digitalizar e otimizar todos os processos da Célula de Manutenção. O sistema permitirá o **registro unificado** de Ordens de Serviço (internas e externas), o **gerenciamento de todo o ciclo de vida do serviço** e a **análise de desempenho financeiro**, promovendo transparência e profissionalismo na gestão.

---

## 🤝 Quem Somos Nos!

Este projeto é desenvolvido pela equipe **Nexus One** da **Universidade Federal do Ceará (UFC Virtual)**.

* [**🔗 Perfil da Organização no GitHub**](https://github.com/NxusI)
 
 ---

## :memo: Licença
Este código está sobre a licença GNU GPL 3.0. Para mais informações, veja o [LICENSE](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/b08aef3957dea73682f38ad95597223cbdb51267/LICENSE).

---

## 🛠️ Tecnologias Utilizadas

O sistema utilizará uma arquitetura moderna baseada em JavaScript, com foco em componentes acessíveis e desempenho.

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

---

✨ Principais Funcionalidades (Requisitos Funcionais)

🔑 Módulo de Autenticação e Gestão de Usuários

[ ] Permitir que o gestor realize o login (autenticação) com usuario e senha.

[ ] Permitir que o gestor recupere ou edite sua senha.

[ ] Permitir o cadastro de um novo gestor ou a remoção de um gestor existente.

👤 Módulo de Cadastro e Início de Atendimento

[] Cadastrar novos clientes (nome, e-mail, telefone e endereço).

[ ] Registrar uma solicitação de manutenção (equipamento, problema relatado).

[ ] Gerar um "chamado" automaticamente após o registro de uma nova solicitação.

[ ] Classificar o chamado registrado por níveis de prioridade (alta, normal).

[ ] Vincular o "chamado" ao responsável pela execução do serviço.

⚙️ Gestão de Fluxo e Status

[ ] Gerenciar o status do chamado, incluindo os estágios Aguardando Confirmação do Cliente e Em Reparo.

[ ] Notificar o gestor sobre chamados que excederem o prazo de 3 dias para diagnóstico/orçamento.

[ ] Permitir o registro de notas e atualizações no histórico do chamado.

🧾 Ordem de Serviço (OS) e Finalização

[ ] Permitir que o responsável preencha os dados de orçamento previsto na OS.

[ ] Permitir a finalização da OS após a conclusão e aprovação do cliente.

[ ] Registrar na OS o total gasto com materiais/insumos.

[ ] Registrar na OS o valor final cobrado pelo serviço.

[ ] Marcar o "chamado" como concluído no sistema.

📨 Comunicação Automatizada

[ ] Enviar uma comunicação automática (e-mail) ao cliente com o orçamento, solicitando a confirmação do serviço.

[ ] Enviar automaticamente a OS finalizada para o e-mail do cliente.

[ ] Integrar o sistema a um serviço de disparo automático de e-mails.

📊 Dashboard Gerencial (KPIs)

[ ] Apresentar um painel gerencial (dashboard) dinâmico para gestores.

[ ] Exibir métricas-chave, como o volume de serviços prestados.

[ ] Exibir os custos operacionais e o lucro total e por serviço.

[ ] Exibir o tempo médio de resolução dos chamados.
---

## 🚧 Status do Projeto

* **Status:** 🚧 Em Desenvolvimento (Fase de [Design/Protótipo/Implementação Inicial])

---