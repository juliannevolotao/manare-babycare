import type { ReactNode } from 'react';
import { Carousel } from '../components/Carousel';

interface Item {
  titulo: string;
  texto: string;
  bola: string;
  icone: ReactNode;
}

const ITENS: Item[] = [
  {
    titulo: 'Primeiros socorros',
    texto: 'Curso obrigatório para todas as babás',
    bola: 'bg-cacau stroke-creme',
    icone: (
      <>
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
        <path d="M12 10.5v5M9.5 13h5" />
      </>
    ),
  },
  {
    titulo: 'Formação em saúde',
    texto: 'A maioria da equipe é formada ou estuda na área',
    bola: 'bg-areia stroke-cacau',
    icone: (
      <>
        <path d="M3 10l9-6 9 6-9 6z" />
        <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
      </>
    ),
  },
  {
    titulo: 'Substituição aprovada',
    texto: 'Se a babá faltar, você aprova quem vai no lugar',
    bola: 'bg-caramelo-claro stroke-creme',
    icone: (
      <>
        <path d="M17 3l4 4-4 4" />
        <path d="M3 11V9a2 2 0 0 1 2-2h16M7 21l-4-4 4-4" />
        <path d="M21 13v2a2 2 0 0 1-2 2H3" />
      </>
    ),
  },
  {
    titulo: 'Acompanhamento',
    texto: 'Relatórios e comunicação durante todo o atendimento',
    bola: 'bg-salvia stroke-cacau',
    icone: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4 19.5l1.4-4.4A7.5 7.5 0 1 1 20 11.5z" />
        <path d="M8.5 11.5h7M8.5 8.5h4" />
      </>
    ),
  },
];

export function TrustCards() {
  return (
    <div className="pb-6 b600:pb-8">
      <Carousel
        label="Diferenciais"
        className="wrap grid grid-cols-[repeat(4,1fr)] gap-4 b860:grid-cols-[repeat(2,1fr)] b600:flex b600:snap-x b600:snap-mandatory b600:gap-3 b600:overflow-x-auto b600:scroll-pl-6 b600:pb-1.5"
      >
        {ITENS.map((item) => (
          <div
            key={item.titulo}
            className="flex flex-col gap-3.5 rounded-3xl border border-linha bg-branco px-6 py-7 transition-[transform,box-shadow] duration-[250ms] ease-in-out hover:-translate-y-1 hover:shadow-cartao b600:flex-[0_0_76%] b600:snap-start b600:px-[22px] b600:py-6 b600:hover:translate-y-0 b600:hover:shadow-none"
          >
            <span className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bola}`}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[26px] w-[26px]">
                {item.icone}
              </svg>
            </span>
            <strong className="font-display text-[22px] font-medium leading-[1.2]">{item.titulo}</strong>
            <span className="text-[15px]">{item.texto}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
