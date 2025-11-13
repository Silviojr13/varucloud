import { Router } from 'express';
import userRoutes from './features/users/userRoutes.js';

const router = Router();

// Mount the user routes
router.use('/', userRoutes);

export default router;
