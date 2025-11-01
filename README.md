# ⚙️ SIG-Manutenção: Sistema Integrado de Gestão da Célula de Manutenção

<p align="center">
  <img src="assets/NomeEquipeFull.svg" alt="Logomarca da Equipe Nexus One" width="200"/>
</p>

## 📝 Sobre o Projeto

O **SIG-Manutenção** é um Sistema Integrado de Gestão desenvolvido para o **Instituto Robótica Sustentável**, uma ONG com foco em educação e sustentabilidade tecnológica.

### O Desafio
A célula de Manutenção da ONG, responsável por gerar receita através de serviços de manutenção de hardware e fornecer insumos para as atividades educativas, carecia de um sistema unificado. Esta ausência resultava em:
* Fluxo de atendimento informal e ineficiente (contato via WhatsApp/presencial).
* Falta de registro formal de prazos e garantias (3 dias para diagnóstico, 3 meses de garantia informal).
* Inexistência de controle e documentação digitalizada de Ordens de Serviço (OS).
* Dificuldade em realizar análises financeiras (receita, gastos e lucro da célula).

### A Solução
O SIG-Manutenção nasce para digitalizar e otimizar todos os processos da Célula de Manutenção. O sistema permitirá o **registro unificado** de Ordens de Serviço (internas e externas), o **gerenciamento de todo o ciclo de vida do serviço** e a **análise de desempenho financeiro**, promovendo transparência e profissionalismo na gestão.

---

## 🛠️ Tecnologias Utilizadas (Tech Stack)

**Frontend:**
![Frontend Badge] (https://img.shields.io/badge/[SUA_LINGUAGEM_FRONT]-20232A?style=for-the-badge&logo=[logo_name]&logoColor=61DAFB)
![Framework Frontend Badge] (https://img.shields.io/badge/[SEU_FRAMEWORK]-000000?style=for-the-badge&logo=[logo_name]&logoColor=FFFFFF)

**Backend:**
![Backend Badge] (https://img.shields.io/badge/[SUA_LINGUAGEM_BACK]-000000?style=for-the-badge&logo=[logo_name]&logoColor=FFFFFF)
![Framework Backend Badge] (https://img.shields.io/badge/[SEU_FRAMEWORK_BACK]-000000?style=for-the-badge&logo=[logo_name]&logoColor=FFFFFF)

**Banco de Dados:**
![Database Badge] (https://img.shields.io/badge/[SEU_BD]-4169E1?style=for-the-badge&logo=[logo_name]&logoColor=FFFFFF)

---

## ✨ Principais Funcionalidades

* **Registro de Ordens de Serviço (OS):** Criação de OS formais para equipamentos internos e serviços da comunidade, substituindo o acordo verbal.
* **Gerenciamento de Fluxo:** Acompanhamento do status da OS (Diagnóstico, Aguardando Confirmação, Em Reparo, Pronto para Entrega).
* **Controle de Prazos e Garantias:** Registro de datas de diagnóstico, conclusão e garantia formal (3 meses).
* **Módulo Financeiro:** Registro de gastos (peças), receita (serviços) e geração de relatórios de lucro/desempenho da célula de Manutenção.
* **Histórico e Consulta:** Facilidade para o técnico-gestor consultar o histórico de reparos por equipamento ou cliente.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* [Pré-requisito 1, ex: Node.js 18+]
* [Pré-requisito 2, ex: Python 3.10+]
* [Pré-requisito 3, ex: Docker (Opcional)]

### Instalação e Configuração

1.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/Nexus-One/SIG-Manutencao.git](https://github.com/Nexus-One/SIG-Manutencao.git)
    cd SIG-Manutencao
    ```

2.  **Configurar o Backend:**
    ```bash
    # (Exemplo) Instalar dependências
    cd backend
    pip install -r requirements.txt
    
    # Criar e configurar o arquivo .env
    cp .env.example .env 
    # (Configurar a conexão com o banco de dados)
    ```

3.  **Configurar o Frontend:**
    ```bash
    # (Exemplo) Instalar dependências
    cd ../frontend
    npm install
    ```

4.  **Iniciar Aplicação:**
    ```bash
    # (Exemplo) Iniciar o Backend
    cd ../backend
    python app.py 
    
    # (Exemplo) Iniciar o Frontend
    cd ../frontend
    npm start
    ```

---

## 🚧 Status do Projeto e Contribuição

* **Status:** 🚧 Em Desenvolvimento (Fase de [Design/Protótipo/Implementação Inicial])
* **Contribuição:** Se você faz parte da equipe Nexus One, por favor, siga o nosso **fluxo de trabalho de branches** e o **padrão de commits semânticos**.

---

## 🤝 Equipe

Este projeto é desenvolvido pela equipe **Nexus One** da **Universidade Federal do Ceará (UFC Virtual)**.

* **🔗 Perfil da Organização no GitHub:** [Link do Profile da Organização]
* **📄 Membros e Funções:** Consulte o README da Organização para a lista completa de membros e orientadores.