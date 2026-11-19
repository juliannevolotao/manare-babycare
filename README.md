# Manarê Baby Care — site

Site da Manarê Baby Care (agência de babás em Santos, São Vicente, Praia Grande e Guarujá), feito com **Vite + React 18 + TypeScript + Tailwind CSS v3**.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (com checagem de tipos)
npm run preview    # serve dist/ em http://localhost:4173/manare-babycare/
npm run lint
```

## Estrutura

- `src/config.ts` — WhatsApp, Instagram, cidades atendidas e mensagens prontas do WhatsApp.
- `src/components/` — Header, Footer, Button, Section, Carousel (com pontinhos no celular), WhatsAppIcon.
- `src/sections/` — seções da home.
- `src/pages/` — Home, SejaBaba (`#seja-baba`) e Cadastro (`#cadastro`).
- `src/hooks/useHashRoute.ts` — navegação por hash (`#seja-baba`, `#cadastro`, `#secao`).
- `src/cadastro/` — questionário de babás:
  - `steps.ts`: as etapas como dados tipados;
  - `useCadastro.ts`: estado + progresso no `localStorage` (chave `manare-cadastro-v1`);
  - `buildMessage.ts`: texto enviado pelo WhatsApp;
  - `validate.ts`, `fieldStyles.ts` e os componentes de campo.
- `tailwind.config.ts` — cores, fontes e breakpoints (max-width: 1040, 860, 600 px…) do site original.

## SEO

- `npm run build` pré-renderiza a home: o `dist/index.html` já sai com todo o texto (o Google lê sem precisar rodar JavaScript). Veja `src/entry-server.tsx` e `scripts/prerender.js`.
- `index.html`: título, descrição, link canônico, Open Graph (prévia no WhatsApp/Instagram/Facebook, imagem `public/og-image.jpg`).
- `src/components/StructuredData.tsx`: dados estruturados (schema.org) do negócio local e das perguntas frequentes, gerados a partir de `config.ts` e `src/data/faq.ts`.
- `public/robots.txt` e `public/sitemap.xml`.
- Se o endereço do site mudar (ex.: domínio próprio), troque `SITE_URL` em `src/config.ts` e as URLs em `index.html`, `robots.txt` e `sitemap.xml`.
- Razão social e CNPJ: preencha `EMPRESA` em `src/config.ts` para aparecerem no rodapé.

Nenhum dado do cadastro vai para um servidor: fica no navegador da candidata até ela enviar pelo WhatsApp.

## Publicação

O workflow `.github/workflows/deploy.yml` faz o build e publica `dist/` no GitHub Pages a cada push.
Na primeira vez, ative em **Settings › Pages › Build and deployment › Source: GitHub Actions**.
O `base` do Vite (`/manare-babycare/`) está em `vite.config.ts`; se o repositório mudar de nome, ajuste ali.

Site desenvolvido por JVS — instagram.com/juliannevolotao
