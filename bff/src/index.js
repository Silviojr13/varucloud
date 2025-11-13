import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Carrega o arquivo swagger.yaml
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ message: '✅ BFF is running inside Docker!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas do microserviço de Inventário (proxy via BFF)
app.get('/inventario', async (req, res) => {
  try {
    const response = await axios.get('http://inventario:3001/inventario');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Inventário:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de inventário' });
  }
});

app.get('/inventario/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://inventario:3001/inventario/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Inventário:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de inventário' });
  }
});

app.post('/inventario', async (req, res) => {
  try {
    const response = await axios.post('http://inventario:3001/inventario', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Inventário:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de inventário' });
  }
});

app.put('/inventario/:id', async (req, res) => {
  try {
    const response = await axios.put(`http://inventario:3001/inventario/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Inventário:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de inventário' });
  }
});

app.delete('/inventario/:id', async (req, res) => {
  try {
    const response = await axios.delete(`http://inventario:3001/inventario/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Inventário:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de inventário' });
  }
});

// Rotas do microserviço de Pedidos (via BFF)
app.get('/pedidos', async (req, res) => {
  try {
    const response = await axios.get('http://pedidos:3003/pedidos');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de pedidos' });
  }
});

app.get('/pedidos/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://pedidos:3003/pedidos/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de pedidos' });
  }
});

app.post('/pedidos', async (req, res) => {
  try {
    const response = await axios.post('http://pedidos:3003/pedidos', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de pedidos' });
  }
});

app.put('/pedidos/:id', async (req, res) => {
  try {
    const response = await axios.put(`http://pedidos:3003/pedidos/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de pedidos' });
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  try {
    const response = await axios.delete(`http://pedidos:3003/pedidos/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao comunicar com Pedidos:', error.message);
    res.status(500).json({ error: 'Erro ao acessar o microserviço de pedidos' });
  }
});

// Rotas do Microserviço de Usuários (Proxy via BFF)
app.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get('http://usuarios:3002/usuarios');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao acessar microserviço de usuários (GET):', error.message);
    res.status(500).json({ erro: 'Erro ao acessar o microserviço de usuários' });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const response = await axios.post('http://usuarios:3002/usuarios', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar usuário (POST):', error.message);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://usuarios:3002/usuarios/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar usuário (GET by ID):', error.message);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const response = await axios.put(`http://usuarios:3002/usuarios/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao atualizar usuário (PUT):', error.message);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const response = await axios.delete(`http://usuarios:3002/usuarios/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao remover usuário (DELETE):', error.message);
    res.status(500).json({ erro: 'Erro ao remover usuário' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 BFF running on port ${PORT} (Swagger at /docs)`);
});
