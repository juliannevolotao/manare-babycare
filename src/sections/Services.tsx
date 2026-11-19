import type { ReactNode } from 'react';
import { Carousel } from '../components/Carousel';
import { Section, SectionHead } from '../components/Section';

interface Servico {
  titulo: string;
  texto: string;
  itens: string[];
  icone: ReactNode;
}

const SERVICOS: Servico[] = [
  {
    titulo: 'Avulso',
    texto: 'Uma babá para um momento específico, sem compromisso fixo.',
    itens: ['Consultas e reuniões', 'Uma noite a dois', 'Imprevistos'],
    icone: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    titulo: 'Mensal',
    texto: 'Babá fixa, que conhece e acompanha a rotina da família.',
    itens: ['Pais que trabalham fora', 'Rotina estável', 'Vínculo contínuo'],
    icone: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    titulo: 'Férias',
    texto: 'Pacotes de manhã, tarde ou integral, de segunda a sexta.',
    itens: ['Recreação', 'Atividades educativas', 'Cuidado individual'],
    icone: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </>
    ),
  },
  {
    titulo: 'Eventos',
    texto: 'Cuidado com os pequenos enquanto os adultos aproveitam a festa.',
    itens: ['Casamentos', 'Aniversários', 'Encontros de família'],
    icone: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />,
  },
];

export function Services() {
  return (
    <Section id="servicos" className="bg-branco">
      <SectionHead
        eyebrow="Serviços"
        title={
          <>
            Um formato para <em>cada rotina</em>
          </>
        }
      />
      <Carousel
        label="Serviços"
        className="grid grid-cols-[repeat(4,1fr)] gap-5 b1000:grid-cols-[repeat(2,1fr)] b600:-mx-6 b600:flex b600:snap-x b600:snap-mandatory b600:gap-3 b600:overflow-x-auto b600:scroll-pl-6 b600:px-6 b600:pb-1.5"
      >
        {SERVICOS.map((s) => (
          <article
            key={s.titulo}
            className="flex flex-col gap-3.5 rounded-[20px] border border-linha bg-creme px-[26px] py-8 b600:flex-[0_0_78%] b600:snap-start"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-11 w-11 stroke-caramelo">
              {s.icone}
            </svg>
            <h3 className="text-[30px]">{s.titulo}</h3>
            <p>{s.texto}</p>
            <ul className="mt-1 flex flex-col gap-1.5 border-t border-linha pt-3.5 text-[15px]">
              {s.itens.map((item) => (
                <li key={item} className="before:font-bold before:text-caramelo before:content-['·__']">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Carousel>
    </Section>
  );
}
