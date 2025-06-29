import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// Configuração do Servidor
const app = express();
const PORT = 3333;

// Configuração de conexão com o Banco de Dados (Atlas MongoDB)
mongoose.connect(process.env.DATABASE_URL!)
  .then(() => {
    console.log("✅ Conexão ao Atlas MongoDB realizada com sucesso!")
  }).catch((erro) => {
    console.log("❌ Não foi possivel realizar a conexão com o Atlas MongoDB.");
    console.log("Razão: ", erro);
  });

// Rotas da API
app.get('/', (_request, response) => {
  return response.json({mensagem: 'Servidor AMFStore'});
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}!`)
});
