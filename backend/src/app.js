import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compraRoutes from './routes/compraRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/compras', compraRoutes);
app.use('/itens', itemRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'API Funcionando!',
    endpoints: {
      'POST /itens': 'Criar item',
      'GET /itens': 'Listar itens',
      'POST /compras': 'Realizar compra',
      'GET /compras': 'Listar compras'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Ocorreu um erro interno. Tente novamente jaja.' 
  });
});

export default app;
