/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endereço público do site, com barra no final. Definido em .env ou nas variáveis da Vercel. */
  readonly VITE_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
