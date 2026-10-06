/** Turns inline citations like [3] into superscript links to #src-3 in the Sources list. */
const SKIP = new Set(['a', 'code', 'pre', 'script', 'style', 'h1', 'h2', 'h3', 'h4']);
const RE = /\[(\d{1,2})\]/g;

export default function rehypeCite() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node.children) return;
  const out = [];
  for (const child of node.children) {
    if (child.type === 'text' && !SKIP.has(node.tagName) && RE.test(child.value)) {
      RE.lastIndex = 0;
      let last = 0;
      let m;
      while ((m = RE.exec(child.value))) {
        if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
        out.push({
          type: 'element',
          tagName: 'a',
          properties: { href: `#src-${m[1]}`, className: ['cite'], 'aria-label': `Source ${m[1]}` },
          children: [{ type: 'text', value: m[1] }],
        });
        last = m.index + m[0].length;
      }
      if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
    } else {
      walk(child);
      out.push(child);
    }
  }
  node.children = out;
}
