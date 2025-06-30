import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import produtoRoutes from './routes/produto.routes';
import usuarioRotas from './routes/usuario.routes';
import sessionRoutes from './routes/session.routes';

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

/*  Middlewares */

// middleware para o Express entender JSON
app.use(express.json());

/* Rotas da API */

// Produto
app.use('/api', sessionRoutes);
app.use('/api', produtoRoutes);
app.use('/api', usuarioRotas);

/* Rotas de Testes */
app.get('/', (_request: Request, response: Response) => {
  return response.json({mensagem: 'Servidor AMFStore'});
});

//
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}!`)
});
