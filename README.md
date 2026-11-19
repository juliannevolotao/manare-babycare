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

Nenhum dado do cadastro vai para um servidor: fica no navegador da candidata até ela enviar pelo WhatsApp.

## Publicação

O workflow `.github/workflows/deploy.yml` faz o build e publica `dist/` no GitHub Pages a cada push.
Na primeira vez, ative em **Settings › Pages › Build and deployment › Source: GitHub Actions**.
O `base` do Vite (`/manare-babycare/`) está em `vite.config.ts`; se o repositório mudar de nome, ajuste ali.

Site desenvolvido por JVS — instagram.com/juliannevolotao
