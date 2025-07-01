
export interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem_url?: string;
}

export interface IUsuario {
  _id: string;
  nome: string;
  email: string;
}

export interface CarrinhoItem extends Produto {
  quantidade: number;
}


