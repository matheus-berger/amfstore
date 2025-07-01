import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export function SignUpPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Validação simples para garantir que a senha não é muito curta
    if (senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      await api.post('/usuarios', {
        nome,
        email,
        senha,
      });

      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');

    } catch (error: any) {
      console.error("Falha no cadastro: ", error);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao tentar se cadastrar. Verifique os dados e tente novamente.';
      alert(errorMessage);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Conta</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
            Senha (mínimo 6 caracteres)
          </label>
          <input
            id="senha"
            type="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-sm mt-4">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
          Faça login
        </Link>
      </p>
    </div>
  );
}
