require('dotenv').config();
const express = require('express');
const compraRoutes = require('./routes/compraRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

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

module.exports = app;
