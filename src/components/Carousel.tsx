import { Children, useCallback, useRef, useState, type ReactNode } from 'react';

interface CarouselProps {
  /** Classes do trilho. No desktop costuma ser uma grade; abaixo de 600px, um trilho com scroll-snap. */
  className: string;
  /** Classes extras para a linha de pontinhos. */
  dotsClassName?: string;
  label?: string;
  children: ReactNode;
}

/**
 * Carrossel genérico. O layout (grade ou trilho) vem das classes do pai; este componente
 * só acompanha a rolagem e mostra os pontinhos, que aparecem apenas abaixo de 600px.
 */
export function Carousel({ className, dotsClassName = '', label, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.children;
    const first = items[0] as HTMLElement | undefined;
    const second = items[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : 1;
    let current = Math.round(track.scrollLeft / (step || 1));
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) current = items.length - 1;
    setActive(current);
  }, []);

  return (
    <>
      <div ref={trackRef} className={`trilho ${className}`} onScroll={onScroll} aria-label={label} role={label ? 'region' : undefined}>
        {children}
      </div>
      <div className={`mt-3.5 hidden justify-center gap-1.5 b600:flex ${dotsClassName}`} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <i
            key={i}
            className={`h-[7px] transition-[width,background-color] duration-200 ${
              i === active ? 'w-5 rounded-[4px] bg-caramelo' : 'w-[7px] rounded-full bg-linha'
            }`}
          />
        ))}
      </div>
    </>
  );
}
