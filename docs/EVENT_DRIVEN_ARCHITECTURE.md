# Event-Driven Architecture

## Overview

The VARU system implements an Event-Driven Architecture to enable loose coupling between microservices and facilitate real-time communication. This architecture allows services to react to business events without direct dependencies.

## Event Types

### Core Events

1. **ProductUpdated** - Triggered when an inventory item is created, updated, or deleted
2. **StockLow** - Triggered when inventory levels fall below the minimum threshold
3. **OrderCreated** - Triggered when a new order is placed
4. **OrderUpdated** - Triggered when an order status changes
5. **UserRegistered** - Triggered when a new user registers
6. **SupplierUpdated** - Triggered when supplier information changes

## Message Broker

The system uses RabbitMQ as the message broker for event communication between services.

### RabbitMQ Setup

1. Install RabbitMQ server
2. Configure exchanges and queues for each event type
3. Set up appropriate routing keys
4. Configure security and access controls

### Exchange Configuration

```
Exchange: varu.events
Type: topic
```

### Queue Configuration

1. **inventory.events** - For inventory-related events
2. **orders.events** - For order-related events
3. **users.events** - For user-related events
4. **notifications.events** - For notification events

## Event Flow

### Product Updated Flow

1. User updates a product in the inventory service
2. Inventory service publishes a `ProductUpdated` event to RabbitMQ
3. Orders service receives the event and updates related orders if needed
4. Notification service receives the event and sends alerts if configured

### Low Stock Alert Flow

1. Inventory service detects stock levels below threshold
2. Inventory service publishes a `StockLow` event to RabbitMQ
3. Notification service receives the event and sends alerts
4. Azure Function triggers to process automated replenishment

### Order Creation Flow

1. User places a new order in the orders service
2. Orders service publishes an `OrderCreated` event to RabbitMQ
3. Inventory service receives the event and updates stock levels
4. Notification service receives the event and sends confirmation to user

## Implementation Example

### Publishing an Event

```javascript
// In inventory service
const event = {
  type: 'ProductUpdated',
  payload: {
    productId: '12345',
    name: 'Updated Product',
    sku: 'PROD-123',
    quantity: 100,
    price: 29.99
  },
  timestamp: new Date().toISOString()
};

await eventPublisher.publish('varu.events', 'inventory.product.updated', event);
```

### Consuming an Event

```javascript
// In orders service
eventConsumer.subscribe('varu.events', 'inventory.product.updated', async (event) => {
  // Update related orders based on product changes
  await orderService.updateRelatedOrders(event.payload.productId);
});
```

## Error Handling

1. Implement dead letter queues for failed event processing
2. Add retry mechanisms with exponential backoff
3. Log all events and processing results for debugging
4. Monitor event processing metrics

## Monitoring

1. Track event publishing rates
2. Monitor event processing latency
3. Alert on event processing failures
4. Dashboard for event flow visualization