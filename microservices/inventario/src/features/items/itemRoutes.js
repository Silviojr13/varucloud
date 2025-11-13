import { Router } from 'express';
import itemController from './controllers/itemController.js';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', service: 'inventario', timestamp: new Date() });
});

// Item management endpoints
router.get('/inventario', (req, res) => itemController.getAllItems(req, res));
router.get('/inventario/:id', (req, res) => itemController.getItemById(req, res));
router.post('/inventario', (req, res) => itemController.createItem(req, res));
router.put('/inventario/:id', (req, res) => itemController.updateItem(req, res));
router.delete('/inventario/:id', (req, res) => itemController.deleteItem(req, res));

export default router;