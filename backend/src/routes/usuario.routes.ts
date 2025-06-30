import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const usuarioRotas = Router();

usuarioRotas.post('/usuarios', UsuarioController.create);

export default usuarioRotas;
