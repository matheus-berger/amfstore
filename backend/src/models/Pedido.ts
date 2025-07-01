
import mongoose, { Schema, Document } from 'mongoose';
import { IProduto } from './Produto'; 

// Interface para um item dentro do pedido
interface IPedidoItem {
  produto: IProduto['_id'];
  quantidade: number;
  preco: number;
}

// Interface para o documento do Pedido
export interface IPedido extends Document {
  usuario: mongoose.Types.ObjectId;
  produtos: IPedidoItem[];
  total: number;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}

const PedidoSchema: Schema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { type: String, required: true, default: 'Pendente' },
}, {
  timestamps: true
});

export default mongoose.model<IPedido>('Pedido', PedidoSchema);