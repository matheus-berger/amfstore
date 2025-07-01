import { createContext, useState, type ReactNode } from 'react';
import { type CarrinhoItem, type Produto } from '../types/entities';

interface CarrinhoContextData {
  carrinho: CarrinhoItem[];
  addProduto(produto: Produto): void;
  removeProduto(produtoId: string): void;
  updateProdutoQuantity(produtoId: string, quantidade: number): void;
  clearCarrinho(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

  // Adiciona um produto ao carrinho ou incrementa sua quantidade
  const addProduto = (produto: Produto) => {
    setCarrinho(prevCarrinho => {
      const produtoExists = prevCarrinho.find(item => item._id === produto._id);

      if (produtoExists) {
        return prevCarrinho.map(item =>
          item._id === produto._id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Remove um produto completamente do carrinho
  const removeProduto = (produtoId: string) => {
    setCarrinho(prevCarrinho => prevCarrinho.filter(item => item._id !== produtoId));
  };

  // Atualiza a quantidade de um produto específico
  const updateProdutoQuantity = (produtoId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeProduto(produtoId);
      return;
    }
    setCarrinho(prevCarrinho =>
      prevCarrinho.map(item =>
        item._id === produtoId ? { ...item, quantidade } : item
      )
    );
  };

  // Limpa todo o carrinho
  const clearCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, addProduto, removeProduto, updateProdutoQuantity, clearCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}