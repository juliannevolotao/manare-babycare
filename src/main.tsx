import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { viewFromHash } from './hooks/useHashRoute';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Elemento #root não encontrado');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// O HTML pré-renderizado é a home. Se a página abrir direto em #seja-baba ou #cadastro,
// renderizamos do zero em vez de reaproveitar (hidratar) o HTML da home.
const prerendered = root.firstElementChild !== null;
if (prerendered && viewFromHash(window.location.hash.slice(1)) === 'home') {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
