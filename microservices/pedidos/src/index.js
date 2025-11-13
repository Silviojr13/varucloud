import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`✅ Microserviço de Pedidos rodando na porta ${PORT}`);
});
