import { Router } from 'express';
import itemRoutes from './features/items/itemRoutes.js';

const router = Router();

// Mount the item routes
router.use('/', itemRoutes);

// Root endpoint
router.get('/', (_req, res) => res.json({ message: '📦 Inventário ativo!' }));

export default router;
