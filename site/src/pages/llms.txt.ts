import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { abs } from '../lib/url';
import { VERDICTS, type Verdict } from '../lib/verdict';

// llms.txt: a plain-text map of the site for AI assistants and answer engines (llmstxt.org convention).
export const GET: APIRoute = async () => {
  const conditions = (await getCollection('conditions')).sort((a, b) => a.data.condition.localeCompare(b.data.condition));
  const guides = await getCollection('guides');
  const updates = (await getCollection('updates')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const lines = [
    `# ${SITE.name}`, '', `> ${SITE.description}`, '',
    'We do not sell oxytocin or any product. Every statistic on the site is cited to a named study. Compounded and intranasal oxytocin are not FDA-approved for any use; we report what trials used and never recommend doses.', '',
    '## Evidence verdicts by condition', '',
    ...conditions.map((c) => `- [${c.data.question}](${abs(`/oxytocin-for/${c.id}/`)}): ${VERDICTS[c.data.verdict as Verdict].label}. ${c.data.oneLiner}`),
    '', '## Guides', '',
    ...guides.map((g) => `- [${g.data.title}](${abs(`/guides/${g.id}/`)}): ${g.data.summary}`),
    '', '## Trackers', '',
    `- [Trial tracker](${abs('/trials/')}): every registered human oxytocin trial we watch, with status and why it matters.`,
    `- [Drug pipeline](${abs('/pipeline/')}): oxytocin-based drugs in development, stage and next catalyst.`,
    '', '## Recent updates', '',
    ...updates.slice(0, 10).map((u) => `- ${u.data.date.toISOString().slice(0, 10)}: [${u.data.title}](${abs(`/updates/${u.id}/`)})`),
    '', '## Policies', '',
    `- [Editorial policy and evidence scale](${abs('/editorial-policy/')})`, `- [Disclosure](${abs('/disclosure/')})`, `- [About](${abs('/about/')})`, '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
