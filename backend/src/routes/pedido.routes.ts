import { Router } from 'express';
import PedidoController from '../controllers/PedidoController';
import authMiddleware from '../middlewares/auth';

const pedidoRoutes = Router();

// Todas as rotas de pedido exigirão autenticação
pedidoRoutes.use(authMiddleware);

pedidoRoutes.post('/pedidos', PedidoController.create);

export default pedidoRoutes;
