import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario";
import authConfig from '../config/auth';
import AppError from "../errors/AppError";

class SessionController {
  public async create(requisicao: Request, resposta: Response): Promise<Response> {
    const { email, senha } = requisicao.body;

    // 1. Encontra o usuário e inclui o campo password na busca
    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (usuario) {
      // 2. Compara a senha enviada com a senha "hasheada" no banco 
      const senhaCorrespondendo = await bcrypt.compare(senha, usuario.senha);

      if (senhaCorrespondendo) {
        // 3. Se tudo estiver certo, gera o token
        const token = jwt.sign({ id: usuario._id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        });

        usuario.senha = undefined as any;

        return resposta.json({
          usuario,
          token
        });

      } else {
        throw new AppError("Senha inválida ou não corresponde.", 401);
      }

    } else {
      throw new AppError("Credenciais para login de usuário inválidas.", 401);
    }
  }

}

export default new SessionController();
