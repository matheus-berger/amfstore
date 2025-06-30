import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from '../config/auth';

// Tipagem do Request no Express
interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(requisicao: Request, resposta: Response, next: NextFunction) {
  const { autorizacao } = requisicao.headers;

  if (autorizacao) {
    // Separando o token, que por sua vez vem no formato "Bearer [token]".
    const [, token] = autorizacao.split(' ');

    try {
      // Verificando validade do token
      const data = jwt.verify(token, authConfig.secret);
      const { id } = data as ITokenPayload;

      // Se for válido, anexa o ID do usuário à requisição
      requisicao.usuarioID = id;

      // Permitindo que a requisião prossiga para o controller
      return next();

    } catch (erro) {
      return resposta.status(401).json({
        erro: "Token inválido."
      });
    }

  } else {
    return resposta.status(401).json({
      erro: "Token não fornecido."
    });
  }
}