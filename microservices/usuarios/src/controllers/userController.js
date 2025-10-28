import { db } from '../database.js';
import { randomUUID } from 'crypto';

// Listar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await db.execute('SELECT * FROM User');
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Buscar usuário por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.execute('SELECT * FROM User WHERE id = ?', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const id = randomUUID();
    await db.execute(
      'INSERT INTO User (id, nome, email, senha) VALUES (?, ?, ?, ?)',
      [id, nome, email, senha]
    );
    res.status(201).json({ id, nome, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};
