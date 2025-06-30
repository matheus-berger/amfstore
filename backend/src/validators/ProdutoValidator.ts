import * as yup from 'yup';

// Schema para criação de um produto
export const produtoCreateSchema = yup.object({
  body: yup.object({
    nome: yup.string().required("É OBRIGATÓRIO dar um NOME para o novo produto."),
    descricao: yup.string().required("É OBRIGATÓRIO dar uma DESCRIÇÃO para o novo produto."),
    preco: yup.number().required("É OBRIGATÓRIO estipular um PREÇO para o novo produto.").positive("ATENÇÃO o valor do preço do novo produto deve ser um NÚMERO POSITIVO."),
    categoria: yup.string().required("É OBRIGATÓRIO declarar a categoria do produto.")
  })
});

// Schema para a atualização de um produto
export const produtoUpdateSchema = yup.object({
  body: yup.object({
    nome: yup.string().optional(),
    descricao: yup.string().optional(),
    preco: yup.number().optional().positive("ATENÇÃO o valor do preço do novo produto deve ser um NÚMERO POSITIVO."),
    categoria: yup.string().optional()
  })
});
