import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { validate } from "../middlewares/auth";
import { usuarioCreateSchema } from "../validators/UsuarioValidator";

const usuarioRotas = Router();

usuarioRotas.post('/usuarios', validate(usuarioCreateSchema), UsuarioController.create);

export default usuarioRotas;
