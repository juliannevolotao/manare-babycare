import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export type View = 'home' | 'seja-baba' | 'cadastro';

const PAGES: readonly View[] = ['seja-baba', 'cadastro'];

function readHash(): string {
  return window.location.hash.slice(1);
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

  useLayoutEffect(() => {
    const changed = prevView.current !== view;
    prevView.current = view;
    if (view !== 'home') {
      window.scrollTo(0, 0);
      return;
    }
    if (!changed) return; // mesma página: o navegador já rola até a âncora
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [view, hash]);

  return view;
}
