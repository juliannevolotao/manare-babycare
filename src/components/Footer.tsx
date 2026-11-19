import logo from '../assets/logo.svg';
import { CIDADES, CREDITO, INSTAGRAM_URL, INSTAGRAM_USUARIO } from '../config';

export function Footer() {
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
      <div className="wrap mt-6 block border-t border-linha pt-5 text-center text-[13px] text-caramelo">
        Site desenvolvido por{' '}
        <a href={CREDITO.url} target="_blank" rel="noopener" className="font-semibold underline">
          {CREDITO.nome}
        </a>
      </div>
    </footer>
  );
}
