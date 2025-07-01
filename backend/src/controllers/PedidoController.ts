import { Request, Response } from 'express';
import Pedido from '../models/Pedido';
import AppError from '../errors/AppError';

class PedidoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const usuarioId = req.usuarioID; // Vem do nosso authMiddleware
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      throw new AppError('O carrinho não pode estar vazio.', 400);
    }

    const produtosDoPedido = items.map((item: any) => ({
      produto: item._id,
      quantidade: item.quantidade,
      preco: item.preco,
    }));

    const pedido = await Pedido.create({
      usuario: usuarioId,
      produtos: produtosDoPedido,
      total,
    });

    return res.status(201).json(pedido);
  }
}

export default new PedidoController();
