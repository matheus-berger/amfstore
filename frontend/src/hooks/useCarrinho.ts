
import { useContext } from 'react';
import { CarrinhoContext } from '../contexts/CarrinhoContext'

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  return contexto;
}
