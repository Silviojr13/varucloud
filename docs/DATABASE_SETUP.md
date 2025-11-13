# Database Setup Guide

## Overview

The VARU system uses two types of databases:

1. **SQL Server (Azure)** - For relational data (users, orders, suppliers, customers)
2. **MongoDB Atlas** - For non-relational data (inventory items, logs, events, cache)

## SQL Server (Azure) Setup

### 1. Create an Azure SQL Database

1. Log in to the Azure Portal
2. Create a new SQL Database resource
3. Configure the database with appropriate settings:
   - Server: Create a new server or use existing
   - Database name: `varucloud`
   - Compute + storage: Standard tier or higher
4. Configure firewall rules to allow connections from your services

### 2. Database Schema

The database should include the following tables:

```sql
-- Users table
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Suppliers table
CREATE TABLE Suppliers (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    ContactEmail NVARCHAR(255),
    ContactPhone NVARCHAR(20),
    Address NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Customers table
CREATE TABLE Customers (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(20),
    Address NVARCHAR(500),
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

-- Orders table
CREATE TABLE Orders (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CustomerId UNIQUEIDENTIFIER NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);

-- OrderItems table
CREATE TABLE OrderItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    OrderId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id)
);
```

### 3. Connection Configuration

Update the connection string in your services:

```
Server=your-server.database.windows.net;Database=varucloud;User Id=your-username;Password=your-password;Encrypt=true;
```

## MongoDB Atlas Setup

### 1. Create a MongoDB Atlas Cluster

1. Sign up for MongoDB Atlas at https://www.mongodb.com/cloud/atlas
2. Create a new cluster with the free tier (M0) or higher
3. Configure network access to allow connections from your services
4. Create a database user with appropriate permissions

### 2. Database Schema

MongoDB collections:

1. **Items** - Inventory items
2. **Logs** - System logs
3. **Events** - Business events
4. **Cache** - Cached data

### 3. Connection Configuration

Update the MongoDB connection string in your services:

```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## Environment Variables

Set the following environment variables in each service:

### Inventory Service (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/varucloud?retryWrites=true&w=majority
PORT=3001
```

### Users Service (.env)
```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
PORT=3002
```

### Orders Service (.env)
```
SQL_SERVER_CONNECTION_STRING=Server=your-server.database.windows.net;Database=varucloud;User Id=your-username;Password=your-password;Encrypt=true;
PORT=3003
```

## Testing Database Connections

To test your database connections:

1. Ensure all environment variables are set correctly
2. Run each service individually to verify database connectivity
3. Check the service logs for any connection errors
4. Use database management tools to verify data access