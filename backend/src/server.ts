import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import produtoRoutes from './routes/produto.routes';
import usuarioRotas from './routes/usuario.routes';
import sessionRoutes from './routes/session.routes';
import AppError from './errors/AppError';
import cors from 'cors';
import pedidoRoutes from './routes/pedido.routes';
import uploadConfig from './config/upload';

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

/*  Configuração do CORS  */

const urlsOriginsPermitidas = [
  'http://localhost:5173',
  'https://amfstore.vercel.app/'
];

const options: cors.CorsOptions = {
  origin: urlsOriginsPermitidas
};

app.use(cors(options));

/* Para imagens */

app.use('/files', express.static(uploadConfig.directory));

/* Rotas da API */

app.use('/api', sessionRoutes);
app.use('/api', produtoRoutes);
app.use('/api', usuarioRotas);
app.use('/api', pedidoRoutes);

/* Rotas de Testes */
app.get('/', (_request: Request, response: Response) => {
  return response.json({ mensagem: 'Servidor AMFStore' })
});

// Gerenciador de Erros
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  // Log no console para o desenvolvedor
  console.error(error);

  // Retornar erro 500 genérico caso for um erro inesperado
  return response.status(500).json({
    status: 'error',
    message: "Erro interno do servidor."
  });
});

//
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}!`)
});
