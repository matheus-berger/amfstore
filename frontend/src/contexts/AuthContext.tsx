import { createContext, useState, useEffect, type ReactNode } from "react";
import api from "../services/api";
import type { IUsuario } from "../types/entities";

interface AuthContextData {
  signed: boolean;
  usuario: IUsuario | null;
  token: string | null;
  signIn(credentials: object): Promise<void>;
  signOut(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem('@AMFStore:usuario');
    const storedToken = localStorage.getItem('@AMFStore:token');

    if (storedUsuario && storedToken) {
      
      try {
        const usuarioObject = JSON.parse(storedUsuario);

        if (usuarioObject) {
          setUsuario(usuarioObject);
          setToken(storedToken);
          api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        } else {
          throw new Error("Dados do usuário no localStorage são nulos após o parse.");
        }

      } catch (erro) {
        console.error("Falha ao carregar dados do localStorage...", erro);
        localStorage.removeItem('@AMFStore:usuario');
        localStorage.removeItem('@AMFStore:token');
      }
  
    }
  }, []);

  async function signIn(credentials: object) {
    try {
      const response = await api.post('/sessions', credentials);
      const { usuario: apiUsuario, token: apiToken } = response.data;

      setUsuario(apiUsuario);
      setToken(apiToken);

      api.defaults.headers.Authorization = `Bearer ${apiToken}`;

      localStorage.setItem('@AMFStore:usuario', JSON.stringify(apiUsuario));
      localStorage.setItem('@AMFStore:token', apiToken);

    } catch (error) {
      console.error("Falha no login: ", error);
      alert("E-mail ou senha inválidos.");
    }
  }

  function signOut() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('@AMFStore:usuario');
    localStorage.removeItem('@AMFStore:token');
    api.defaults.headers.Authorization = null;
  }

  return (
    <AuthContext.Provider value={{ signed: !!usuario, usuario, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}