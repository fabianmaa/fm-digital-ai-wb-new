import fs from 'node:fs/promises';

const paths = [
  '/',
  '/services',
  '/ai-agents',
  '/workflow-automation',
  '/bilingual-seo',
  '/custom-software',
  '/about',
  '/our-process',
  '/case-studies',
  '/contact',
  '/privacy',
  '/terms',
  '/sitemap',
];
const base = 'https://fmdigitalai.com';
const en = (p) => base + (p === '/' ? '/' : p);
const es = (p) => base + (p === '/' ? '/es' : '/es' + p);
const today = '2026-11-07';
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
for (const p of paths) {
  for (const loc of [en(p), es(p)]) {
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${p === '/' ? '1.0' : '0.8'}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${en(p)}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${es(p)}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${en(p)}"/>\n`;
    xml += '  </url>\n';
  }
}
xml += '</urlset>\n';
await fs.writeFile('static/sitemap.xml', xml);
console.log('urls', paths.length * 2, 'bytes', (await fs.stat('static/sitemap.xml')).size);
