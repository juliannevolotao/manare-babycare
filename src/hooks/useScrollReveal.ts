import { useEffect } from 'react';

const SELECTOR = '[data-reveal]:not(.is-visible), [data-reveal-group]:not(.is-visible)';

/**
 * Faz os elementos marcados com data-reveal / data-reveal-group surgirem quando entram na tela.
 * `key` muda a cada troca de página, para observar os elementos novos.
 */
export function useScrollReveal(key: unknown) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
