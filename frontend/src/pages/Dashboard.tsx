import {useAuth} from '../hooks/useAuth'

export function DashboardPage() {
  const { usuario } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Minha Conta</h1>
      <p className="text-lg">Bem-vindo(a) de volta, <span className="font-semibold">{usuario?.nome}!</span></p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold">Seus Dados:</h2>
        <p><strong>Nome:</strong> {usuario?.nome}</p>
        <p><strong>Email:</strong> {usuario?.email}</p>
      </div>
    </div>
  );

}
