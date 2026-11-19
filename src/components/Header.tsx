import logo from '../assets/logo.svg';
import { Button } from './Button';

const NAV = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#selecao', label: 'Seleção' },
  { href: '#ferias', label: 'Férias' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#seja-baba', label: 'Trabalhe conosco' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-linha bg-[rgba(251,245,236,.92)] backdrop-blur-[8px]">
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <a href="#inicio" aria-label="Manarê Baby Care, início">
          <img src={logo} alt="Manarê Baby Care" className="h-10 w-auto" />
        </a>
        <nav aria-label="Seções" className="flex gap-7 text-[15px] font-medium b1040:hidden">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-caramelo">
              {item.label}
            </a>
          ))}
        </nav>
        <Button variant="cacau" size="sm" href="#contato">
          <span className="b600:hidden">Fale conosco</span>
          <span className="hidden b600:inline">Contato</span>
        </Button>
      </div>
    </header>
  );
}
