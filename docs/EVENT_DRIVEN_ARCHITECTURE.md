# Arquitetura Orientada a Eventos

## Visão Geral

O sistema VARU implementa uma Arquitetura Orientada a Eventos para permitir o acoplamento flexível entre microserviços e facilitar a comunicação em tempo real. Esta arquitetura permite que os serviços reajam a eventos de negócio sem dependências diretas.

## Tipos de Eventos

### Eventos Principais

1. **ProductUpdated** - Disparado quando um item de estoque é criado, atualizado ou deletado
2. **StockLow** - Disparado quando os níveis de estoque caem abaixo do limiar mínimo
3. **OrderCreated** - Disparado quando um novo pedido é realizado
4. **OrderUpdated** - Disparado quando o status de um pedido muda
5. **UserRegistered** - Disparado quando um novo usuário se registra
6. **SupplierUpdated** - Disparado quando informações do fornecedor mudam

## Message Broker

O sistema usa RabbitMQ como message broker para comunicação de eventos entre serviços.

### Configuração do RabbitMQ

1. Instale o servidor RabbitMQ
2. Configure exchanges e filas para cada tipo de evento
3. Configure chaves de roteamento apropriadas
4. Configure segurança e controles de acesso

### Configuração do Exchange

```
Exchange: varu.events
Type: topic
```

### Configuração das Filas

1. **inventory.events** - Para eventos relacionados ao estoque
2. **orders.events** - Para eventos relacionados a pedidos
3. **users.events** - Para eventos relacionados a usuários
4. **notifications.events** - Para eventos de notificação

## Fluxo de Eventos

### Fluxo de Atualização de Produto

1. Usuário atualiza um produto no serviço de estoque
2. Serviço de estoque publica um evento `ProductUpdated` no RabbitMQ
3. Serviço de pedidos recebe o evento e atualiza pedidos relacionados se necessário
4. Serviço de notificação recebe o evento e envia alertas se configurado

### Fluxo de Alerta de Estoque Baixo

1. Serviço de estoque detecta níveis de estoque abaixo do limiar
2. Serviço de estoque publica um evento `StockLow` no RabbitMQ
3. Serviço de notificação recebe o evento e envia alertas
4. Função Azure é disparada para processar reposição automatizada

### Fluxo de Criação de Pedido

1. Usuário realiza um novo pedido no serviço de pedidos
2. Serviço de pedidos publica um evento `OrderCreated` no RabbitMQ
3. Serviço de estoque recebe o evento e atualiza os níveis de estoque
4. Serviço de notificação recebe o evento e envia confirmação ao usuário

## Implementação de Exemplo

### Publicando um Evento

```javascript
// No serviço de estoque
const event = {
  type: 'ProductUpdated',
  payload: {
    productId: '12345',
    name: 'Produto Atualizado',
    sku: 'PROD-123',
    quantity: 100,
    price: 29.99
  },
  timestamp: new Date().toISOString()
};

await eventPublisher.publish('varu.events', 'inventory.product.updated', event);
```

### Consumindo um Evento

```javascript
// No serviço de pedidos
eventConsumer.subscribe('varu.events', 'inventory.product.updated', async (event) => {
  // Atualiza pedidos relacionados com base nas mudanças do produto
  await orderService.updateRelatedOrders(event.payload.productId);
});
```

## Tratamento de Erros

1. Implemente filas dead letter para processamento de eventos falhos
2. Adicione mecanismos de retry com backoff exponencial
3. Registre todos os eventos e resultados de processamento para debugging
4. Monitore métricas de processamento de eventos

## Monitoramento

1. Acompanhe taxas de publicação de eventos
2. Monitore latência de processamento de eventos
3. Envie alertas em falhas de processamento de eventos
4. Dashboard para visualização do fluxo de eventos