import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";

const produtoRoutes = Router();

produtoRoutes.post('/produtos', ProdutoController.create);

produtoRoutes.get('/produtos', ProdutoController.index);

produtoRoutes.get('/produtos/:id', ProdutoController.show);

produtoRoutes.put('/produtos/:id', ProdutoController.update);

produtoRoutes.delete('/produtos/:id', ProdutoController.delete);

export default produtoRoutes;
