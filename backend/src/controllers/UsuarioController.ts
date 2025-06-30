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

}

export default new UsuarioController();
