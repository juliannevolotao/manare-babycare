/** Dados de contato e região. Nenhum destes valores deve ser escrito direto nos componentes. */

/** Endereço público do site (vem de VITE_SITE_URL, no arquivo .env ou nas variáveis da Vercel). */
export const SITE_URL = import.meta.env.VITE_SITE_URL.replace(/\/?$/, '/');

/**
 * Dados da empresa exibidos no rodapé. Campos vazios não aparecem no site:
 * preencha razão social e CNPJ quando quiser exibi-los.
 */
export const EMPRESA = {
  nome: 'Manarê Baby Care',
  razaoSocial: '',
  cnpj: '',
  regiao: 'Baixada Santista',
  estado: 'SP',
} as const;

export const WHATSAPP_NUMERO = '5513997420506';
export const WHATSAPP_EXIBICAO = '(13) 99742-0506';
/** Formato internacional, para os dados estruturados do Google. */
export const TELEFONE_E164 = '+55-13-99742-0506';

export const INSTAGRAM_USUARIO = 'manarebabycare';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USUARIO}/`;

export const CREDITO = { nome: 'JVS', url: 'https://www.instagram.com/juliannevolotao/' } as const;

export const CIDADES = ['Santos', 'São Vicente', 'Praia Grande', 'Guarujá'] as const;

/** "Santos, São Vicente, Praia Grande e Guarujá" */
export const CIDADES_TEXTO = `${CIDADES.slice(0, -1).join(', ')} e ${CIDADES[CIDADES.length - 1]}`;

export const MENSAGENS_WHATSAPP = {
  geral: 'Olá! Vim pelo site e gostaria de saber mais sobre as babás da Manarê.',
  ferias: 'Olá! Vim pelo site e gostaria de saber sobre os pacotes de férias.',
  duvidaBaba: 'Olá! Tenho uma dúvida sobre o processo seletivo de babás da Manarê.',
} as const;

export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}
