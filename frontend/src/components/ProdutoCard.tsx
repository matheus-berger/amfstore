import { type Produto } from "../types/entities";

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img
        src={produto.imagem_url || `https://placehold.co/600x400/e2e8f0/e2e8f0?text=Produto`}
        alt={`Imagem do produto ${produto.nome}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{produto.nome}</h3>
        <p className="text-sm text-gray-600 mt-1">{produto.descricao}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            R$ {produto.preco.toFixed(2).replace('.', ",")}
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
