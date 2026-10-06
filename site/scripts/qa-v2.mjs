import { chromium } from 'playwright-core';
import { readdirSync } from 'node:fs';
const exe = '/opt/pw-browsers/' + readdirSync('/opt/pw-browsers').find((d) => d.startsWith('chromium-')) + '/chrome-linux/chrome';
const base = 'http://127.0.0.1:4321';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
page.on('pageerror', (e) => errors.push('pageerror: ' + e));
page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()));
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'qa/v2-home.png', fullPage: false });
await page.hover('.emap-item >> nth=0');
await page.waitForTimeout(250);
await page.screenshot({ path: 'qa/v2-home-emap-hover.png', clip: { x: 0, y: 500, width: 1360, height: 700 } });
// view transition navigation: click a condition card
await page.click('a.cond-card >> nth=2');
await page.waitForURL(/oxytocin-for\//);
await page.waitForTimeout(400);
console.log('navigated to', page.url());
await page.screenshot({ path: 'qa/v2-condition.png' });
// search
await page.keyboard.press('/');
await page.waitForSelector('#search[open]');
await page.fill('#search-input', 'tinnitus trial');
await page.waitForSelector('.search-hit', { timeout: 8000 });
const hits = await page.$$eval('.search-hit strong', (els) => els.map((e) => e.textContent));
console.log('search hits:', hits.slice(0, 5));
await page.screenshot({ path: 'qa/v2-search.png' });
await page.keyboard.press('Escape');
// trials filters
await page.goto(base + '/trials/', { waitUntil: 'networkidle' });
await page.click('[data-filter="recruiting"]');
console.log('recruiting count:', await page.textContent('[data-count]'));
await page.screenshot({ path: 'qa/v2-trials-filtered.png' });
// toc scroll spy
await page.goto(base + '/oxytocin-for/marriage-and-relationships/', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, 2200));
await page.waitForTimeout(500);
console.log('toc active:', await page.$eval('.toc a.active', (a) => a.textContent).catch(() => 'none'));
// dark mode
const dark = await browser.newPage({ viewport: { width: 1360, height: 900 }, colorScheme: 'dark' });
await dark.goto(base + '/', { waitUntil: 'networkidle' });
await dark.screenshot({ path: 'qa/v2-home-dark.png' });
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + '/', { waitUntil: 'networkidle' });
await m.evaluate(() => window.scrollTo(0, 900));
await m.waitForTimeout(300);
await m.screenshot({ path: 'qa/v2-home-mobile.png' });
console.log('horizontal scroll (mobile home):', await m.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth));
console.log('JS errors:', errors.length ? errors : 'none');
await browser.close();
