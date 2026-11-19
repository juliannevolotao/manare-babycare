import { Carousel } from '../components/Carousel';
import { Section, SectionHead } from '../components/Section';

const DEPOIMENTOS = [
  'A profissional chegou pontualmente, foi cordial e logo no início se aproximou do meu filho, convidando-o para brincar. Meu filho ficou confortável em sua companhia e não chorou durante o atendimento, o que considero um ótimo sinal de que ela conseguiu criar vínculo e transmitir segurança.',
  'Eu amei ela. Extremamente educada, com uma super paciência. Meu filho amou a "tia" nova.',
  'Ela é extremamente carinhosa, fez meu filho dormir no colinho e brincou com ele até ele dar gargalhadas. Um amor.',
  'Já indiquei pra uma amiga. Muito obrigada, ela é um amor.',
];

export function Testimonials() {
  return (
    <Section id="depoimentos" className="bg-branco">
      <SectionHead
        eyebrow="Depoimentos"
        title={
          <>
            O que as famílias <em>dizem</em>
          </>
        }
      />
      <Carousel
        label="Depoimentos"
        className="grid grid-cols-[1.15fr_1fr] gap-5 b860:grid-cols-[repeat(1,1fr)] b600:-mx-6 b600:flex b600:snap-x b600:snap-mandatory b600:items-stretch b600:gap-3 b600:overflow-x-auto b600:scroll-pl-6 b600:px-6 b600:pb-1.5"
      >
        {DEPOIMENTOS.map((texto, i) => {
          const grande = i === 0;
          return (
            <figure
              key={i}
              className={`m-0 flex flex-col gap-3.5 rounded-3xl border b600:flex-[0_0_82%] b600:snap-start ${
                grande
                  ? 'row-span-3 border-cacau bg-cacau p-10 text-creme b860:row-auto b600:px-7 b600:py-[30px]'
                  : 'border-linha bg-creme px-8 py-[30px]'
              }`}
            >
              <span aria-hidden="true" className={`h-[30px] font-display text-[72px] leading-[.6] ${grande ? 'text-areia' : 'text-caramelo-claro'}`}>
                {'“'}
              </span>
              <blockquote
                className={`m-0 font-display ${grande ? 'mt-2 text-[25px] leading-[1.4] b600:text-[21px]' : 'text-[22px] leading-[1.35]'}`}
              >
                {texto}
              </blockquote>
              <figcaption className={`text-sm font-semibold ${grande ? 'mt-auto text-areia' : 'text-caramelo'}`}>
                Família atendida pela Manarê
              </figcaption>
            </figure>
          );
        })}
      </Carousel>
    </Section>
  );
}
