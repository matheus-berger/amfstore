import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import authMiddleware from "../middlewares/auth";
import { validate } from '../middlewares/auth' 
import { produtoCreateSchema, produtoUpdateSchema } from "../validators/ProdutoValidator";

const produtoRoutes = Router();

// Rotas públicas
produtoRoutes.get('/produtos', ProdutoController.index);
produtoRoutes.get('/produtos/:id', ProdutoController.show);

// Rotas privadas
produtoRoutes.post('/produtos', authMiddleware, validate(produtoCreateSchema), ProdutoController.create);
produtoRoutes.put('/produtos/:id', authMiddleware, validate(produtoUpdateSchema), ProdutoController.update);
produtoRoutes.delete('/produtos/:id', authMiddleware, ProdutoController.delete);

export default produtoRoutes;
