// Content linter: checks every Markdown file against CONTENT_SPEC.md rules.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const root = 'src/content';
const banned = /\b(unlock|game-changer|miracle|revolutionary|delve|navigate|journey|it's important to note|in today's)\b/i;
const brands = /\b(Push Health|Heally|Invigor|Healthspan|Defiance Health|FormBlends|Mochi|TrimRx|CostPlusTRT|Bayview|Empower|Kare-?Rx|HealthRX|BetterHelp|ReGain|Talkspace|Midi Health|Alloy|Evernow|Amazon\.com|eBay)\b/i;
const dosing = /\b(take|use|start with|try)\s+(about\s+)?\d+\s*(IU|units?)\b/i;
let problems = 0;
const report = (f, msg) => { problems++; console.log(`  ${f}: ${msg}`); };
function parse(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const fm = m[1], body = m[2];
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?\\s*$`, 'm')) || [])[1];
  const count = (k) => { const sec = fm.split(new RegExp(`^${k}:`, 'm'))[1]; if (!sec) return 0; const block = sec.split(/^\w+:/m)[0]; return (block.match(/^\s*- (title|q|name):/gm) || []).length; };
  return { fm, body, get, count };
}
for (const coll of ['conditions', 'guides', 'updates']) {
  console.log(`\n== ${coll}`);
  for (const file of readdirSync(join(root, coll)).filter((f) => f.endsWith('.md'))) {
    const p = parse(readFileSync(join(root, coll, file), 'utf8'));
    if (!p) { report(file, 'no frontmatter'); continue; }
    const { body, get, count } = p;
    const words = body.split(/\s+/).filter(Boolean).length;
    const title = get('title') || '', desc = get('description') || '';
    const srcN = count('sources'), faqN = count('faq');
    const cites = [...body.matchAll(/\[(\d{1,2})\]/g)].map((m) => Number(m[1]));
    const maxCite = Math.max(0, ...cites);
    const info = `${words}w title${title.length} desc${desc.length} src${srcN} faq${faqN} cites→${maxCite}`;
    console.log(`  ${file}  ${info}`);
    if (coll !== 'updates' && (title.length < 45 || title.length > 70)) report(file, `title length ${title.length}`);
    if (coll !== 'updates' && (desc.length < 120 || desc.length > 170)) report(file, `description length ${desc.length}`);
    if (coll === 'conditions' && (words < 1300 || words > 2400)) report(file, `body words ${words}`);
    if (coll === 'guides' && (words < 1000 || words > 2800)) report(file, `body words ${words}`);
    if (coll === 'updates' && (words < 250 || words > 700)) report(file, `body words ${words}`);
    if (maxCite > srcN) report(file, `cites [${maxCite}] but only ${srcN} sources`);
    if (coll !== 'updates' && cites.length === 0) report(file, 'no inline citations');
    if (/—/.test(body) || /—/.test(p.fm)) report(file, 'em dash present');
    const b = body.match(banned); if (b) report(file, `banned word: "${b[0]}"`);
    const br = body.match(brands); if (br) report(file, `brand name in body: "${br[0]}"`);
    const dz = body.match(dosing); if (dz) report(file, `possible dosing advice: "${dz[0]}"`);
    if (/<[a-z]+[\s>]/i.test(body) && !/<!--/.test(body)) report(file, 'HTML tag in body');
    if (/https?:\/\/(www\.)?amazon\./i.test(body)) report(file, 'amazon link');
    if (coll === 'conditions') {
      const req = ['## The short answer', '## Why people hope oxytocin will help', '## What the research actually found', "## What's being tested right now", '## Where this leaves you'];
      const idx = req.map((h) => body.indexOf(h));
      if (idx.some((i) => i < 0)) report(file, 'missing required H2: ' + req.filter((h, i) => idx[i] < 0).join(' | '));
      else if (idx.some((v, i) => i && v < idx[i - 1])) report(file, 'H2 sections out of order');
      if (/## (What actually works|Sources|Frequently asked)/i.test(body)) report(file, 'body contains a template-rendered section');
      if (desc.toLowerCase().startsWith((get('question') || '~').toLowerCase().slice(0, 20))) report(file, 'description repeats the question');
    }
  }
}
console.log(`\n${problems} problem(s)`);
process.exit(problems ? 1 : 0);
