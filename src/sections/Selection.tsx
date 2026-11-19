import type { ReactNode } from 'react';
import conversa from '../assets/conversa.jpg';
import { Section, SectionHead } from '../components/Section';

interface Criterio {
  titulo: string;
  texto: string;
  icone: ReactNode;
}

const CRITERIOS: Criterio[] = [
  {
    titulo: 'Entrevista individual',
    texto: 'Conhecemos a experiência, os valores e a forma de cuidar de cada profissional.',
    icone: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </>
    ),
  },
  {
    titulo: 'Primeiros socorros obrigatório',
    texto: 'Toda babá Manarê tem o curso de primeiros socorros infantis.',
    icone: <path d="M12 3v18M3 12h18" />,
  },
  {
    titulo: 'Formação na área da saúde',
    texto: 'A maioria da equipe é formada ou estuda na área.',
    icone: (
      <>
        <path d="M3 10l9-6 9 6-9 6z" />
        <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
      </>
    ),
  },
  {
    titulo: 'Teste presencial com a família',
    texto: 'Você observa a interação com a criança antes de decidir.',
    icone: (
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

export function Selection() {
  return (
    <Section id="selecao">
      <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-16 b860:grid-cols-[repeat(1,1fr)] b860:gap-10">
        <img
          src={conversa}
          alt="Mãos segurando uma prancheta e uma xícara de café sobre a mesa"
          width={1200}
          height={1500}
          className="aspect-square h-auto max-h-[480px] w-full rounded-[28px] object-cover object-[center_30%]"
        />
        <div>
          <SectionHead
            compact
            eyebrow="Seleção e segurança"
            title={
              <>
                Você não precisa <em>contar com a sorte</em>
              </>
            }
            text="Antes de chegar à sua casa, cada babá passa pelo nosso processo de seleção."
          />
          <div className="mt-2 flex flex-col gap-[22px]">
            {CRITERIOS.map((c) => (
              <div key={c.titulo} className="grid grid-cols-[44px_1fr] items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-areia">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[22px] w-[22px] stroke-cacau">
                    {c.icone}
                  </svg>
                </span>
                <div>
                  <strong className="block text-[17px]">{c.titulo}</strong>
                  <span className="text-[15px]">{c.texto}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
