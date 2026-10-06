import { SITE } from '../config';
import { VERDICTS, type Verdict } from './verdict';

const abs = (p: string) => new URL(p, SITE.url).toString();
export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;

export function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url + '/',
    logo: { '@type': 'ImageObject', url: abs('/og/default.png'), width: 1200, height: 630 },
    email: SITE.contactEmail,
    foundingDate: String(SITE.foundedYear),
    description: SITE.description,
    publishingPrinciples: abs('/editorial-policy/'),
    ...(SITE.twitter ? { sameAs: [`https://x.com/${SITE.twitter.replace('@', '')}`] } : {}),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url + '/',
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  if (!items?.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

interface ArticleOpts {
  path: string;
  headline: string;
  description: string;
  published: Date;
  modified: Date;
  image: string;
  type?: 'Article' | 'NewsArticle';
  medical?: { condition?: string; verdict?: Verdict; lastReviewed?: Date };
  section?: string;
  keywords?: string[];
  wordCount?: number;
}

export function article(o: ArticleOpts) {
  const base: Record<string, unknown> = {
    '@type': o.medical ? ['Article', 'MedicalWebPage'] : (o.type ?? 'Article'),
    '@id': abs(o.path) + '#article',
    headline: o.headline,
    description: o.description,
    url: abs(o.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(o.path) },
    image: { '@type': 'ImageObject', url: abs(o.image), width: 1200, height: 630 },
    datePublished: o.published.toISOString(),
    dateModified: o.modified.toISOString(),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    inLanguage: SITE.language,
    isAccessibleForFree: true,
    ...(o.section ? { articleSection: o.section } : {}),
    ...(o.keywords?.length ? { keywords: o.keywords.join(', ') } : {}),
    ...(o.wordCount ? { wordCount: o.wordCount } : {}),
  };
  if (o.medical) {
    if (o.medical.condition) {
      base.about = { '@type': 'MedicalCondition', name: o.medical.condition };
      base.mentions = { '@type': 'Drug', name: 'Oxytocin', nonProprietaryName: 'oxytocin' };
    }
    if (o.medical.lastReviewed) base.lastReviewed = o.medical.lastReviewed.toISOString().slice(0, 10);
    if (o.medical.verdict) base.abstract = `Evidence verdict: ${VERDICTS[o.medical.verdict].label}`;
    if (SITE.medicalReviewer) {
      base.reviewedBy = { '@type': 'Person', name: SITE.medicalReviewer.name, jobTitle: SITE.medicalReviewer.credentials, ...(SITE.medicalReviewer.url ? { url: SITE.medicalReviewer.url } : {}) };
    }
  }
  return base;
}

export function graph(...nodes: (Record<string, unknown> | null)[]) {
  return { '@context': 'https://schema.org', '@graph': [organization(), website(), ...nodes.filter(Boolean)] };
}
