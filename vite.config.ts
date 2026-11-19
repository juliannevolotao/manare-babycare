import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Publicado na Vercel, na raiz do domínio.
export default defineConfig({
  plugins: [react()],
});
