import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import authMiddleware from "../middlewares/auth";
import { validate } from '../middlewares/auth' 
import { produtoCreateSchema, produtoUpdateSchema } from "../validators/ProdutoValidator";

const produtoRoutes = Router();

// Rotas públicas
produtoRoutes.get('/produtos', ProdutoController.index);
produtoRoutes.get('/produtos/:id', ProdutoController.show);

// Midlaware de segurança para as rotas privadas
produtoRoutes.use(authMiddleware);  // Usa o middleware daqui para baixo

// Rotas privadas
produtoRoutes.post('/produtos', validate(produtoCreateSchema), ProdutoController.create);
produtoRoutes.put('/produtos/:id', validate(produtoUpdateSchema), ProdutoController.update);
produtoRoutes.delete('/produtos/:id', ProdutoController.delete);

export default produtoRoutes;
