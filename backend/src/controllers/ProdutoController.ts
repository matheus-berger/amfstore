import { Request, Response } from "express";
import Produto from "../models/Produto";
import AppError from "../errors/AppError";

class ProdutoController {

  /*  Métodos: CREATE */

  // Criar um produto
  public async create(requisicao: Request, resposta: Response): Promise<Response> {
    const produto = await Produto.create(requisicao.body);
    return resposta.status(201).json(produto);
  }

  /*  Métodos: READ */

  // Listar todos os produtos
  public async index(requisicao: Request, resposta: Response): Promise<Response> {
    const produtos = await Produto.find();
    return resposta.json(produtos);
  }

  // Buscar um produto
  public async show(requisicao: Request, resposta: Response): Promise<Response> {
    const { id } = requisicao.params;
    const produto = await Produto.findById(id);

    if (produto) {
      return resposta.json(produto);
    } else {
      throw new AppError("Produto não encontrado.", 404);
    }

  }

  /*  Métodos: UPDATE */

  // Atualizar os dados de um produto
  public async update(requisicao: Request, resposta: Response): Promise<Response> {
    const { id } = requisicao.params;
    const produto = await Produto.findByIdAndUpdate(id, requisicao.body, { new: true});

    if (produto) {
      return resposta.json(produto);
    } else {
      throw new AppError("Produto não encontrado.", 404);
    }
  }

  /*  Métodos: DELETE */

  // Deletar um produto
  public async delete(requisicao: Request, resposta: Response): Promise<Response> {
    const { id } = requisicao.params;
    const produto = await Produto.findByIdAndDelete(id);

    if (produto) {
      // Retorna 204 No Content, indicando sucesso sem corpo de resposta
      return resposta.status(204).send();
    } else {
      throw new AppError('Produto não encontrado', 404);
    }
  }

}

export default new ProdutoController();
