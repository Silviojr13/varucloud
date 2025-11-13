# Azure Functions Implementation

## Overview

Azure Functions are used in the VARU system for serverless operations that require event-driven processing or scheduled tasks. These functions help reduce infrastructure costs and provide scalable solutions for specific business needs.

## Functions Overview

### 1. Stock Replenishment Alert Function

**Trigger:** `StockLow` event from the Event-Driven Architecture
**Purpose:** Send automated alerts when inventory levels fall below minimum thresholds

**Implementation:**
```javascript
module.exports = async function (context, event) {
    const { productId, sku, currentQuantity, minimumQuantity } = event.payload;
    
    // Send alert to procurement team
    await sendEmailAlert({
        to: 'procurement@company.com',
        subject: `Low Stock Alert: ${sku}`,
        body: `Product ${sku} has fallen below minimum stock level. Current: ${currentQuantity}, Minimum: ${minimumQuantity}`
    });
    
    // Log the alert
    context.log(`Stock alert sent for product ${sku}`);
};
```

### 2. Daily Inventory Report Function

**Trigger:** Timer trigger (daily at 9:00 AM)
**Purpose:** Generate and send daily inventory reports

**Implementation:**
```javascript
module.exports = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();
    
    // Generate inventory report
    const report = await generateInventoryReport();
    
    // Send report via email
    await sendEmail({
        to: 'management@company.com',
        subject: `Daily Inventory Report - ${timeStamp}`,
        body: formatReport(report)
    });
    
    context.log('Daily inventory report sent');
};
```

### 3. Order Confirmation Function

**Trigger:** `OrderCreated` event
**Purpose:** Send order confirmation emails to customers

**Implementation:**
```javascript
module.exports = async function (context, event) {
    const { orderId, customerId, items, totalAmount } = event.payload;
    
    // Get customer details
    const customer = await getCustomerDetails(customerId);
    
    // Send confirmation email
    await sendEmail({
        to: customer.email,
        subject: `Order Confirmation #${orderId}`,
        body: generateOrderConfirmation(orderId, items, totalAmount)
    });
    
    context.log(`Order confirmation sent for order ${orderId}`);
};
```

## Deployment

### Prerequisites

1. Azure subscription
2. Azure Functions Core Tools
3. Node.js 18.x or later
4. Azure Storage Account for deployment

### Deployment Steps

1. **Create Function App in Azure:**
   ```bash
   az functionapp create \
     --resource-group myResourceGroup \
     --consumption-plan-location westus \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4 \
     --name varu-functions \
     --storage-account mystorageaccount
   ```

2. **Deploy Functions:**
   ```bash
   func azure functionapp publish varu-functions
   ```

### Local Development

1. Install Azure Functions Core Tools:
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. Run functions locally:
   ```bash
   func start
   ```

## Configuration

### Application Settings

Set the following application settings in your Function App:

```
AzureWebJobsStorage=<storage-connection-string>
FUNCTIONS_WORKER_RUNTIME=node
DATABASE_CONNECTION_STRING=<your-database-connection>
EMAIL_SERVICE_API_KEY=<your-email-service-key>
```

### Local Development Settings

Create a `local.settings.json` file:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "DATABASE_CONNECTION_STRING": "your-local-database-connection",
    "EMAIL_SERVICE_API_KEY": "your-email-service-key"
  }
}
```

## Monitoring and Logging

### Application Insights

Enable Application Insights for your Function App to monitor:

1. Function execution counts and durations
2. Error rates and exceptions
3. Performance metrics
4. Custom business metrics

### Logging

Use context.log() for structured logging:

```javascript
context.log('Information', 'Processing order', { orderId: order.id });
context.log.error('Error processing payment', { error: error.message });
```

## Best Practices

1. **Keep Functions Small:** Each function should have a single responsibility
2. **Use Async/Await:** For better performance and error handling
3. **Handle Errors Gracefully:** Implement proper error handling and retry logic
4. **Use Managed Identities:** For secure access to Azure resources
5. **Monitor Performance:** Regularly check execution times and resource usage
6. **Version Control:** Keep function code in version control with clear commit messages