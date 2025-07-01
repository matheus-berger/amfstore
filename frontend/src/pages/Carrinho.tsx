import { useCarrinho } from '../hooks/useCarrinho';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi'; 
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export function CarrinhoPage() {
  const { carrinho, removeProduto, updateProdutoQuantity, clearCarrinho} = useCarrinho();
  const { signed } = useAuth();
  const navigate = useNavigate();

  // Calcula o subtotal de cada item
  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  // Calcula o total do carrinho
  const total = carrinho.reduce((sum, produto) => {
    return sum + produto.preco * produto.quantidade;
  }, 0);

  // Funcionalidade de Checkout da compra
  async function handleCheckout() {
    if (!signed) {
      alert('Você precisa estar logado para finalizar a compra.');
      navigate('/login');
      return;
    }

    try {
      await api.post('/pedidos', {
        items: carrinho,
        total,
      });

      alert('Pedido realizado com sucesso!');
      clearCarrinho();
      navigate('/dashboard'); // Redireciona para a página do usuário

    } catch (error) {
      console.error('Falha ao criar pedido:', error);
      alert('Ocorreu um erro ao finalizar seu pedido. Tente novamente.');
    }
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>
      {carrinho.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-600">Seu carrinho está vazio.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Ver produtos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Itens do Carrinho */}
          <div className="flex-grow">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {carrinho.map(produto => (
                <div key={produto._id} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b py-4 last:border-b-0">
      
                  {/* Seção 1: Imagem e Informações do Produto (ocupa todo o espaço disponível) */}
                  <div className="flex items-center gap-4 flex-grow">
                    <img 
                      src={produto.imagem_url || `https://placehold.co/100x100/e2e8f0/e2e8f0?text=Img`} 
                      alt={produto.nome} 
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded" 
                    />
                    <div className="flex-grow">
                      <h2 className="font-semibold text-lg">{produto.nome}</h2>
                      <p className="text-sm text-gray-500">{produto.categoria}</p>
                    </div>
                  </div>
                  
                  {/* Seção 2: Controles e Ações (preço, quantidade, remover) */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                    {/* Controle de Quantidade */}
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={produto.quantidade}
                        onChange={(e) => updateProdutoQuantity(produto._id, Number(e.target.value))}
                        className="w-16 text-center border rounded py-1"
                        min="1"
                      />
                    </div>
                    
                    {/* Preço */}
                    <span className="font-semibold w-24 text-center">{formatPrice(produto.preco * produto.quantidade)}</span>
                    
                    {/* Botão Remover */}
                    <button onClick={() => removeProduto(produto._id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-bold"
              >
                Finalizar Compra
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
