import { CIDADES_TEXTO } from '../config';

export interface Pergunta {
  pergunta: string;
  resposta: string;
  formasPagamento?: string[];
}

export const PERGUNTAS: Pergunta[] = [
  { pergunta: 'Quais regiões vocês atendem?', resposta: `${CIDADES_TEXTO}.` },
  {
    pergunta: 'Posso conhecer a babá antes?',
    resposta:
      'Sim. Antes de iniciar o atendimento, fazemos uma entrevista com a família e, se você quiser, um teste presencial. Nele, você conhece a profissional durante um dia de trabalho, observa a interação com a criança e avalia se existe identificação e confiança para continuar.',
  },
  {
    pergunta: 'E se a babá não puder vir?',
    resposta:
      'A Manarê acompanha os atendimentos e dá suporte nos imprevistos. Se a babá não puder comparecer, buscamos uma substituta da nossa equipe, considerando o perfil da família e as necessidades da criança. A substituta é apresentada antes e só começa com a sua aprovação, de acordo com a disponibilidade das profissionais.',
  },
  {
    pergunta: 'As babás têm curso de primeiros socorros?',
    resposta:
      'Sim, o curso de primeiros socorros é obrigatório para todas as babás da Manarê. E a maioria da equipe é formada ou estuda na área da saúde.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta: 'O pagamento é feito diretamente à Manarê Baby Care, com praticidade e segurança.',
    formasPagamento: ['PIX', 'Cartão de débito', 'Cartão de crédito'],
  },
];
