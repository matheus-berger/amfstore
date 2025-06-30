import * as yup from 'yup';

export const usuarioCreateSchema = yup.object({
  body: yup.object({
    nome: yup.string().required("É OBRIGATÓRIO dar um declarar o NOME do novo usuário."),
    email: yup.string().email("O email fornecido deve ser válido.").required("É OBRIGATÓRIO declarar um email de cadastro do novo usuário."),
    senha: yup.string().required("É OBRIGATÓRIO criar um senha forte de acesso parta o novo usuário.").min(6, "A senha de acesso para o novo usuário deve ter no mínimo 6 caracteres.")
  })
})
