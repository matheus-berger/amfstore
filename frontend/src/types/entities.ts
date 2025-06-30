
export interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem_url?: string;
}