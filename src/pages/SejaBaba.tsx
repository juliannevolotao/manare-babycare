import borboletaCreme from '../assets/borboleta-creme.svg';
import { Actions, Button } from '../components/Button';
import { CIDADES_TEXTO, MENSAGENS_WHATSAPP, linkWhatsApp } from '../config';

const PERFIL: { texto: string; nota?: string }[] = [
  { texto: 'Experiência com cuidado infantil' },
  { texto: 'Curso de primeiros socorros infantis', nota: 'Obrigatório' },
  { texto: 'Formação ou estudo na área da saúde', nota: 'Diferencial' },
  { texto: 'Carinho, paciência e responsabilidade com cada criança' },
  { texto: 'Disponibilidade para atender na Baixada Santista' },
];

const PROCESSO = [
  { titulo: 'Cadastro online', texto: 'Responda ao questionário aqui no site, no seu ritmo, e envie suas respostas pelo WhatsApp.' },
  { titulo: 'Entrevista', texto: 'Conversamos sobre sua experiência, seus valores e sua forma de cuidar.' },
  { titulo: 'Treinamentos', texto: 'Você conhece o jeito Manarê de cuidar, com acolhimento, segurança e comunicação.' },
  { titulo: 'Equipe Manarê', texto: 'Aprovada, você passa a ser indicada para famílias que combinam com o seu perfil.' },
];

const boxClass = 'flex flex-col gap-[18px] rounded-3xl border border-linha bg-branco px-[34px] py-9 b760:px-6 b760:py-7';

export function SejaBaba() {
  return (
    <div id="seja-baba">
      <section className="pb-14 pt-[72px]">
        <div data-reveal-group className="wrap flex max-w-[820px] flex-col gap-6">
          <a href="#inicio" className="inline-flex items-center gap-2 text-[15px] font-semibold text-caramelo">
            ← Voltar ao site
          </a>
          <span className="eyebrow">Trabalhe conosco</span>
          <h1 className="text-[clamp(40px,5.4vw,68px)] leading-[1.04]">
            Seja uma babá <em>Manarê</em>
          </h1>
          <p className="max-w-[620px] text-[19px]">
            Procuramos profissionais que unem técnica e afeto para cuidar de crianças em {CIDADES_TEXTO}.
          </p>
          <Actions>
            <Button variant="cacau" href="#cadastro">
              Fazer meu cadastro
            </Button>
            <Button variant="linha" href={linkWhatsApp(MENSAGENS_WHATSAPP.duvidaBaba)}>
              Tirar dúvidas
            </Button>
          </Actions>
        </div>
      </section>

      <section>
        <div data-reveal-group className="wrap grid grid-cols-[repeat(2,1fr)] gap-5 b760:grid-cols-[repeat(1,1fr)]">
          <div className={boxClass}>
            <span className="eyebrow">O que buscamos</span>
            <h2 className="text-[32px] leading-[1.1]">Perfil da babá Manarê</h2>
            <ul className="flex flex-col gap-3.5">
              {PERFIL.map((p) => (
                <li key={p.texto} className="grid grid-cols-[28px_1fr] items-start gap-3">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-areia">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M6 12.5l4 4 8-9" />
                    </svg>
                  </span>
                  <span>
                    {p.texto}
                    {p.nota && <small className="block text-[13px] font-semibold text-caramelo">{p.nota}</small>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={boxClass}>
            <span className="eyebrow">Como se candidatar</span>
            <h2 className="text-[32px] leading-[1.1]">O processo</h2>
            <ol className="flex flex-col gap-5">
              {PROCESSO.map((p, i) => (
                <li key={p.titulo} className="grid grid-cols-[44px_1fr] gap-3.5">
                  <span aria-hidden="true" className="font-display text-[40px] leading-none text-caramelo-claro">
                    {i + 1}
                  </span>
                  <div>
                    <strong className="block">{p.titulo}</strong>
                    <span className="text-[15px]">{p.texto}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-14">
        <div className="wrap">
          <div data-reveal className="flex flex-col items-center gap-[18px] rounded-[32px] bg-cacau px-10 py-14 text-center text-creme">
            <img src={borboletaCreme} alt="" aria-hidden="true" className="w-14" />
            <h2 className="text-[clamp(32px,4vw,46px)] [&_em]:text-areia">
              Faça parte da <em>nossa equipe</em>
            </h2>
            <p className="max-w-[520px] text-areia">
              O cadastro leva cerca de 20 minutos e fica salvo no seu celular, então você pode parar e continuar depois.
            </p>
            <Button variant="areia" href="#cadastro">
              Começar meu cadastro
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
