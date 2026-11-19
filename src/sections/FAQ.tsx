import { useId, useState } from 'react';
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

interface ItemProps {
  item: Pergunta;
  defaultOpen?: boolean;
}

/** Pergunta com resposta que abre e fecha deslizando (animação de grid-template-rows 0fr → 1fr). */
function FaqItem({ item, defaultOpen = false }: ItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const btnId = `${id}-pergunta`;
  const panelId = `${id}-resposta`;

  return (
    <div className="border-b border-linha">
      <h3 className="m-0 text-2xl leading-[1.25] tracking-normal">
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left transition-colors duration-200 hover:text-caramelo"
        >
          <span>{item.pergunta}</span>
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-body text-[26px] leading-none text-caramelo transition-[transform,background-color] duration-300 ease-[cubic-bezier(.2,.65,.3,1)] group-hover:bg-creme ${
              open ? 'rotate-45 bg-creme' : ''
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity,margin] duration-[450ms] ease-[cubic-bezier(.2,.65,.3,1)] ${
          open ? '-mt-2.5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-[22px] pr-14 b600:pr-0">
            <p className="max-w-[860px]">{item.resposta}</p>
            {item.formasPagamento && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.formasPagamento.map((f) => (
                  <span key={f} className="rounded-full bg-areia px-3.5 py-1.5 text-sm font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div data-reveal-group className="border-t border-linha">
        {PERGUNTAS.map((p, i) => (
          <FaqItem key={p.pergunta} item={p} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  );
}
