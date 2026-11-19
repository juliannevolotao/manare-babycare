// Injeta o HTML da home (gerado com React no servidor) dentro de dist/index.html.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}dist-ssr`;
const { render } = await import(`${ssrDir}/entry-server.js`);

const indexPath = `${root}dist/index.html`;
const template = await readFile(indexPath, 'utf8');
if (!template.includes('<!--app-->')) throw new Error('Marcador <!--app--> não encontrado em dist/index.html');

await writeFile(indexPath, template.replace('<!--app-->', render()));
await rm(ssrDir, { recursive: true, force: true });
console.log('Home pré-renderizada em dist/index.html');
