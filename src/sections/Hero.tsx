import maos from '../assets/maos.jpg';
import borboleta from '../assets/borboleta.svg';
import { Actions, Button } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CIDADES_TEXTO, MENSAGENS_WHATSAPP, linkWhatsApp } from '../config';

export function Hero() {
  return (
    <section className="pb-[88px] pt-[72px] b600:pb-14 b600:pt-9">
      <div className="wrap grid grid-cols-[1.05fr_.95fr] items-center gap-16 b860:grid-cols-[repeat(1,1fr)] b860:gap-11 b600:gap-8">
        <div data-reveal-group className="flex flex-col gap-7 b600:gap-[22px]">
          <span className="eyebrow">Agência de babás · Baixada Santista</span>
          <h1 className="text-[clamp(42px,5.8vw,74px)] leading-[1.02]">
            Onde o cuidado <em>encontra abrigo</em>
          </h1>
          <p className="max-w-[520px] text-[19px] b600:text-[17px]">
            Babás qualificadas, escolhidas com atenção e acompanhadas de perto, para você ficar tranquila enquanto cuida do resto.
          </p>
          <Actions>
            <Button variant="cacau" href={linkWhatsApp(MENSAGENS_WHATSAPP.geral)}>
              <WhatsAppIcon />
              <span className="b600:hidden">Chame no WhatsApp</span>
              <span className="hidden b600:inline">WhatsApp</span>
            </Button>
            <Button variant="linha" href="#como-funciona">
              Como funciona
            </Button>
          </Actions>
          <p className="flex max-w-[520px] items-start gap-2.5 border-t border-linha pt-[22px] text-[19px] leading-[1.5] b600:pt-[18px] b600:text-[17px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-caramelo"
            >
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
              <circle cx="12" cy="10" r="2.3" />
            </svg>
            <span>
              Atendemos <strong className="font-semibold">{CIDADES_TEXTO}</strong>
            </span>
          </p>
        </div>
        <div data-reveal className="relative [--reveal-delay:200ms]">
          <img
            src={maos}
            alt="Mão de adulto segurando a mãozinha de um bebê sobre uma manta de tricô"
            width={1200}
            height={1500}
            className="aspect-[5/6] h-auto max-h-[640px] w-full rounded-[220px_220px_28px_28px] object-cover b600:aspect-[4/3] b600:max-h-[340px] b600:rounded-[28px]"
          />
          <div className="absolute bottom-9 -left-7 flex max-w-[280px] items-center gap-3.5 rounded-[20px] bg-branco px-[22px] py-[18px] shadow-selo b860:left-3 b600:relative b600:bottom-auto b600:left-auto b600:mx-4 b600:mb-0 b600:-mt-8 b600:max-w-none b600:px-[18px] b600:py-3.5">
            <img src={borboleta} alt="" aria-hidden="true" className="h-auto w-10 shrink-0" />
            <div>
              <strong className="block text-[15px] leading-[1.3]">Você conhece a babá antes</strong>
              <span className="mt-0.5 block text-[13px] leading-[1.4]">Entrevista e teste presencial, se quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
