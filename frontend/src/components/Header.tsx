import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function Header() {
  const { signed, usuario, signOut } = useAuth();
  const [menuSanduicheAberto, setMenuSanduicheAberto] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          AMFStore
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
