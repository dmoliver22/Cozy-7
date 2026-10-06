/**
 * Links the first mention of another condition on a page to that condition's verdict page.
 * Skips headings, existing links, code, and the page's own condition. Max 6 links per page.
 */
const MAP = {
  'tinnitus': ['tinnitus'],
  'autism': ['autism', 'autistic children'],
  'marriage-and-relationships': ['couples therapy', 'marriage counseling', 'relationship'],
  'menopause': ['menopause', 'vaginal atrophy'],
  'pssd': ['PSSD', 'post-SSRI sexual dysfunction'],
  'ptsd': ['PTSD'],
  'social-anxiety': ['social anxiety'],
  'weight-loss': ['weight loss', 'Prader-Willi'],
  'alcohol-and-addiction': ['alcohol use disorder', 'drinking'],
  'chronic-pain': ['chronic pain'],
  'oxytocin-deficiency': ['oxytocin deficiency', 'neurophysin-I'],
  'depression-and-mood': ['depression', 'loneliness'],
  'sex-and-libido': ['libido', 'orgasm'],
};
const SKIP = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'script', 'style', 'blockquote', 'th']);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');

export default function rehypeAutolink() {
  return (tree, file) => {
    const path = String(file?.path || file?.history?.[0] || '');
    const m = path.match(/[\\/]conditions[\\/]([^\\/]+)\.md$/);
    const self = m ? m[1] : null;
    const done = new Set();
    let count = 0;
    const entries = Object.entries(MAP).filter(([slug]) => slug !== self);
    walk(tree, null);
    function walk(node, parent) {
      if (!node.children) return;
      const out = [];
      for (const child of node.children) {
        if (count >= 6) { out.push(child); continue; }
        if (child.type === 'text' && parent && !SKIP.has(node.tagName) && node.tagName !== undefined) {
          let text = child.value; let pieces = []; let matched = false;
          for (const [slug, aliases] of entries) {
            if (done.has(slug)) continue;
            const re = new RegExp(`(^|[^\\w-])(${aliases.map(esc).join('|')})(?![\\w-])`, 'i');
            const mm = re.exec(text);
            if (!mm) continue;
            const start = mm.index + mm[1].length, end = start + mm[2].length;
            pieces.push({ type: 'text', value: text.slice(0, start) });
            pieces.push({ type: 'element', tagName: 'a', properties: { href: `/oxytocin-for/${slug}/`, className: ['autolink'], title: 'Our evidence verdict' }, children: [{ type: 'text', value: text.slice(start, end) }] });
            text = text.slice(end); done.add(slug); count++; matched = true;
            break; // one link per text node keeps things readable
          }
          if (matched) { pieces.push({ type: 'text', value: text }); out.push(...pieces.filter((p) => p.type !== 'text' || p.value)); continue; }
        }
        walk(child, node);
        out.push(child);
      }
      node.children = out;
    }
  };
}
