import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import AppError from "../errors/AppError";

class UsuarioController {

  /*  Funções CREATE  */

  // Criar usuario
  public async create(requisicao: Request, resposta: Response): Promise<Response> {
    const { email } = requisicao.body;

    if (await Usuario.findOne({ email })) {
      throw new AppError("O email do usuário que você deseja cadastrar, já esta em uso. Por favor, escolha um outro email.", 400);
    } else {
      const usuario = await Usuario.create(requisicao.body);

      // [ Privacidade ] : Garantindo que a senha seja omitida antes de enviar a resposta JSON para o cliente.
      usuario.senha = undefined as any;

      return resposta.status(201).json(usuario);
    }
  }

  // Atualizar avatar do usuario
  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const usuario = await Usuario.findById(req.usuarioID);

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    // Se o usuario já tiver um avatar, poderíamos adicionar uma lógica para deletar o arquivo antigo aqui

    if (req.file) {
      usuario.avatar = req.file.filename;
    } else {
      throw new AppError('Arquivo não enviado.', 400);
    }

    await usuario.save();

    usuario.senha = undefined as any;
    return res.json(usuario);
  }

}

export default new UsuarioController();
