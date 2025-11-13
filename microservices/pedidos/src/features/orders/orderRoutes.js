import { Router } from 'express';
import orderController from './controllers/orderController.js';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', service: 'pedidos', timestamp: new Date() });
});

// Order management endpoints
router.get('/pedidos', (req, res) => orderController.getAllOrders(req, res));
router.get('/pedidos/:id', (req, res) => orderController.getOrderById(req, res));
router.post('/pedidos', (req, res) => orderController.createOrder(req, res));
router.put('/pedidos/:id', (req, res) => orderController.updateOrder(req, res));
router.delete('/pedidos/:id', (req, res) => orderController.deleteOrder(req, res));

export default router;