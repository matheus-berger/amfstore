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
  const authHeaders = requisicao.headers.authorization;

  // Verificando se o cabeçalho existe 
  if (authHeaders) {
    // Tratando o formato Barear Token 
    const partesBarearToken = authHeaders.split(' ');

    // Verificando se o Barear Token tem exatamente duas partes
    if (partesBarearToken.length === 2) {
      const [scheme, token] = partesBarearToken;

      // Verificando se a primeira parte é exatamente "Bearer" (sem diferenciar maiúsculas/minúsculas).
      if (/^Bearer$/i.test(scheme)) {
        try {
          const data = jwt.verify(token, authConfig.secret);
          const { id } = data as ITokenPayload;

          requisicao.usuarioID = id;

          return next();

        } catch (erro) {
          return resposta.status(401).json({
            erro: `Erro na auntenticação da rota. Razão: ${erro}`
          })
        }
      } else {
        return resposta.status(401).json({
          erro: "Barear Token mal formatado."
        })
      }

    } else {
      return resposta.status(401).json({
        erro: "Erro no formato do token de autenticação."
      });
    }

  } else {
    return resposta.status(401).json({
      erro: "Barear Token não fornecido."
    });
  }

}