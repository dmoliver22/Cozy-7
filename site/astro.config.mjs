import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { SITE } from './site.config.mjs';
import rehypeCite from './src/lib/rehype-cite.mjs';
import rehypeAutolink from './src/lib/rehype-autolink.mjs';

export default defineConfig({
  site: SITE.url,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/go/') && !page.includes('/og/') && !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeCite, rehypeAutolink],
    shikiConfig: { theme: 'github-light' },
  },
});
