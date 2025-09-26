require('dotenv').config();
const express = require('express');
const compraRoutes = require('./routes/compraRoutes');

const app = express();

app.use(express.json());

app.use('/compras', compraRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API Montree - Backend funcionando!',
    endpoints: {
      'POST /compras': 'Criar compra',
      'GET /compras': 'Listar compras'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app;
