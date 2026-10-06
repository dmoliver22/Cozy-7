// Verifies every internal href/src in dist/ resolves to a built file. Run after `astro build`.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
const dist = resolve('dist');
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); } })(dist);
const bad = new Map();
const seen = new Set();
for (const f of files) {
  const html = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    const u = m[1];
    if (!u.startsWith('/') || u.startsWith('//')) continue;
    if (seen.has(u)) continue; seen.add(u);
    const candidates = [join(dist, u), join(dist, u, 'index.html'), join(dist, u.replace(/\/$/, '') + '.html')];
    if (!candidates.some((c) => existsSync(c))) bad.set(u, f.replace(dist, ''));
  }
}
if (bad.size) { console.log('BROKEN internal links:'); for (const [u, f] of bad) console.log(`  ${u}  (first seen in ${f})`); process.exit(1); }
console.log(`OK: ${seen.size} unique internal URLs across ${files.length} pages all resolve.`);
