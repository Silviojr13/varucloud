import { Router } from 'express';
import orderRoutes from './features/orders/orderRoutes.js';

const router = Router();

// Mount the order routes
router.use('/', orderRoutes);

// Root endpoint
router.get('/', (_req, res) => res.json({ message: '🛒 Microserviço de Pedidos ativo!' }));

export default router;