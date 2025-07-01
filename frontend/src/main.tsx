import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import React from 'react'
import { CarrinhoProvider } from './contexts/CarrinhoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </AuthProvider>
  </React.StrictMode>,
)
