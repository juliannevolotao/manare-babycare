import { CIDADES } from '../config';
import type { FormStep, Step } from './types';

const SN = ['Sim', 'Não'] as const;

const S1 = 'Perfil profissional';
const S2 = 'Situações práticas';
const SUB1 = 'Responda com suas palavras. Duas ou três frases bastam.';
const SUB2 = 'Conte como você agiria em cada situação.';

/** Etapa com perguntas abertas (todas obrigatórias, caixa de texto de 3 linhas). */
function abertas(sec: string, title: string, pares: ReadonlyArray<readonly [string, string]>, sub: string): FormStep {
  return {
    kind: 'form',
    sec,
    title,
    sub,
    fields: pares.map(([id, label]) => ({ id, label, type: 'textarea', req: true, rows: 3 })),
  };
}

export const STEPS: readonly Step[] = [
  { kind: 'intro' },
  {
    kind: 'form',
    sec: 'Dados pessoais',
    title: 'Vamos começar por você',
    fields: [
      { id: 'nome', label: 'Nome completo', type: 'text', req: true, auto: 'name' },
      {
        id: 'cidade',
        label: 'Cidade onde mora',
        type: 'chips',
        opts: [...CIDADES, 'Outra'],
        req: true,
        detail: { when: 'Outra', id: 'cidade_outra', label: 'Qual cidade?' },
      },
      { id: 'bairro', label: 'Bairro', type: 'text', req: true, half: true },
      { id: 'nasc', label: 'Data de nascimento', type: 'date', req: true, half: true },
      { id: 'civil', label: 'Estado civil', type: 'chips', opts: ['Solteira', 'Casada', 'União estável', 'Divorciada', 'Viúva'], req: true },
      {
        id: 'filhos',
        label: 'Possui filhos?',
        type: 'chips',
        opts: ['Não', 'Sim'],
        req: true,
        detail: { when: 'Sim', id: 'filhos_det', label: 'Quantos e quais as idades?' },
      },
    ],
  },
  {
    kind: 'form',
    sec: 'Dados pessoais',
    title: 'Como falamos com você?',
    fields: [
      { id: 'tel', label: 'Telefone (WhatsApp)', type: 'tel', req: true, half: true, ph: '(13) 99999-9999', auto: 'tel' },
      { id: 'email', label: 'E-mail', type: 'email', req: true, half: true, auto: 'email' },
      { id: 'insta', label: 'Instagram', type: 'text', opt: true, ph: '@seuperfil' },
    ],
  },
  {
    kind: 'form',
    sec: 'Formação',
    title: 'Sua formação',
    fields: [
      {
        id: 'escol',
        label: 'Escolaridade',
        type: 'chips',
        opts: ['Ensino fundamental', 'Ensino médio', 'Curso técnico', 'Superior incompleto', 'Superior completo', 'Pós-graduação'],
        req: true,
      },
      {
        id: 'estuda',
        label: 'Está estudando atualmente?',
        type: 'chips',
        opts: ['Não', 'Sim'],
        req: true,
        detail: { when: 'Sim', id: 'estuda_curso', label: 'Qual curso?' },
      },
      { id: 'ps', label: 'Possui curso de primeiros socorros?', type: 'chips', opts: ['Sim', 'Não', 'Estou fazendo'], req: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Formação',
    title: 'Cursos e certificações',
    fields: [
      {
        id: 'cursos',
        label: 'Quais cursos voltados para a área infantil você tem?',
        type: 'textarea',
        req: true,
        ph: 'Se não tiver nenhum, escreva "nenhum".',
      },
      { id: 'cert', label: 'Outras certificações ligadas ao cuidado infantil', type: 'textarea', opt: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Experiência',
    title: 'Sua experiência com crianças',
    fields: [
      {
        id: 'tempo',
        label: 'Há quanto tempo trabalha com crianças?',
        type: 'chips',
        opts: ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', '5 a 10 anos', 'Mais de 10 anos'],
        req: true,
      },
      { id: 'tipo', label: 'Já trabalhou como', type: 'chips', opts: ['Babá fixa', 'Freelancer', 'Ambos'], req: true },
      { id: 'familias', label: 'Quantas famílias já atendeu?', type: 'number', req: true, half: true },
      { id: 'periodo', label: 'Maior período com uma mesma família', type: 'text', req: true, half: true, ph: 'Ex.: 2 anos' },
    ],
  },
  {
    kind: 'form',
    sec: 'Experiência',
    title: 'Com quais idades você já trabalhou?',
    sub: 'Marque todas as que se aplicam.',
    fields: [
      {
        id: 'idades',
        label: 'Faixas etárias',
        type: 'multi',
        req: true,
        opts: ['Recém-nascidos (até 3 meses)', 'Bebês até 1 ano', '1 a 3 anos', '4 a 6 anos', '7 a 10 anos', '11 anos ou mais'],
      },
    ],
  },
  {
    kind: 'form',
    sec: 'Experiência',
    title: 'Você já…',
    sub: 'Marque tudo o que já fez. Se nada se aplicar, é só avançar.',
    fields: [
      {
        id: 'ja',
        label: 'Experiências',
        type: 'multi',
        opts: [
          'Fez introdução alimentar (BLW)',
          'Acompanhou desfralde',
          'Acompanhou rotina escolar',
          'Levou crianças a consultas ou atividades',
          'Cuidou de 2 ou mais crianças ao mesmo tempo',
          'Fez atendimentos noturnos',
          'Acompanhou famílias em viagens',
          'Administrou medicamentos',
          'Cuidou de crianças atípicas (TEA, TDAH, Down ou outras)',
        ],
        details: {
          'Cuidou de 2 ou mais crianças ao mesmo tempo': {
            id: 'maxcri',
            label: 'Qual o maior número de crianças que ficaram sob sua responsabilidade?',
          },
          'Administrou medicamentos': { id: 'med', label: 'Em quais situações?' },
          'Cuidou de crianças atípicas (TEA, TDAH, Down ou outras)': { id: 'atip', label: 'Conte um pouco sobre essa experiência.' },
        },
      },
    ],
  },
  {
    kind: 'form',
    sec: 'Experiência',
    title: 'Conte sobre sua última experiência como babá',
    fields: [
      {
        id: 'ultima',
        label: 'Sua última experiência',
        type: 'textarea',
        req: true,
        rows: 5,
        ph: 'Quantas crianças, as idades, por quanto tempo e como era a rotina.',
      },
    ],
  },
  {
    kind: 'form',
    sec: 'Experiência',
    title: 'Qual foi a situação mais desafiadora que você viveu como babá?',
    fields: [{ id: 'desafio', label: 'A situação e como você resolveu', type: 'textarea', req: true, rows: 5 }],
  },
  {
    kind: 'form',
    sec: 'Rotina de trabalho',
    title: 'Na rotina com a criança, você…',
    sub: 'Marque tudo o que sabe fazer ou está disposta a fazer.',
    fields: [
      {
        id: 'rotina',
        label: 'Rotina',
        type: 'multi',
        opts: [
          'Prepara mamadeiras',
          'Esteriliza mamadeiras e utensílios',
          'Prepara refeições simples',
          'Troca fraldas de recém-nascidos',
          'Dá banho em recém-nascidos',
          'Organiza brinquedos e o ambiente',
          'Lava os utensílios usados pela criança',
          'Organiza as roupas usadas pela criança',
          'Cria atividades recreativas e educativas',
        ],
      },
      { id: 'telas', label: 'Como você costuma limitar o uso de telas durante o atendimento?', type: 'textarea', req: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Disponibilidade',
    title: 'Quando você pode atender?',
    fields: [
      { id: 'dias', label: 'Dias da semana', type: 'multi', req: true, opts: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
      {
        id: 'periodos',
        label: 'Períodos e modalidades',
        type: 'multi',
        req: true,
        opts: ['Manhã', 'Tarde', 'Noite', 'Madrugada', 'Finais de semana', 'Feriados', 'Viagens', 'Dormir no local', 'Eventos'],
      },
      { id: 'horarios', label: 'Horários disponíveis', type: 'text', req: true, half: true, ph: 'Ex.: 8h às 18h' },
      { id: 'carga', label: 'Carga horária', type: 'text', req: true, half: true, ph: 'Ex.: 30h por semana' },
    ],
  },
  {
    kind: 'form',
    sec: 'Disponibilidade',
    title: 'Imprevistos e deslocamento',
    fields: [
      {
        id: 'ultimahora',
        label: 'Aceita atendimentos de última hora?',
        type: 'chips',
        opts: SN,
        req: true,
        detail: { when: 'Sim', id: 'antecedencia', label: 'Com quanto tempo mínimo de antecedência?' },
      },
      {
        id: 'distancia',
        label: 'Até onde aceita se deslocar?',
        type: 'chips',
        req: true,
        opts: ['Só no meu bairro', 'Na minha cidade', 'Cidades vizinhas', 'Toda a Baixada Santista'],
      },
      { id: 'restricao', label: 'Tem restrição de bairros ou cidades?', type: 'text', opt: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Disponibilidade',
    title: 'Transporte',
    fields: [
      { id: 'veiculo', label: 'Possui veículo próprio?', type: 'chips', opts: SN, req: true },
      { id: 'transp', label: 'Usa transporte público?', type: 'chips', opts: SN, req: true },
      { id: 'cnh', label: 'Possui CNH?', type: 'chips', opts: SN, req: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Disponibilidade',
    title: 'Que tipo de atendimento você procura?',
    fields: [
      { id: 'interesse', label: 'Interesse', type: 'chips', opts: ['Avulsos', 'Contratos fixos', 'Ambos'], req: true },
      {
        id: 'inicio',
        label: 'Se aprovada, quando pode começar?',
        type: 'chips',
        opts: ['Imediatamente', 'Em 1 semana', 'Em 2 semanas', 'Em 1 mês ou mais'],
        req: true,
      },
      { id: 'naofaz', label: 'Existe algum tipo de atendimento que você não realiza?', type: 'textarea', opt: true },
    ],
  },
  abertas(
    S1,
    'Por que a Manarê?',
    [
      ['porque', 'Por que deseja fazer parte da Manarê Baby Care?'],
      ['cuidar', 'O que significa cuidar de uma criança para você?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'Sobre você',
    [
      ['fortes', 'Quais são seus principais pontos fortes?'],
      ['desenv', 'Quais características você ainda precisa desenvolver?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'No dia a dia',
    [
      ['birra', 'Como você lida com crianças em momentos de birra?'],
      ['emerg', 'Como reage diante de situações de emergência?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'Com a família',
    [
      ['diverg', 'Como resolve divergências com os responsáveis?'],
      ['feedback', 'Como reage ao receber orientações ou feedbacks?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'Profissionalismo',
    [
      ['inaceit', 'O que considera inaceitável na atuação de uma babá?'],
      ['profis', 'Como demonstra profissionalismo dentro da casa da família?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'Valores',
    [
      ['espera', 'O que espera da Manarê Baby Care?'],
      ['valores', 'Quais valores são indispensáveis para quem cuida de crianças?'],
    ],
    SUB1,
  ),
  abertas(
    S1,
    'Para fechar esta parte',
    [
      ['advert', 'Já recebeu alguma advertência ou foi desligada de algum trabalho? Se sim, explique.'],
      ['confiar', 'Por que uma família deveria confiar em você para cuidar do que tem de mais precioso?'],
    ],
    SUB1,
  ),
  abertas(
    S2,
    'Como você agiria se…',
    [
      ['s1', 'Um bebê começa a engasgar.'],
      ['s2', 'Uma criança sofre uma queda.'],
    ],
    SUB2,
  ),
  abertas(
    S2,
    'Como você agiria se…',
    [
      ['s3', 'Uma criança faz uma grande birra em público.'],
      ['s4', 'Uma criança se recusa a comer.'],
    ],
    SUB2,
  ),
  abertas(
    S2,
    'Como você agiria se…',
    [
      ['s5', 'A família atrasa para voltar para casa.'],
      ['s6', 'Uma criança tem febre durante o atendimento.'],
    ],
    SUB2,
  ),
  abertas(
    S2,
    'Como você agiria se…',
    [
      ['s7', 'Uma criança quebra um objeto da casa.'],
      ['s8', 'Uma criança pede que você esconda algo dos pais.'],
    ],
    SUB2,
  ),
  {
    kind: 'form',
    sec: 'Referências',
    title: 'Referências profissionais',
    sub: 'Duas pessoas para quem você já trabalhou.',
    fields: [
      { type: 'subtit', label: 'Referência 1' },
      { id: 'r1n', label: 'Nome', type: 'text', req: true, half: true },
      { id: 'r1r', label: 'Relação', type: 'text', req: true, half: true, ph: 'Ex.: mãe de criança atendida' },
      { id: 'r1t', label: 'Telefone', type: 'tel', req: true, half: true },
      { id: 'r1p', label: 'Período em que trabalharam juntos', type: 'text', req: true, half: true },
      { type: 'subtit', label: 'Referência 2' },
      { id: 'r2n', label: 'Nome', type: 'text', req: true, half: true },
      { id: 'r2r', label: 'Relação', type: 'text', req: true, half: true },
      { id: 'r2t', label: 'Telefone', type: 'tel', req: true, half: true },
      { id: 'r2p', label: 'Período em que trabalharam juntos', type: 'text', req: true, half: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Informações finais',
    title: 'Quase lá',
    fields: [
      {
        id: 'antec',
        label: 'Possui antecedentes criminais?',
        type: 'chips',
        opts: ['Não', 'Sim'],
        req: true,
        detail: { when: 'Sim', id: 'antec_det', label: 'Explique, por favor.' },
      },
      { id: 'entrev', label: 'Aceita participar de entrevista', type: 'chips', opts: ['Online', 'Presencial', 'Das duas formas'], req: true },
      { id: 'autoriza', label: 'Autoriza a Manarê a falar com suas referências?', type: 'chips', opts: SN, req: true },
      { id: 'whats', label: 'Usa o WhatsApp todos os dias e consegue responder rápido?', type: 'chips', opts: SN, req: true },
      { id: 'extra', label: 'Existe algo importante que a Manarê deva saber sobre você?', type: 'textarea', opt: true },
    ],
  },
  {
    kind: 'form',
    sec: 'Declaração',
    title: 'Declaração',
    fields: [
      {
        type: 'termo',
        label:
          'Declaro que todas as informações fornecidas são verdadeiras. Estou ciente de que qualquer informação falsa, omitida ou inconsistente poderá resultar na minha desclassificação do processo seletivo ou no meu desligamento da Manarê Baby Care, caso eu venha a integrar a equipe. Também autorizo a Manarê Baby Care a entrar em contato com minhas referências profissionais para fins de avaliação.',
      },
      { id: 'declaro', label: 'Li e concordo com a declaração acima.', type: 'check', req: true },
      { id: 'lgpd', label: 'Autorizo a Manarê Baby Care a usar meus dados apenas para este processo seletivo.', type: 'check', req: true },
    ],
  },
  { kind: 'fim' },
];

/** Etapas com perguntas (sem a tela inicial e a final). */
export const TOTAL_ETAPAS = STEPS.length - 2;
