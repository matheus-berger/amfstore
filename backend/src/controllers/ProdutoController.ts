import { Request, Response } from "express";
import Produto from "../models/Produto";

class ProdutoController {

  /*  Métodos: CREATE */

  // Criar um produto
  public async create(requisicao: Request, resposta: Response): Promise<Response> {
    try {
      const produto = await Produto.create(requisicao.body);
      return resposta.status(201).json(produto);
    } catch (erro) {
      return resposta.status(400).json({
        mensagem: `A tentativa de criação de um produto falhou.\nRazão: \n${erro}`
      });
    }
  }

  /*  Métodos: READ */

  // Listar todos os produtos
  public async index(requisicao: Request, resposta: Response): Promise<Response> {
    try {
      const produtos = await Produto.find();
      return resposta.json(produtos);
    } catch (erro) {
      return resposta.status(500).json({
        mensagem: `Erro no servidor ao tentar buscar todos os produtos.\nRazão:\n${erro}`
      });
    }
  }

  // Buscar um produto
  public async show(requisicao: Request, resposta: Response): Promise<Response> {
    try {
      const { id } = requisicao.params; // Pega o id dos parâmetros da rota
      const produto = await Produto.findById(id);

      if (produto) {
        return resposta.json(produto);
      } else {
        return resposta.status(404).json({
          mensagem: "Produto não encontrado."
        });
      }

    } catch (erro) {
      return resposta.status(500).json({
        mensagem: `
          Erro no servidor ao tentar buscar o produto.\n
        ` + `
          Razão:\n
        ` + `
          ${erro}
        `
      })
    }
  }

  /*  Métodos: UPDATE */

  // Atualizar os dados de um produto
  public async update(requisicao: Request, resposta: Response): Promise<Response> {
    try {
      const { id } = requisicao.params;
      const produto = await Produto.findByIdAndUpdate(id, requisicao.body, { new: true});

      if (produto) {
        return resposta.json(produto);
      } else {
        return resposta.status(404).json({  mensagem: "Produto não encontrado." });
      }

    } catch (erro) {
      return resposta.status(500).json({
        mensagem: `
          Falha ao tentar atualizar o produto. \n
        ` + `
          Razão: \n
        ` + `
          ${erro}
        `
      })
    }
  }

  /*  Métodos: DELETE */

  // Deletar um produto
  public async delete(requisicao: Request, resposta: Response): Promise<Response> {
    try {
      const { id } = requisicao.params;
      const produto = await Produto.findByIdAndDelete(id);

      if (produto) {
        // Retorna 204 No Content, indicando sucesso sem corpo de resposta
        return resposta.status(204).send();
      } else {
        return resposta.status(404).json({  mensagem: "Produto não encontrado." });
      }

    } catch (erro) {
      return resposta.status(500).json({
        mensagem: `Erro no servidor ao tentar deletar um produto. Razão: ${erro}`
      })
    }
  }

}

export default new ProdutoController();
