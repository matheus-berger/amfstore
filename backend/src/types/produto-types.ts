
export const CATEGORIAS_PERMITIDAS = [
  'Vestuário',
  'Utensílios',
  'Papelaria',
  'Acessórios',
  'Bolsas e Mochilas',
  'Outros'
] as const;

export type CategoriaProduto = typeof CATEGORIAS_PERMITIDAS[number];
