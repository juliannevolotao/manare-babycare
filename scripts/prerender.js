// Pós-build: injeta o HTML da home (React renderizado no servidor) em dist/index.html,
// preenche o endereço do site nas meta tags e gera robots.txt e sitemap.xml.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = `${root}dist`;
const ssrDir = `${root}dist-ssr`;

const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
if (!env.VITE_SITE_URL) throw new Error('Defina VITE_SITE_URL (arquivo .env ou variáveis da Vercel).');
const siteUrl = env.VITE_SITE_URL.replace(/\/?$/, '/');

const { render } = await import(`${ssrDir}/entry-server.js`);
const template = await readFile(`${dist}/index.html`, 'utf8');
if (!template.includes('<!--app-->')) throw new Error('Marcador <!--app--> não encontrado em dist/index.html');

const html = template.replace('<!--app-->', render()).replaceAll('__SITE_URL__', siteUrl);
await writeFile(`${dist}/index.html`, html);

await writeFile(`${dist}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`);
await writeFile(
  `${dist}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Home pré-renderizada; SEO apontando para ${siteUrl}`);
