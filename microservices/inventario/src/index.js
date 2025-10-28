import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão Mongo
const { MONGO_URI, PORT = 3001 } = process.env;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI não definido no .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => {
    console.error('❌ Erro ao conectar MongoDB', err?.message || err);
    process.exit(1);
  });

// Rotas
import routes from './routes.js';
app.use('/', routes);

// Raiz / status
app.get('/', (_req, res) => res.json({ message: 'Inventário ativo!' }));

app.listen(PORT, () => {
  console.log(`📦 Inventário rodando na porta ${PORT}`);
});
