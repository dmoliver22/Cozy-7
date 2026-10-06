// When BASE_PATH is set (e.g. /Cozy-7/ for a GitHub Pages preview), prefix site-absolute links in built HTML/XML.
// Astro already prefixes its own asset URLs; this covers hand-written href="/..." links.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
if (base === '/') { console.log('apply-base: no BASE_PATH, nothing to do'); process.exit(0); }
const b = base.replace(/\/$/, '');
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(html|xml|txt)$/.test(f) && files.push(p); } })('dist');
let n = 0;
for (const f of files) {
  let s = readFileSync(f, 'utf8'); const o = s;
  s = s.replace(new RegExp(`((?:href|src|action|content)=")/(?!/|${b.slice(1)}/)`, 'g'), `$1${b}/`);
  s = s.replace(new RegExp(`(url=)/(?!/|${b.slice(1)}/)`, 'g'), `$1${b}/`);          // meta refresh
  s = s.replace(new RegExp(`("(?:href|url|fallback)":")/(?!/|${b.slice(1)}/)`, 'g'), `$1${b}/`); // JSON in scripts
  if (s !== o) { writeFileSync(f, s); n++; }
}
console.log(`apply-base: rewrote links in ${n} files to base ${base}`);
