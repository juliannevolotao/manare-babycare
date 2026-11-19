# Manarê Baby Care — site

Site da Manarê Baby Care (agência de babás em Santos, São Vicente, Praia Grande e Guarujá), feito com **Vite + React 18 + TypeScript + Tailwind CSS v3**.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (com checagem de tipos)
npm run preview    # serve dist/ em http://localhost:4173
npm run lint
```

## Estrutura

- Fontes (Fraunces e Montserrat) hospedadas no próprio site via `@fontsource-variable`, importadas em `src/main.tsx`; nenhuma requisição ao Google Fonts.
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
- `robots.txt` e `sitemap.xml` são gerados no build (`scripts/prerender.js`).
- O endereço do site vem de `VITE_SITE_URL` (`.env` ou variáveis da Vercel): link canônico, prévia de links, sitemap e dados estruturados usam esse valor.
- Razão social e CNPJ: preencha `EMPRESA` em `src/config.ts` para aparecerem no rodapé.

Nenhum dado do cadastro vai para um servidor: fica no navegador da candidata até ela enviar pelo WhatsApp.

## Publicação (Vercel)

1. Em vercel.com › **Add New › Project**, importe este repositório do GitHub.
2. A Vercel reconhece o Vite sozinha (configuração em `vercel.json`: `npm run build`, pasta `dist`).
3. Em **Settings › Environment Variables**, defina `VITE_SITE_URL` com o endereço final do site
   (ex.: `https://manare-babycare.vercel.app/` ou o domínio próprio). Sem ela, vale o valor do arquivo `.env`.
4. Cada push na branch de produção publica o site; outras branches geram links de prévia.

Site desenvolvido por JVS — instagram.com/juliannevolotao
