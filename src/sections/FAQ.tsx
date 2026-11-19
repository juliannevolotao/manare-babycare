import { Section, SectionHead } from '../components/Section';
import { CIDADES_TEXTO } from '../config';

interface Pergunta {
  pergunta: string;
  resposta: string;
  formasPagamento?: string[];
}

const PERGUNTAS: Pergunta[] = [
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

export function FAQ() {
  return (
    <Section id="duvidas" className="bg-branco">
      <SectionHead
        eyebrow="Dúvidas"
        title={
          <>
            Perguntas <em>frequentes</em>
          </>
        }
      />
      <div className="max-w-[820px]">
        {PERGUNTAS.map((p, i) => (
          <details key={p.pergunta} open={i === 0} className="group border-b border-linha py-[22px]">
            <summary className="flex cursor-pointer list-none justify-between gap-5 font-display text-2xl leading-[1.25] after:font-body after:text-[26px] after:leading-none after:text-caramelo after:transition-transform after:duration-200 after:content-['+'] group-open:after:rotate-45 [&::-webkit-details-marker]:hidden">
              {p.pergunta}
            </summary>
            <p className="mt-3 max-w-[680px]">{p.resposta}</p>
            {p.formasPagamento && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.formasPagamento.map((f) => (
                  <span key={f} className="rounded-full bg-areia px-3.5 py-1.5 text-sm font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </details>
        ))}
      </div>
    </Section>
  );
}
