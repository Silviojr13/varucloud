import { Router } from 'express';
import { getUsers, createUser, getUserById } from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);        // GET /usuarios
router.get('/:id', getUserById);  // GET /usuarios/:id
router.post('/', createUser);     // POST /usuarios

export default router;
