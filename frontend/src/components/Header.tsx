import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useCarrinho } from "../hooks/useCarrinho";
import type { CarrinhoItem } from "../types/entities";

export function Header() {
  const { signed, usuario, signOut } = useAuth();
  const { carrinho } = useCarrinho();
  const [menuSanduicheAberto, setMenuSanduicheAberto] = useState(false);

  // Calcula a quantidade total de itens no carrinho
  const totalItems = carrinho.reduce(
    // 3. Adicione os tipos para 'acc' e 'item'
    (acc: number, item: CarrinhoItem) => acc + item.quantidade, 
    0
  );

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          AMFStore
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/carrinho" className="relative">
            <svg className="w-6 h-6 text-gray-600 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          { /* Menu para Desktop */ }
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-blue-500">Produtos</Link>
            {signed ? (
              <>
                <span className="text-gray-800">Olá, <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">{usuario?.nome}</Link></span>
                <button onClick={signOut} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
            )}
          </nav>
        </div>

        { /* Botão Hambúrguer para telas pequenas */ }
        <div className="md:hidden">
          <button onClick={() => setMenuSanduicheAberto(!menuSanduicheAberto)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>

      { /* Painel do Menu Mobile */ }
      {menuSanduicheAberto && (
        <nav className="md:hidden bg-white absolute w-full shadow-lg flex flex-col items-center p-4 gap-4 z-50">
          <Link to="/" className="text-gray-600 hover:text-blue-500" onClick={() => setMenuSanduicheAberto(false)}>Produtos</Link>
          <Link to="/carrinho" className="text-gray-600 hover:text-blue-500" onClick={() => setMenuSanduicheAberto(false)}>Carrinho</Link>
          {signed ? (
            <>
              <span className="text-gray-800">Olá, <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">{usuario?.nome}</Link></span>
              <button onClick={() => { signOut(); setMenuSanduicheAberto(false); }} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 w-full">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-500" onClick={() => setMenuSanduicheAberto(false)}>Login</Link>
          )}
        </nav>
      )}

    </header>
  );
}
