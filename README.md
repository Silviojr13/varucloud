# 🌥️ VARU Cloud – Plataforma de Gestão de Estoque e Operações Distribuídas

O **VARU Cloud** é uma plataforma moderna desenvolvida com **Clean Architecture**, **Vertical Slice**, **Event-Driven Architecture**, **Microservices**, **BFF**, **API Gateway**, e suporte completo via **Docker**.

O sistema foi projetado para fornecer **gestão eficiente de estoque**, **controle de produtos**, **processamento de pedidos**, **monitoramento de inventário**, **autenticação de usuários**, e integração com **Azure Functions**.  

Toda a solução é baseada em uma arquitetura distribuída, escalável e orientada a eventos.

---

## 👨‍💻 **Integrantes**
- **Silvio Cezar**
- **Lucas Bertoli**
- **Murilo Carvalho**
- **Enzo Alle**
- **Guilherme Dias**

---

## 🔗 **Repositório Oficial**
👉 GitHub: https://github.com/Silviojr13/varucloud

📄 *Todo o código-fonte, documentação e instruções completas para execução do projeto estão disponíveis no repositório acima.*

---

# 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura moderna e modular, organizada em camadas e microsserviços independentes.

## 🔧 **Tecnologias Utilizadas**
- **Node.js 20+**
- **NestJS / Express**
- **React + Vite (Frontend)**
- **RabbitMQ (Event-Driven Architecture)**
- **Azure Functions**
- **SQL Server (Azure SQL Basic)**
- **MongoDB (Atlas)**
- **Docker + Docker Compose**
- **Clean Architecture**
- **Vertical Slice Architecture**
- **Prisma ORM**
- **Axios / Fetch**
- **BFF Pattern**
- **API Gateway Pattern**

---

# 📦 Microsserviços do Sistema

A plataforma é composta pelos seguintes serviços independentes:

### 🧍 **MS Usuários**
Autenticação, autorização e gerenciamento de contas.

### 📦 **MS Produtos**
CRUD completo de produtos, categorias e informações do catálogo.

### 🏪 **MS Inventário**
Controle de estoque, movimentações, entradas e saídas.

### 🧾 **MS Pedidos**
Processamento de pedidos, cálculos, regras de negócio e integração com estoque.

### 🌐 **API Gateway**
Porta de entrada da plataforma.  
Orquestra requests, roteamento e segurança.

### 🤝 **BFF (Backend for Frontend)**
Camada intermediária focada no frontend para reduzir complexidade e melhorar performance.

### 🪝 **Azure Functions**
Eventos assíncronos, processamento de mensagens e triggers serverless.

### 🐇 **RabbitMQ**
Mensageria para comunicação desacoplada entre microsserviços.

### 💾 **SQL Server (Azure SQL)**
Banco relacional para dados estruturados.

### 🗄️ **MongoDB (Atlas)**
Banco NoSQL para documentos, logs e eventos.

---

