import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No GitHub Pages o site fica em https://<usuario>.github.io/manare-babycare/.
// Em `npm run dev` usamos a raiz, para abrir direto em http://localhost:5173/.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/manare-babycare/' : '/',
  plugins: [react()],
}));
