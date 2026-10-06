import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { VERDICTS, type Verdict } from './verdict';

export type Condition = CollectionEntry<'conditions'>;
export type Guide = CollectionEntry<'guides'>;
export type Update = CollectionEntry<'updates'>;

export async function conditionsFeatured(): Promise<Condition[]> {
  const all = await getCollection('conditions');
  const order = SITE.featuredOrder as string[];
  return all.sort((a, b) => {
    const ia = order.indexOf(a.id), ib = order.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}
export async function conditionsByStrength(): Promise<Condition[]> {
  const all = await getCollection('conditions');
  return all.sort((a, b) => VERDICTS[b.data.verdict as Verdict].score - VERDICTS[a.data.verdict as Verdict].score || a.data.condition.localeCompare(b.data.condition));
}
export async function updatesNewest(): Promise<Update[]> {
  const all = await getCollection('updates');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
export async function guidesAll(): Promise<Guide[]> {
  const all = await getCollection('guides');
  const first = ['what-is-oxytocin', 'oxytocin-nasal-spray', 'side-effects-and-safety', 'cost-and-where-to-get-it'];
  return all.sort((a, b) => {
    const ia = first.indexOf(a.id), ib = first.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.data.title.localeCompare(b.data.title);
  });
}
