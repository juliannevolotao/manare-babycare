import logo from '../assets/logo.svg';
import { CIDADES, CIDADES_TEXTO, CREDITO, EMPRESA, INSTAGRAM_URL, INSTAGRAM_USUARIO, WHATSAPP_EXIBICAO, MENSAGENS_WHATSAPP, linkWhatsApp } from '../config';

const ANO = new Date().getFullYear();

export function Footer() {
  const empresa = [EMPRESA.razaoSocial, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`].filter(Boolean).join(' · ');

  return (
    <footer className="pb-7 pt-10 text-sm">
      <div className="wrap flex flex-wrap items-center justify-between gap-5 b600:flex-col b600:justify-center b600:gap-3.5 b600:text-center">
        <img src={logo} alt="Manarê Baby Care" className="h-[34px] w-auto b600:h-[38px]" />
        <span className="b600:max-w-[260px] b600:leading-[1.6]">{CIDADES.join(' · ')}</span>
        <a href="#seja-baba" className="font-semibold underline">
          Seja uma babá Manarê
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-linha bg-branco px-4 py-[9px] font-semibold"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[18px] w-[18px] text-caramelo"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
          @{INSTAGRAM_USUARIO}
        </a>
      </div>

      <div className="wrap mt-6 flex flex-col gap-2 border-t border-linha pt-5 text-[13px] leading-[1.6] text-cacau-suave b600:text-center">
        <p>
          <strong className="font-semibold text-cacau">{EMPRESA.nome}</strong> · Agência de babás em {CIDADES_TEXTO} ({EMPRESA.estado}). Atendimento
          pelo WhatsApp{' '}
          <a href={linkWhatsApp(MENSAGENS_WHATSAPP.geral)} target="_blank" rel="noopener" className="font-semibold underline">
            {WHATSAPP_EXIBICAO}
          </a>
          .
        </p>
        <p>
          Privacidade: as respostas do cadastro de babás ficam salvas só no aparelho de quem preenche e são enviadas apenas quando a própria
          pessoa as envia pelo WhatsApp. Usamos esses dados somente para o processo seletivo.
        </p>
        <div className="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-1 text-caramelo b600:flex-col b600:items-center">
          <span>
            © {ANO} {EMPRESA.nome}. Todos os direitos reservados.{empresa && ` ${empresa}.`}
          </span>
          <span>
            Site desenvolvido por{' '}
            <a href={CREDITO.url} target="_blank" rel="noopener" className="font-semibold underline">
              {CREDITO.nome}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
