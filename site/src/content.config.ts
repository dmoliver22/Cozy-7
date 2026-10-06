import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { VERDICT_KEYS } from './lib/verdict';
import { PARTNER_KEYS } from './lib/partners';

const source = z.object({
  title: z.string(),
  url: z.string(),
  year: z.union([z.number(), z.string()]).optional(),
  type: z.string().optional(),
});
const faqItem = z.object({ q: z.string(), a: z.string() });

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conditions' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    condition: z.string(),
    question: z.string(),
    verdict: z.enum(VERDICT_KEYS as [string, ...string[]]),
    oneLiner: z.string(),
    humanStudies: z.coerce.number().int().nonnegative(),
    largestStudy: z.string(),
    activeTrials: z.coerce.number().int().nonnegative(),
    nextReadout: z.string().default(''),
    partnerKey: z.enum(PARTNER_KEYS as [string, ...string[]]).default('none'),
    whatWorks: z.array(z.object({ name: z.string(), why: z.string() })).min(1),
    faq: z.array(faqItem).default([]),
    sources: z.array(source).min(1),
    relatedSlugs: z.array(z.string()).default([]),
    lastReviewed: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    partnerKey: z.enum(PARTNER_KEYS as [string, ...string[]]).default('none'),
    faq: z.array(faqItem).default([]),
    sources: z.array(source).default([]),
    relatedSlugs: z.array(z.string()).default([]),
    lastReviewed: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    affects: z.array(z.string()).default([]),
    sources: z.array(source).default([]),
  }),
});

export const collections = { conditions, guides, updates };
