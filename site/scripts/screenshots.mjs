// Usage: node scripts/screenshots.mjs http://localhost:4321  -> writes qa/*.png
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:4321';
const exe = '/opt/pw-browsers/' + readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium-')) + '/chrome-linux/chrome';
mkdirSync('qa', { recursive: true });
const pages = [
  ['home', '/'], ['condition-tinnitus', '/oxytocin-for/tinnitus/'], ['condition-marriage', '/oxytocin-for/marriage-and-relationships/'],
  ['conditions', '/oxytocin-for/'], ['quiz', '/quiz/'], ['trials', '/trials/'], ['guide-spray', '/guides/oxytocin-nasal-spray/'], ['updates', '/updates/'],
];
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
for (const [scheme, width, tag] of [['light', 1360, 'desktop'], ['dark', 1360, 'desktop-dark'], ['light', 390, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `qa/${name}-${tag}.png`, fullPage: name !== 'home' ? false : true });
  }
  await ctx.close();
}
await browser.close();
console.log('screenshots written to qa/');
