import { useEffect, useState } from "react";
import { type Produto } from "../types/entities"
import api from "../services/api";
import { ProdutoCard } from "../components/ProdutoCard";

export function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    
    async function fetchProdutos() {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (erro) {
        console.error("Falha ao buscar produtos: ", erro);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();

  }, []);

  if (loading) {
    return <p className="text-center">Carregando produtos...</p>;
  }

  return(
    <div>
      <h1 className="text-3xl font-bold mb-6">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map(produto => (
          <ProdutoCard key={produto._id} produto={produto} />
        ))}
      </div>
    </div>
  );

}