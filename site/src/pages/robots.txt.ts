import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { abs, withBase } from '../lib/url';
export const GET: APIRoute = () => {
  const body = SITE.preview
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nDisallow: ${withBase('/go/')}\n\nSitemap: ${abs('/sitemap-index.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
