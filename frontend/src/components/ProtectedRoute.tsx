import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { signed, loading } = useAuth();
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!signed && !localStorage.getItem('@AMFStore:token')) {
    // Se o usuário não está logado E não há token no storage, redireciona para o login.
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver logado, renderiza o conteúdo da rota (os componentes filhos).
  return <>{children}</>;
}
