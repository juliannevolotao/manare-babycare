import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

/** Seção padrão: 96px de respiro vertical e conteúdo centralizado. */
export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  compact?: boolean;
}

export function SectionHead({ eyebrow, title, text, compact = false }: SectionHeadProps) {
  return (
    <div className={`flex max-w-[640px] flex-col gap-3.5 ${compact ? 'mb-7' : 'mb-12'}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-[clamp(34px,4.4vw,52px)] leading-[1.08]">{title}</h2>
      {text && <p className="text-lg">{text}</p>}
    </div>
  );
}
