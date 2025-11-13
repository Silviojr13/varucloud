# VARU Cloud - Sistema de Gerenciamento de Estoque

VARU (Virtual Automated Resource Utility) é um sistema abrangente de gerenciamento de estoque construído com arquitetura de microserviços moderna. Segue os princípios da Arquitetura Limpa combinada com a Arquitetura de Fatia Vertical para garantir manutenibilidade, testabilidade e escalabilidade.

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Stack de Tecnologia](#stack-de-tecnologia)
- [Serviços](#serviços)
- [Começando](#começando)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Arquitetura Orientada a Eventos](#arquitetura-orientada-a-eventos)
- [Funções Azure](#funções-azure)
- [Testes](#testes)
- [Frontend](#frontend)
- [Contribuidores](#contribuidores)

## Visão Geral

VARU foi projetado para gerenciar estoque, pedidos e contas de usuários para empresas de todos os tamanhos. O sistema fornece rastreamento de estoque em tempo real, alertas automatizados para estoque baixo, processamento de pedidos e capacidades abrangentes de relatórios.

Principais recursos incluem:
- Gerenciamento de estoque em tempo real
- Alertas automatizados de estoque baixo
- Processamento e rastreamento de pedidos
- Gerenciamento de usuários e acesso
- Relatórios abrangentes
- Arquitetura orientada a eventos
- Implantação nativa em nuvem

## Arquitetura

O sistema segue os princípios da Arquitetura Limpa combinada com a Arquitetura de Fatia Vertical:

### Arquitetura Limpa

A arquitetura separa as preocupações em camadas distintas:
1. **Camada de Domínio**: Entidades e regras de negócio
2. **Camada de Aplicação**: Casos de uso e serviços de aplicação
3. **Camada de Infraestrutura**: Implementação de serviços externos
4. **Camada de Apresentação**: Controladores de UI e API

### Arquitetura de Fatia Vertical

O código é organizado por recursos de negócio em vez de camadas técnicas:
```
src/
└── features/
    └── nome-do-recurso/
        ├── controllers/
        ├── models/
        ├── services/
        └── validators/
```

### Microserviços

O sistema é composto por microserviços independentes:
- **Serviço de Inventário**: Gerencia o estoque de produtos e níveis de estoque
- **Serviço de Usuários**: Gerencia contas de usuários e autenticação
- **Serviço de Pedidos**: Gerencia pedidos de clientes e processamento
- **BFF (Backend para Frontend)**: Agrega APIs para o frontend
- **Funções**: Funções serverless para processamento de eventos

## Stack de Tecnologia

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: 
  - MongoDB Atlas (NoSQL para estoque)
  - SQL Server (Azure) (Relacional para usuários/pedidos)
- **ORM**: Prisma (para banco de dados SQL)
- **Validação**: Zod
- **Message Broker**: RabbitMQ
- **Contêinerização**: Docker
- **Orquestração**: Docker Compose

### Frontend
- **Framework**: JavaScript Vanilla com Vite
- **Ferramenta de Build**: Vite

### Serviços em Nuvem
- **Banco de Dados**: Azure SQL Database, MongoDB Atlas
- **Serverless**: Azure Functions
- **Mensageria**: RabbitMQ
- **Registro de Contêineres**: Azure Container Registry (planejado)
- **Implantação**: Azure App Service (planejado)

## Serviços

### Serviço de Inventário
Gerencia o estoque de produtos com operações CRUD, rastreamento de estoque e datas de validade.

### Serviço de Usuários
Lida com registro de usuários, autenticação e gerenciamento de contas usando Prisma ORM.

### Serviço de Pedidos
Gerencia pedidos de clientes, processamento e cumprimento.

### BFF (Backend para Frontend)
Agrega e expõe APIs para o frontend com documentação Swagger.

### Funções
Funções serverless para tarefas automatizadas e processamento de eventos.

## Começando

### Pré-requisitos
- Node.js 16+
- Docker e Docker Compose
- Conta MongoDB Atlas
- Azure SQL Database (ou equivalente local para desenvolvimento)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/varucloud.git
cd varucloud
```

2. Instale as dependências para cada serviço:
```bash
cd microservices/inventario && npm install
cd ../usuarios && npm install
cd ../pedidos && npm install
cd ../../bff && npm install
cd ../frontend && npm install
cd ../functions && npm install
```

3. Configure as variáveis de ambiente (veja a seção Configuração do Banco de Dados)

4. Inicie todos os serviços usando Docker Compose:
```bash
docker-compose up --build
```

### Executando Serviços Individualmente

Para executar serviços individualmente para desenvolvimento:

```bash
# Terminal 1: Serviço de Inventário
cd microservices/inventario
npm start

# Terminal 2: Serviço de Usuários
cd microservices/usuarios
npm start

# Terminal 3: Serviço de Pedidos
cd microservices/pedidos
npm start

# Terminal 4: BFF
cd bff
npm start

# Terminal 5: Frontend
cd frontend
npm start
```

## Configuração do Banco de Dados

### MongoDB Atlas (Inventário)
1. Crie um cluster MongoDB Atlas
2. Crie um usuário de banco de dados
3. Configure o acesso à rede
4. Atualize o `MONGO_URI` em `microservices/inventario/.env`

### Azure SQL Database (Usuários/Pedidos)
1. Crie um Azure SQL Database
2. Crie as tabelas necessárias (veja `docs/DATABASE_SETUP.md`)
3. Atualize a string de conexão nos serviços

Para instruções detalhadas de configuração do banco de dados, veja [DATABASE_SETUP.md](docs/DATABASE_SETUP.md).

## Arquitetura Orientada a Eventos

O sistema implementa uma Arquitetura Orientada a Eventos usando RabbitMQ para acoplamento fraco entre serviços.

### Eventos
- ProductCreated
- ProductUpdated
- ProductDeleted
- StockLow
- OrderCreated
- OrderUpdated

Para arquitetura de eventos detalhada, veja [EVENT_DRIVEN_ARCHITECTURE.md](docs/EVENT_DRIVEN_ARCHITECTURE.md).

## Funções Azure

Funções serverless lidam com tarefas automatizadas:
- Alertas de reposição de estoque
- Relatórios diários de estoque
- Confirmações de pedidos

Para implementação detalhada das Funções Azure, veja [AZURE_FUNCTIONS.md](docs/AZURE_FUNCTIONS.md).

## Testes

### Testes Unitários
Execute testes unitários com:
```bash
npm test
```

### Testes Arquiteturais
O sistema inclui testes para verificar a conformidade com a Arquitetura Limpa e a separação adequada de camadas.

### Testes de Integração
Testes de integração verificam a comunicação entre serviços e fluxos de trabalho de ponta a ponta.

## Frontend

O frontend é uma aplicação web responsiva construída com JavaScript vanilla e Vite. Ele fornece:

- Gerenciamento de estoque em tempo real
- Autenticação de usuários
- Processamento de pedidos
- Painel de relatórios

Para executar o frontend:
```bash
cd frontend
npm install
npm start
```

Acesse a aplicação em `http://localhost:5173`

## Documentação da API

A documentação da API está disponível através do Swagger em `http://localhost:8080/docs` quando o BFF está em execução.

## Contribuidores

- [Seu Nome](https://github.com/seu-usuario)

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.