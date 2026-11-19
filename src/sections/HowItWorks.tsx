import { Section, SectionHead } from '../components/Section';

const PASSOS = [
  { titulo: 'Conversa inicial', texto: 'Você conta a rotina, as necessidades e o jeitinho do seu filho.' },
  { titulo: 'Perfil ideal', texto: 'Montamos o perfil da babá certa para a sua família.' },
  { titulo: 'Indicação', texto: 'Apresentamos profissionais da nossa equipe que combinam com esse perfil.' },
  { titulo: 'Entrevista e teste', texto: 'Você conhece a babá e, se quiser, acompanha um dia de trabalho.' },
  { titulo: 'Acompanhamento', texto: 'Seguimos com você: relatórios, comunicação e suporte nos imprevistos.' },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <SectionHead
        eyebrow="Como funciona"
        title={
          <>
            Da primeira conversa ao <em>dia a dia</em>
          </>
        }
        text="Cada etapa é pensada para você se sentir segura com a escolha."
      />
      <ol className="grid grid-cols-[repeat(5,1fr)] gap-5 b1000:grid-cols-[repeat(2,1fr)] b520:grid-cols-[repeat(1,1fr)]">
        {PASSOS.map((p, i) => (
          <li key={p.titulo} className="flex flex-col gap-2.5 rounded-[20px] border border-linha bg-branco px-6 py-7">
            <span aria-hidden="true" className="font-display text-[44px] leading-none text-caramelo">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-[22px] leading-[1.2]">{p.titulo}</h3>
            <p className="text-[15px]">{p.texto}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
