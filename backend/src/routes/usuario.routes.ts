import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware, { validate } from "../middlewares/auth";
import { usuarioCreateSchema } from "../validators/UsuarioValidator";
import multer from "multer";
import uploadConfig from '../config/upload';

const usuarioRotas = Router();
const upload = multer(uploadConfig);

usuarioRotas.post('/usuarios', validate(usuarioCreateSchema), UsuarioController.create);
usuarioRotas.patch('/usuarios/avatar', authMiddleware, upload.single('avatar'), UsuarioController.updateAvatar);

export default usuarioRotas;
