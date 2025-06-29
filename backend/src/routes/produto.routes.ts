import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";

const produtoRoutes = Router();

produtoRoutes.post('/produtos', ProdutoController.create);

produtoRoutes.get('/produtos', ProdutoController.index);

export default produtoRoutes;
