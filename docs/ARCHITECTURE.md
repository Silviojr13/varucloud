# System Architecture

## Overview

The VARU system follows Clean Architecture principles combined with Vertical Slice Architecture to ensure maintainability, testability, and scalability. This approach separates concerns and organizes code by business features rather than technical layers.

## Clean Architecture

### Principles

1. **Separation of Concerns:** Business logic is separated from infrastructure concerns
2. **Dependency Rule:** Dependencies point inward, toward higher-level policies
3. **Testability:** Business rules can be tested without UI, database, web server, or any other external element
4. **Independence:** Business rules are independent of the UI, database, framework, and external agencies

### Layers

1. **Domain Layer:** Contains business entities and rules
2. **Application Layer:** Contains use cases and application services
3. **Infrastructure Layer:** Contains implementations of external services (databases, APIs, etc.)
4. **Presentation Layer:** Contains UI and API controllers

### Dependency Flow

```
Presentation → Application → Domain
     ↓              ↓          ↑
Infrastructure ← ← ← ← ← ← ← ←
```

## Vertical Slice Architecture

### Principles

1. **Feature-Based Organization:** Code is organized by business features rather than technical layers
2. **Cohesion:** Related functionality is grouped together
3. **Reduced Coupling:** Features are loosely coupled with minimal dependencies between them
4. **Scalability:** Easy to add new features without affecting existing ones

### Structure

Each feature is organized in its own directory with the following structure:

```
src/
└── features/
    └── feature-name/
        ├── controllers/
        ├── models/
        ├── services/
        └── validators/
```

### Example: Inventory Feature

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

## Microservices Architecture

### Services

1. **Inventory Service:** Manages product inventory and stock levels
2. **Users Service:** Manages user accounts and authentication
3. **Orders Service:** Manages customer orders and processing
4. **BFF (Backend for Frontend):** Aggregates APIs for the frontend
5. **Functions:** Serverless functions for event processing

### Communication

Services communicate through:
1. **REST APIs:** For synchronous communication
2. **Message Broker:** For asynchronous event-driven communication
3. **Shared Database:** For some common data (when appropriate)

## Data Flow

### Request Processing

1. **Presentation Layer:** Receives HTTP request
2. **Controller:** Validates input and delegates to service
3. **Service:** Implements business logic and interacts with domain
4. **Domain:** Contains business rules and entities
5. **Infrastructure:** Handles data persistence and external services
6. **Response:** Returns result through presentation layer

### Example: Creating an Inventory Item

```
1. HTTP POST /inventario
2. ItemController.validateAndCreate()
3. ItemService.createItem()
4. Item.validate()
5. ItemRepository.save()
6. Return created item
```

## Technology Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** 
  - MongoDB Atlas (NoSQL for inventory)
  - SQL Server (Azure) (Relational for users/orders)
- **ORM:** Prisma (for SQL database)
- **Validation:** Zod
- **Message Broker:** RabbitMQ
- **Containerization:** Docker
- **Orchestration:** Docker Compose

### Frontend

- **Framework:** React/Vue.js (to be implemented)
- **State Management:** Redux/Vuex (to be implemented)
- **Build Tool:** Vite/Webpack (to be implemented)

### Cloud Services

- **Database:** Azure SQL Database, MongoDB Atlas
- **Serverless:** Azure Functions
- **Messaging:** RabbitMQ
- **Container Registry:** Azure Container Registry (to be implemented)
- **Deployment:** Azure App Service (to be implemented)

## Testing Strategy

### Unit Tests

- Test business logic in isolation
- Mock external dependencies
- High code coverage for critical paths

### Integration Tests

- Test service interactions
- Test database operations
- Test API endpoints

### Architectural Tests

- Verify Clean Architecture compliance
- Ensure proper layer separation
- Validate dependency flow

## Deployment

### CI/CD Pipeline

1. **Build:** Compile and package services
2. **Test:** Run automated tests
3. **Deploy:** Deploy to staging environment
4. **Validate:** Run integration tests
5. **Release:** Deploy to production

### Container Orchestration

Services are containerized and orchestrated using Docker Compose:

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
  # ... other services
```

## Monitoring and Observability

### Logging

Structured logging with consistent formats across all services.

### Metrics

Key performance indicators:
- Response times
- Error rates
- Throughput
- Resource utilization

### Tracing

Distributed tracing for request flow across services.

### Health Checks

Each service provides health check endpoints for monitoring.