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

### Frontend
> Utiliza o framework Next.js e React, com bibliotecas ShadCN/UI e Lucide Icons para componentes modernos e acessíveis.

| Componente | Tecnologia | Referência Oficial |
| :--- | :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) / ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | [cite_start][Documentação do Next.js](https://nextjs.org/docs)  |
| **UI/UX** | ShadCN/UI e Lucide Icons | [cite_start][ShadCN/UI Docs](https://ui.shadcn.com/)  |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) / ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | [cite_start][Site Oficial do Node.js](https://nodejs.org/en/download/) [cite: 35] |
| **Banco de Dados** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) | [cite_start][Página de Download do MySQL](https://dev.mysql.com/downloads/)[cite: 37] |


![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-000000?style=for-the-badge&logo=react&logoColor=white)

### Backend
> Construído com Node.js e Express.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Banco de Dados
> MySQL, para armazenamento estruturado de clientes, chamados, OS e relatórios.
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Integração
> Implementa um serviço de disparo automático de e-mails para comunicação com o cliente.

---

## ✨ Principais Funcionalidades

* **Registro de Ordens de Serviço (OS):** Criação de OS formais para equipamentos internos e serviços da comunidade, substituindo o acordo verbal.
* **Gerenciamento de Fluxo:** Acompanhamento do status da OS (Diagnóstico, Aguardando Confirmação, Em Reparo, Pronto para Entrega).
* **Controle de Prazos e Garantias:** Registro de datas de diagnóstico, conclusão e garantia formal (3 meses).
* **Módulo Financeiro:** Registro de gastos (peças), receita (serviços) e geração de relatórios de lucro/desempenho da célula de Manutenção.
* **Histórico e Consulta:** Facilidade para o técnico-gestor consultar o histórico de reparos por equipamento ou cliente.

---

## 🚧 Status do Projeto e Contribuição

* **Status:** 🚧 Em Desenvolvimento (Fase de [Design/Protótipo/Implementação Inicial])
* **Contribuição:** Se você faz parte da equipe Nexus One, por favor, siga o nosso **fluxo de trabalho de branches** e o **padrão de commits semânticos**.

## 🛠️ Tecnologias Utilizadas

O sistema utilizará uma arquitetura moderna baseada em JavaScript, com foco em componentes acessíveis e desempenho.

| Componente | Tecnologia | Referência Oficial |
| :--- | :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) / ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | [cite_start][Documentação do Next.js](https://nextjs.org/docs)  |
| **UI/UX** | ShadCN/UI e Lucide Icons | [cite_start][ShadCN/UI Docs](https://ui.shadcn.com/)  |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) / ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | [cite_start][Site Oficial do Node.js](https://nodejs.org/en/download/) [cite: 35] |
| **Banco de Dados** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) | [cite_start][Página de Download do MySQL](https://dev.mysql.com/downloads/)[cite: 37] |

---

## 🚀 Como Executar o Projeto

Para configurar e rodar o **SIG-Manutenção** em seu ambiente local, siga os passos abaixo.

### Pré-requisitos
Certifique-se de ter as seguintes dependências instaladas:
* [cite_start]**Node.js (LTS recomendado):** Necessário para rodar o Backend (Express [cite: 35][cite_start]) e o Frontend (Next.js ).
* **Gerenciador de Pacotes:** NPM ou Yarn.
* [cite_start]**Servidor MySQL:** Para o banco de dados[cite: 37].

### 1. Clonagem e Navegação
Clone o repositório e navegue até a pasta do projeto:
```bash
git clone [https://docs.github.com/pt/repositories/creating-and-managing-repositories/about-repositories](https://docs.github.com/pt/repositories/creating-and-managing-repositories/about-repositories)
cd SIG-Manutencao