import { Router } from 'express';
import Item from './models/Item.js';
import { z } from 'zod';

const router = Router();

const itemSchema = z.object({
  nome: z.string().min(1),
  sku: z.string().min(1),
  quantidade: z.number().int().nonnegative(),
  preco: z.number().nonnegative(),
  validade: z.string().datetime().optional() // ISO date string
});

// Health
router.get('/health', (_req, res) => {
  res.json({ status: 'OK', service: 'inventario', ts: new Date() });
});

// Listar todos
router.get('/inventario', async (_req, res) => {
  try {
    const data = await Item.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error('GET /inventario', err);
    res.status(500).json({ erro: 'Falha ao listar inventário' });
  }
});

// Obter por ID
router.get('/inventario/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

// Criar
router.post('/inventario', async (req, res) => {
  try {
    const parsed = itemSchema.parse(req.body);
    // zod válida string ISO -> converte p/ Date se veio
    const doc = await Item.create({
      ...parsed,
      validade: parsed.validade ? new Date(parsed.validade) : undefined
    });
    res.status(201).json(doc);
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({ erro: 'Payload inválido', detalhes: err.errors });
    }
    if (err?.code === 11000) {
      return res.status(409).json({ erro: 'SKU já cadastrado' });
    }
    console.error('POST /inventario', err);
    res.status(500).json({ erro: 'Falha ao criar item' });
  }
});

// Atualizar
router.put('/inventario/:id', async (req, res) => {
  try {
    const partialSchema = itemSchema.partial();
    const parsed = partialSchema.parse(req.body);

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      {
        ...parsed,
        ...(parsed.validade ? { validade: new Date(parsed.validade) } : {})
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json(updated);
  } catch (err) {
    if (err?.name === 'ZodError') {
      return res.status(400).json({ erro: 'Payload inválido', detalhes: err.errors });
    }
    res.status(400).json({ erro: 'Requisição inválida' });
  }
});

// Deletar
router.delete('/inventario/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ erro: 'Item não encontrado' });
    res.json({ ok: true });
  } catch (_err) {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

export default router;
