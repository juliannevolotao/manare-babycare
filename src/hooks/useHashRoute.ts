import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// No build (pré-renderização) não existe window; useLayoutEffect só roda no navegador.
const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type View = 'home' | 'seja-baba' | 'cadastro';

const PAGES: readonly View[] = ['seja-baba', 'cadastro'];

function readHash(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.slice(1);
}

/**
 * Ao abrir o site direto num link com #secao, fontes e imagens chegam depois e mudam a altura
 * do que está acima. Enquanto o layout se acomoda (até 1,5s), mantemos a seção no lugar.
 * Para assim que a pessoa rolar ou tocar na tela.
 */
function keepAligned(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  let last = -1;
  const stopEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
  const stop = () => {
    observer.disconnect();
    stopEvents.forEach((ev) => window.removeEventListener(ev, stop));
  };
  const align = () => {
    const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
    if (top !== last) {
      last = top;
      el.scrollIntoView({ behavior: 'instant' });
    }
  };
  const observer = new ResizeObserver(align);
  observer.observe(document.body);
  stopEvents.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));
  void document.fonts?.ready.then(align);
  window.setTimeout(stop, 1500);
}

export function viewFromHash(hash: string): View {
  return (PAGES as readonly string[]).includes(hash) ? (hash as View) : 'home';
}

/**
 * Navegação por hash, igual ao site original:
 * - #seja-baba e #cadastro trocam de página e voltam ao topo;
 * - qualquer outro #id mostra a home e rola até a seção.
 */
export function useHashRoute(): View {
  const [hash, setHash] = useState(readHash);
  const prevView = useRef<View | null>(null);
  const view = viewFromHash(hash);

  useEffect(() => {
    const onChange = () => setHash(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useClientLayoutEffect(() => {
    const firstRender = prevView.current === null;
    const changed = prevView.current !== view;
    prevView.current = view;
    if (view !== 'home') {
      window.scrollTo(0, 0);
      return;
    }
    if (!changed) return; // mesma página: o navegador já rola até a âncora
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      target.scrollIntoView();
      if (firstRender) keepAligned(hash);
    } else window.scrollTo(0, 0);
  }, [view, hash]);

  return view;
}
