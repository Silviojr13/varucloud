import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import eventConsumer from './events/eventConsumer.js';
import EventHandlers from './events/eventHandlers.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use('/', routes);

// Subscribe to inventory events
async function subscribeToEvents() {
  try {
    await eventConsumer.subscribe('varu.events', 'inventory.product.created', EventHandlers.handleProductCreated);
    await eventConsumer.subscribe('varu.events', 'inventory.product.updated', EventHandlers.handleProductUpdated);
    await eventConsumer.subscribe('varu.events', 'inventory.product.deleted', EventHandlers.handleProductDeleted);
  } catch (error) {
    console.error('❌ Failed to subscribe to events:', error.message);
  }
}

// Start event subscription
subscribeToEvents();

app.listen(PORT, () => {
  console.log(`✅ Microserviço de Pedidos rodando na porta ${PORT}`);
});