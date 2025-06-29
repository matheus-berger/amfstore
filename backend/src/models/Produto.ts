import mongoose, {Schema, Document} from "mongoose";

// Interface da tipagem correta do documento Produto
export interface IProduto extends Document {
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'Vestuário' | 'Utensílios' | 'Papelaria' | 'Acessórios' | 'Bolsas e Mochilas';
}

// Schema para o Mongoose criar o modelo
const ProdutoSchema: Schema = new Schema({
  nome: { type: String, required: true},
  descricao: { type: String, required: true},
  preco: { type: Number, required: true},
  categoria: { type: String, required: true},
}, {
  timestamps: true // Adiciona os campos createdAt e updatedAt automaticamente
});

export default mongoose.model<IProduto>('Produto', ProdutoSchema);
