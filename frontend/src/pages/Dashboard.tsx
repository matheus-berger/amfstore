import { useState, type ChangeEvent } from 'react';
import {useAuth} from '../hooks/useAuth'
import api from '../services/api';

export function DashboardPage() {
  const { usuario, token } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  }

  async function handleAvatarUpload() {
    if (!avatar) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    const data = new FormData();
    data.append('avatar', avatar);

    try {
      const response = await api.patch('/usuarios/avatar', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Avatar atualizado com sucesso!');
      // Aqui poderíamos atualizar o 'user' no nosso AuthContext para refletir a mudança imediatamente
      console.log('Novo usuário:', response.data);

    } catch (error) {
      alert('Erro ao atualizar o avatar.');
      console.error(error);
    }
  }

  const avatarUrl = usuario?.avatar 
    ? `http://localhost:3333/files/${usuario.avatar}` 
    : `https://placehold.co/150x150/e2e8f0/64748b?text=${usuario?.nome[0]}`;


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Minha Conta</h1>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img src={avatarUrl} alt={`Avatar de ${usuario?.nome}`} className="w-36 h-36 rounded-full object-cover border-4 border-blue-200" />
        
        <div className="flex-grow">
          <p className="text-lg">Bem-vindo(a) de volta, <span className="font-semibold">{usuario?.nome}!</span></p>
          <p className="text-gray-600"><strong>Email:</strong> {usuario?.email}</p>

          <div className="mt-4">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Mudar foto de perfil</label>
            <div className="mt-1 flex items-center gap-4">
              <input id="avatar" name="avatar" type="file" onChange={handleAvatarChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              <button onClick={handleAvatarUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap">Enviar Imagem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
