/**
 * Copy guard used before every delivery:
 *  - every localized string exists in English and Spanish;
 *  - no technical jargon appears in customer-facing copy;
 *  - Spanish is not a copy of English except for proper nouns.
 *
 * Run: node scripts/check-copy.mjs
 */
import { copy } from '../src/constants/copy.ts';

const isLeaf = (v) => v && typeof v === 'object' && typeof v.en === 'string' && typeof v.es === 'string';

const entries = [];
(function walk(node, path) {
  if (!node || typeof node !== 'object') return;
  if (isLeaf(node)) return entries.push({ path, ...node });
  if (Array.isArray(node)) return node.forEach((item, i) => walk(item, `${path}[${i + 1}]`));
  for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
})(copy, '');

const jargon = [
  /\bLLMs?\b/i,
  /\bRAG\b/i,
  /\bAPIs?\b/i,
  /\bn8n\b/i,
  /\bZapier\b/i,
  /\bMake\.com\b/i,
  /\bReact\b/,
  /\bNode(?:\.js|JS)?\b/,
  /\bSaaS\b/i,
  /\bSEO\b/,
  /\bchatbots?\b/i,
  /\bCRM\b/,
  /\bonboarding\b/i,
  /\bsynerg/i,
  /\bleverage\b/i,
  /\bworkflows?\b/i,
];

const allowedIdentical = new Set([
  'site.name',
  'nav.currentEn',
  'nav.currentEs',
  'sitemap.englishLabel',
  'sitemap.spanishLabel',
  'footer.linkedin',
  'form.phonePlaceholder',
  'legal.updated', // same format, translated month names only in ES below
]);

const problems = [];
const identical = [];
const empty = [];

for (const entry of entries) {
  if (!entry.en.trim() || !entry.es.trim()) empty.push(entry.path);
  if (entry.en === entry.es && !allowedIdentical.has(entry.path) && !/^(FM Digital AI|Aula Pro|Expert Path|English|Español|Orlando, Florida)$/.test(entry.en)) {
    identical.push({ path: entry.path, value: entry.en });
  }
  for (const re of jargon) {
    if (re.test(entry.en) || re.test(entry.es)) problems.push({ path: entry.path, pattern: String(re), en: entry.en, es: entry.es });
  }
}

console.log(`Localized strings: ${entries.length}`);
console.log(`Empty values: ${empty.length}`, empty.slice(0, 10));
console.log(`Identical EN/ES (review): ${identical.length}`);
for (const item of identical.slice(0, 30)) console.log('  =', item.path, '→', item.value);
console.log(`Jargon hits: ${problems.length}`);
for (const item of problems) console.log('  !', item.path, item.pattern, '|', item.en, '|', item.es);

if (empty.length || problems.length) process.exitCode = 1;
