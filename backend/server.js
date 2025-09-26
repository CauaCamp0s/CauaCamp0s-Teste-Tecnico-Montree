const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Servidor na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
