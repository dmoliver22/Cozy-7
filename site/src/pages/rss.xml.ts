import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const updates = (await getCollection('updates')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: `${SITE.name} updates`,
    description: 'New oxytocin studies, trial results and what we changed because of them.',
    site: context.site!,
    items: updates.map((u) => ({ title: u.data.title, description: u.data.description, pubDate: u.data.date, link: `/updates/${u.id}/`, categories: u.data.tags })),
    customData: `<language>${SITE.language}</language>`,
  });
}
