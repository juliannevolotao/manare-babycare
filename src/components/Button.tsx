import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'cacau' | 'linha' | 'areia' | 'caramelo';
export type ButtonSize = 'md' | 'sm' | 'lg';

const base =
  'inline-flex items-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color] duration-200 ease-in-out hover:-translate-y-0.5 [&_svg]:h-5 [&_svg]:w-5 cursor-pointer';

const variants: Record<ButtonVariant, string> = {
  cacau: 'bg-cacau text-creme hover:bg-cacau-escuro',
  linha: 'border-[1.5px] border-cacau text-cacau',
  areia: 'bg-areia text-cacau',
  caramelo: 'w-full justify-center bg-caramelo text-branco hover:bg-caramelo-escuro',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-[26px] py-[15px] text-[15px]',
  sm: 'px-5 py-[11px] text-sm',
  lg: 'px-[26px] py-[17px] text-[15px]',
};

interface CommonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string };
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined };

/** Botão com cara de pílula. Com `href` vira link; sem `href`, um <button> de verdade. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant, size = 'md', className = '', children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (rest.href !== undefined) {
    const external = /^https?:/.test(rest.href);
    return (
      <a
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    // Como no original, <button> usa line-height normal (links herdam 1.6 do body).
    <button type={type} className={`${cls} leading-[normal]`} {...buttonRest}>
      {children}
    </button>
  );
}

interface ActionsProps {
  children: ReactNode;
}

/** Grupo de botões lado a lado; no celular vira grade de 2 colunas (1 coluna abaixo de 330px). */
export function Actions({ children }: ActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 b600:grid b600:grid-cols-[repeat(2,1fr)] b600:gap-2.5 b330:grid-cols-[repeat(1,1fr)] b600:[&>*]:justify-center b600:[&>*]:px-2.5 b600:[&>*]:py-3.5 b600:[&>*]:text-center b600:[&>*]:text-sm b600:[&_svg]:h-[18px] b600:[&_svg]:w-[18px]">
      {children}
    </div>
  );
}
