# Arquitetura do Sistema

## Visão Geral

O sistema VARU segue os princípios da Arquitetura Limpa combinada com a Arquitetura de Fatia Vertical para garantir manutenibilidade, testabilidade e escalabilidade. Esta abordagem separa as preocupações e organiza o código por recursos de negócio em vez de camadas técnicas.

## Arquitetura Limpa

### Princípios

1. **Separação de Preocupações:** A lógica de negócio é separada das preocupações de infraestrutura
2. **Regra de Dependência:** As dependências apontam para dentro, em direção às políticas de nível superior
3. **Testabilidade:** As regras de negócio podem ser testadas sem UI, banco de dados, servidor web ou qualquer outro elemento externo
4. **Independência:** As regras de negócio são independentes da UI, banco de dados, framework e agências externas

### Camadas

1. **Camada de Domínio:** Entidades e regras de negócio
2. **Camada de Aplicação:** Casos de uso e serviços de aplicação
3. **Camada de Infraestrutura:** Implementações de serviços externos (bancos de dados, APIs, etc.)
4. **Camada de Apresentação:** Controladores de UI e API

### Fluxo de Dependência

```
Apresentação → Aplicação → Domínio
     ↓              ↓          ↑
Infraestrutura ← ← ← ← ← ← ← ←
```

## Arquitetura de Fatia Vertical

### Princípios

1. **Organização Baseada em Recursos:** O código é organizado por recursos de negócio em vez de camadas técnicas
2. **Coesão:** A funcionalidade relacionada é agrupada junta
3. **Acoplamento Reduzido:** Os recursos são acoplados de forma flexível com dependências mínimas entre eles
4. **Escalabilidade:** Fácil adicionar novos recursos sem afetar os existentes

### Estrutura

Cada recurso é organizado em seu próprio diretório com a seguinte estrutura:

```
src/
└── features/
    └── nome-do-recurso/
        ├── controllers/
        ├── models/
        ├── services/
        └── validators/
```

### Exemplo: Recurso de Inventário

```
src/
└── features/
    └── items/
        ├── controllers/
        │   └── itemController.js
        ├── models/
        │   └── Item.js
        ├── services/
        │   └── itemService.js
        └── validators/
            └── itemValidator.js
```

## Arquitetura de Microserviços

### Serviços

1. **Serviço de Inventário:** Gerencia o estoque de produtos e níveis de estoque
2. **Serviço de Usuários:** Gerencia contas de usuários e autenticação
3. **Serviço de Pedidos:** Gerencia pedidos de clientes e processamento
4. **BFF (Backend para Frontend):** Agrega APIs para o frontend
5. **Funções:** Funções serverless para processamento de eventos

### Comunicação

Os serviços se comunicam através de:
1. **APIs REST:** Para comunicação síncrona
2. **Message Broker:** Para comunicação orientada a eventos assíncrona
3. **Banco de Dados Compartilhado:** Para alguns dados comuns (quando apropriado)

## Fluxo de Dados

### Processamento de Requisições

1. **Camada de Apresentação:** Recebe a requisição HTTP
2. **Controlador:** Valida a entrada e delega para o serviço
3. **Serviço:** Implementa a lógica de negócio e interage com o domínio
4. **Domínio:** Contém as regras de negócio e entidades
5. **Infraestrutura:** Lida com persistência de dados e serviços externos
6. **Resposta:** Retorna o resultado através da camada de apresentação

### Exemplo: Criando um Item de Inventário

```
1. HTTP POST /inventario
2. ItemController.validateAndCreate()
3. ItemService.createItem()
4. Item.validate()
5. ItemRepository.save()
6. Retorna o item criado
```

## Stack de Tecnologia

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** 
  - MongoDB Atlas (NoSQL para inventário)
  - SQL Server (Azure) (Relacional para usuários/pedidos)
- **ORM:** Prisma (para banco de dados SQL)
- **Validação:** Zod
- **Message Broker:** RabbitMQ
- **Contêinerização:** Docker
- **Orquestração:** Docker Compose

### Frontend

- **Framework:** React/Vue.js (a ser implementado)
- **Gerenciamento de Estado:** Redux/Vuex (a ser implementado)
- **Ferramenta de Build:** Vite/Webpack (a ser implementado)

### Serviços em Nuvem

- **Banco de Dados:** Azure SQL Database, MongoDB Atlas
- **Serverless:** Azure Functions
- **Mensageria:** RabbitMQ
- **Registro de Contêineres:** Azure Container Registry (a ser implementado)
- **Implantação:** Azure App Service (a ser implementado)

## Estratégia de Testes

### Testes Unitários

- Testa a lógica de negócio em isolamento
- Mocka dependências externas
- Alta cobertura de código para caminhos críticos

### Testes de Integração

- Testa interações entre serviços
- Testa operações de banco de dados
- Testa endpoints da API

### Testes Arquiteturais

- Verifica a conformidade com a Arquitetura Limpa
- Garante a separação adequada de camadas
- Valida o fluxo de dependências

## Implantação

### Pipeline CI/CD

1. **Build:** Compila e empacota os serviços
2. **Teste:** Executa testes automatizados
3. **Implantação:** Implanta no ambiente de staging
4. **Validação:** Executa testes de integração
5. **Lançamento:** Implanta em produção

### Orquestração de Contêineres

Os serviços são conteinerizados e orquestrados usando Docker Compose:

```yaml
services:
  inventario:
    build: ./microservices/inventario
    ports:
      - "3001:3001"
  usuarios:
    build: ./microservices/usuarios
    ports:
      - "3002:3002"
  # ... outros serviços
```

## Monitoramento e Observabilidade

### Logging

Logging estruturado com formatos consistentes em todos os serviços.

### Métricas

Indicadores de desempenho chave:
- Tempos de resposta
- Taxas de erro
- Throughput
- Utilização de recursos

### Tracing

Tracing distribuído para fluxo de requisições entre serviços.

### Health Checks

Cada serviço fornece endpoints de health check para monitoramento.