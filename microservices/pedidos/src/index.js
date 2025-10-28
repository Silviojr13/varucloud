import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/pedidos', (req, res) => {
  res.json({ message: '🛒 Microserviço de Pedidos ativo!' });
});

app.listen(PORT, () => {
  console.log(`✅ Microserviço de Pedidos rodando na porta ${PORT}`);
});
