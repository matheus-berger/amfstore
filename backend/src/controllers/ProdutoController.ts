import { Request, Response } from "express";
import Produto from "../models/Produto";

class ProdutoController {

  /*  Métodos: CREATE */

  // Criar um produto
  public async create(requisisao: Request, resposta: Response): Promise<Response> {
    try {
      const produto = await Produto.create(requisisao.body);
      return resposta.status(201).json(produto);
    } catch (erro) {
      return resposta.status(400).json({
        mensagem: `A tentativa de criação de um produto falhou.\nRazão: \n${erro}`
      });
    }
  }

  /*  Métodos: READ */

  // Listar todos os produtos
  public async index(requisisao: Request, resposta: Response): Promise<Response> {
    try {
      const produtos = await Produto.find();
      return resposta.json(produtos);
    } catch (erro) {
      return resposta.status(500).json({
        mensagem: `Erro no servidor ao tentar buscar todos os produtos.\nRazão:\n${erro}`
      });
    }
  }

}

export default new ProdutoController();
