import { Router } from 'express';
import userController from './controllers/userController.js';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', service: 'usuarios', timestamp: new Date() });
});

// User management endpoints
router.get('/usuarios', (req, res) => userController.getAllUsers(req, res));
router.get('/usuarios/:id', (req, res) => userController.getUserById(req, res));
router.post('/usuarios', (req, res) => userController.createUser(req, res));
router.put('/usuarios/:id', (req, res) => userController.updateUser(req, res));
router.delete('/usuarios/:id', (req, res) => userController.deleteUser(req, res));

export default router;