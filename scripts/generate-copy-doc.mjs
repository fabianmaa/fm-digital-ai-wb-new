/**
 * Generates docs/COPY.md directly from src/constants/copy.ts so the delivered
 * copy document is identical, word for word, to what the site renders.
 *
 * Run with: node scripts/generate-copy-doc.mjs
 * (Node 22+ can import the TypeScript module directly; types are stripped.)
 */
import fs from 'node:fs/promises';
import { copy } from '../src/constants/copy.ts';

const pageTitles = {
  site: 'Site-wide',
  nav: 'Navigation',
  common: 'Shared interface copy',
  footer: 'Footer',
  form: 'Free-audit form',
  home: 'Home',
  services: 'Services (hub and the four service pages)',
  about: 'About',
  process: 'Our process',
  work: 'Our work',
  insights: 'Ideas (index and three notes)',
  contact: 'Free audit / contact',
  legal: 'Legal pages',
  sitemap: 'Sitemap page',
  notFound: '404 page',
  meta: 'Page titles and meta descriptions',
};

const isLeaf = (value) =>
  value && typeof value === 'object' && typeof value.en === 'string' && typeof value.es === 'string';

const clean = (value) => value.replace(/\[([^\]]+)\]/g, '$1');

function walk(node, path, out) {
  if (typeof node !== 'object' || node === null) return;
  if (isLeaf(node)) {
    out.push({ path, en: clean(node.en), es: clean(node.es) });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, `${path}[${index + 1}]`, out));
    return;
  }
  for (const [key, value] of Object.entries(node)) walk(value, path ? `${path}.${key}` : key, out);
}

const lines = [
  '# FM Digital AI — Website copy (English and Spanish)',
  '',
  'This document is generated from `src/constants/copy.ts`, the single source of every',
  'customer-facing string on the site. It is therefore identical, word for word, to what',
  'the site renders in each language. Bracketed emphasis in the source (`[...]`) is',
  'removed here because it is a styling marker, not part of the sentence.',
  '',
  'Language architecture: English is the default at `/`; Spanish is the same pages at',
  '`/es`. The EN/ES switch changes only the strings, never the page tree.',
  '',
  '---',
  '',
];

let index = 0;
for (const [section, value] of Object.entries(copy)) {
  index += 1;
  lines.push(`## ${index}. ${pageTitles[section] ?? section}`, '');
  lines.push(`<sub>Source key: \`${section}\`</sub>`, '');
  const entries = [];
  walk(value, '', entries);
  for (const entry of entries) {
    lines.push(`**${entry.path}**`, '', `- **EN:** ${entry.en}`, `- **ES:** ${entry.es}`, '');
  }
  lines.push('---', '');
}

const total = lines.length;
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/COPY.md', lines.join('\n'), 'utf8');
console.log(`docs/COPY.md written: ${total} lines`);
