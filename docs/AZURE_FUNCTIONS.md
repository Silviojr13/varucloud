# Implementação das Funções Azure

## Visão Geral

As Funções Azure são usadas no sistema VARU para operações serverless que requerem processamento orientado a eventos ou tarefas agendadas. Essas funções ajudam a reduzir custos de infraestrutura e fornecem soluções escaláveis para necessidades de negócio específicas.

## Visão Geral das Funções

### 1. Função de Alerta de Reposição de Estoque

**Gatilho:** Evento `StockLow` da Arquitetura Orientada a Eventos
**Propósito:** Enviar alertas automatizados quando os níveis de estoque caírem abaixo dos limiares mínimos

**Implementação:**
```javascript
module.exports = async function (context, event) {
    const { productId, sku, currentQuantity, minimumQuantity } = event.payload;
    
    // Envia alerta para o time de compras
    await sendEmailAlert({
        to: 'compras@empresa.com',
        subject: `Alerta de Estoque Baixo: ${sku}`,
        body: `O produto ${sku} caiu abaixo do nível mínimo de estoque. Atual: ${currentQuantity}, Mínimo: ${minimumQuantity}`
    });
    
    // Registra o alerta
    context.log(`Alerta de estoque enviado para o produto ${sku}`);
};
```

### 2. Função de Relatório Diário de Inventário

**Gatilho:** Gatilho de timer (diariamente às 9:00 AM)
**Propósito:** Gerar e enviar relatórios diários de estoque

**Implementação:**
```javascript
module.exports = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();
    
    // Gera relatório de estoque
    const report = await generateInventoryReport();
    
    // Envia relatório por email
    await sendEmail({
        to: 'gestao@empresa.com',
        subject: `Relatório Diário de Estoque - ${timeStamp}`,
        body: formatReport(report)
    });
    
    context.log('Relatório diário de estoque enviado');
};
```

### 3. Função de Confirmação de Pedido

**Gatilho:** Evento `OrderCreated`
**Propósito:** Enviar emails de confirmação de pedidos aos clientes

**Implementação:**
```javascript
module.exports = async function (context, event) {
    const { orderId, customerId, items, totalAmount } = event.payload;
    
    // Obtém detalhes do cliente
    const customer = await getCustomerDetails(customerId);
    
    // Envia email de confirmação
    await sendEmail({
        to: customer.email,
        subject: `Confirmação de Pedido #${orderId}`,
        body: generateOrderConfirmation(orderId, items, totalAmount)
    });
    
    context.log(`Confirmação de pedido enviada para o pedido ${orderId}`);
};
```

## Implantação

### Pré-requisitos

1. Assinatura Azure
2. Azure Functions Core Tools
3. Node.js 18.x ou superior
4. Conta de Armazenamento Azure para implantação

### Etapas de Implantação

1. **Criar Function App no Azure:**
   ```bash
   az functionapp create \
     --resource-group meuGrupoDeRecursos \
     --consumption-plan-location westus \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4 \
     --name varu-functions \
     --storage-account minhacontadearmazenamento
   ```

2. **Implantar Funções:**
   ```bash
   func azure functionapp publish varu-functions
   ```

### Desenvolvimento Local

1. Instale o Azure Functions Core Tools:
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. Execute funções localmente:
   ```bash
   func start
   ```

## Configuração

### Configurações da Aplicação

Defina as seguintes configurações da aplicação no seu Function App:

```
AzureWebJobsStorage=<string-de-conexao-do-armazenamento>
FUNCTIONS_WORKER_RUNTIME=node
DATABASE_CONNECTION_STRING=<sua-string-de-conexao-do-banco-de-dados>
EMAIL_SERVICE_API_KEY=<sua-chave-da-api-do-servico-de-email>
```

### Configurações de Desenvolvimento Local

Crie um arquivo `local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "DATABASE_CONNECTION_STRING": "sua-string-de-conexao-local",
    "EMAIL_SERVICE_API_KEY": "sua-chave-da-api-de-email"
  }
}
```

## Monitoramento e Logging

### Application Insights

Habilite o Application Insights para o seu Function App para monitorar:

1. Contagens de execução de funções e durações
2. Taxas de erro e exceções
3. Métricas de desempenho
4. Métricas de negócio personalizadas

### Logging

Use context.log() para logging estruturado:

```javascript
context.log('Informação', 'Processando pedido', { orderId: order.id });
context.log.error('Erro processando pagamento', { error: error.message });
```

## Melhores Práticas

1. **Mantenha Funções Pequenas:** Cada função deve ter uma única responsabilidade
2. **Use Async/Await:** Para melhor desempenho e tratamento de erros
3. **Trate Erros Graciosamente:** Implemente tratamento de erros adequado e lógica de retry
4. **Use Identidades Gerenciadas:** Para acesso seguro a recursos Azure
5. **Monitore o Desempenho:** Verifique regularmente tempos de execução e uso de recursos
6. **Controle de Versão:** Mantenha o código das funções no controle de versão com mensagens de commit claras