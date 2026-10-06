import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getCollection } from 'astro:content';
import { SITE } from '../../config';
import { VERDICTS, type Verdict } from '../../lib/verdict';

export async function getStaticPaths() {
  const conditions = await getCollection('conditions');
  const guides = await getCollection('guides');
  const updates = await getCollection('updates');
  return [
    { params: { slug: 'default' }, props: { title: 'Can oxytocin actually fix that?', kicker: SITE.tagline, tone: 'accent' } },
    ...conditions.map((c) => ({ params: { slug: `oxytocin-for/${c.id}` }, props: { title: c.data.question, kicker: `Evidence verdict: ${VERDICTS[c.data.verdict as Verdict].label}`, tone: VERDICTS[c.data.verdict as Verdict].tone } })),
    ...guides.map((g) => ({ params: { slug: `guides/${g.id}` }, props: { title: g.data.title, kicker: 'Guide', tone: 'accent' } })),
    ...updates.map((u) => ({ params: { slug: `updates/${u.id}` }, props: { title: u.data.title, kicker: `Update · ${u.data.date.toISOString().slice(0, 10)}`, tone: 'accent' } })),
  ];
}

const COLORS: Record<string, string> = { accent: '#C8553D', established: '#2A5D3C', promising: '#3C7A4E', mixed: '#4F6D8F', early: '#B5731F', none: '#7A746B', negative: '#B3382E' };
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, max: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker, tone } = props as { title: string; kicker: string; tone: string };
  const color = COLORS[tone] ?? COLORS.accent;
  const size = title.length > 60 ? 52 : title.length > 40 ? 60 : 68;
  const lines = wrap(title, size === 68 ? 26 : size === 60 ? 30 : 36, 3);
  const lineH = size * 1.15;
  const startY = 330 - ((lines.length - 1) * lineH) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#FBF7F2"/>
    <rect x="0" y="0" width="1200" height="14" fill="${color}"/>
    <rect x="72" y="72" width="44" height="44" rx="11" fill="#C8553D"/>
    <circle cx="94" cy="94" r="10" fill="none" stroke="#FBF7F2" stroke-width="4"/>
    <text x="134" y="104" font-family="Inter, 'DejaVu Sans', sans-serif" font-size="30" font-weight="600" fill="#1B1A17">${esc(SITE.name)}</text>
    <text x="72" y="200" font-family="Inter, 'DejaVu Sans', sans-serif" font-size="26" font-weight="600" fill="${color}" letter-spacing="1">${esc(kicker.toUpperCase())}</text>
    ${lines.map((l, i) => `<text x="72" y="${Math.round(startY + i * lineH)}" font-family="'DejaVu Serif', Georgia, serif" font-size="${size}" font-weight="700" fill="#1B1A17">${esc(l)}</text>`).join('')}
    <text x="72" y="560" font-family="Inter, 'DejaVu Sans', sans-serif" font-size="24" fill="#6B665D">${esc(SITE.url.replace(/^https?:\/\//, ''))}  ·  No spray to sell. Every human study, cited.</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
