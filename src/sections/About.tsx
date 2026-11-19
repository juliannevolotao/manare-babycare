import { Section } from '../components/Section';

export function About() {
  return (
    <Section id="sobre" className="bg-creme">
      <div className="grid grid-cols-[repeat(2,1fr)] items-start gap-16 b860:grid-cols-[repeat(1,1fr)] b860:gap-8">
        <blockquote data-reveal className="m-0 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.2]">
          Mais do que um serviço: <em className="text-caramelo">um refúgio de confiança</em> para cada família.
        </blockquote>
        <div data-reveal-group className="flex max-w-[560px] flex-col gap-[18px] text-[17px]">
          <span className="eyebrow">Quem somos</span>
          <p>
            A Manarê Baby Care nasceu do desejo de oferecer às famílias um lugar onde cada criança é cuidada com amor, presença e responsabilidade.
          </p>
          <p>
            Somos uma agência de babás em Santos, especializada em cuidado infantil, com foco em acolhimento, segurança e desenvolvimento. Unimos técnica e afeto, respeitando o tempo e as particularidades de cada criança, com acompanhamento humanizado, comunicação constante e atendimento personalizado.
          </p>
          <p className="font-display text-[22px] leading-[1.4]">Cada detalhe importa. Cada gesto importa. Cada criança importa.</p>
        </div>
      </div>
    </Section>
  );
}
