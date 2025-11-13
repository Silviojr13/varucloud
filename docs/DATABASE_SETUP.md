# Guia de Configuração do Banco de Dados

## Visão Geral

O sistema VARU utiliza dois tipos de bancos de dados:

1. **SQL Server (Azure)** - Para dados relacionais (usuários, pedidos, fornecedores, clientes)
2. **MongoDB Atlas** - Para dados não relacionais (itens de estoque, logs, eventos, cache)

## Configuração do SQL Server (Azure)

### 1. Criar um Banco de Dados SQL Azure

1. Faça login no Portal Azure
2. Crie um novo recurso de Banco de Dados SQL
3. Configure o banco de dados com configurações apropriadas:
   - Servidor: Crie um novo servidor ou use um existente
   - Nome do banco de dados: `varucloud`
   - Computação + armazenamento: Tier padrão ou superior
4. Configure as regras de firewall para permitir conexões dos seus serviços

### 2. Esquema do Banco de Dados

O banco de dados deve incluir as seguintes tabelas:

```sql
-- Tabela de Usuários
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Tabela de Fornecedores
CREATE TABLE Suppliers (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    ContactEmail NVARCHAR(255),
    ContactPhone NVARCHAR(20),
    Address NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Tabela de Clientes
CREATE TABLE Customers (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(20),
    Address NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Tabela de Pedidos
CREATE TABLE Orders (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CustomerId UNIQUEIDENTIFIER NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);

-- Tabela de Itens do Pedido
CREATE TABLE OrderItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    OrderId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);
```

### 3. Configuração de Conexão

Atualize a string de conexão nos seus serviços:

```
Server=seu-servidor.database.windows.net;Database=varucloud;User Id=seu-usuario;Password=sua-senha;Encrypt=true;
```

## Configuração do MongoDB Atlas

### 1. Criar um Cluster MongoDB Atlas

1. Registre-se no MongoDB Atlas em https://www.mongodb.com/cloud/atlas
2. Crie um novo cluster com o tier gratuito (M0) ou superior
3. Configure o acesso à rede para permitir conexões dos seus serviços
4. Crie um usuário de banco de dados com permissões apropriadas

### 2. Esquema do Banco de Dados

Coleções MongoDB:

1. **Items** - Itens de estoque
2. **Logs** - Logs do sistema
3. **Events** - Eventos de negócio
4. **Cache** - Dados em cache

### 3. Configuração de Conexão

Atualize a string de conexão do MongoDB nos seus serviços:

```
mongodb+srv://usuario:senha@cluster.mongodb.net/banco-de-dados?retryWrites=true&w=majority
```

## Variáveis de Ambiente

Defina as seguintes variáveis de ambiente em cada serviço:

### Serviço de Inventário (.env)
```
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/varucloud?retryWrites=true&w=majority
PORT=3001
```

### Serviço de Usuários (.env)
```
TURSO_DATABASE_URL=libsql://seu-banco-de-dados.turso.io
TURSO_AUTH_TOKEN=seu-token-de-autenticacao
PORT=3002
```

### Serviço de Pedidos (.env)
```
SQL_SERVER_CONNECTION_STRING=Server=seu-servidor.database.windows.net;Database=varucloud;User Id=seu-usuario;Password=sua-senha;Encrypt=true;
PORT=3003
```

## Testando Conexões com Bancos de Dados

Para testar suas conexões com bancos de dados:

1. Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente
2. Execute cada serviço individualmente para verificar a conectividade com o banco de dados
3. Verifique os logs do serviço para quaisquer erros de conexão
4. Use ferramentas de gerenciamento de banco de dados para verificar o acesso aos dados