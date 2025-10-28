import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
// import {prisma}  from "@/lib/prisma"

const router = Router();
const prisma = new PrismaClient();

// GET - Listar todos os usuários
router.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
});

// POST - Criar novo usuário
router.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const newUser = await prisma.user.create({
      data: { nome, email, senha },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
});

// GET - Buscar usuário por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    user ? res.json(user) : res.status(404).json({ erro: 'Usuário não encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

// PUT - Atualizar usuário
router.put('/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { nome, email, senha },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
});

// DELETE - Remover usuário
router.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao remover usuário' });
  }
});

export default router;
