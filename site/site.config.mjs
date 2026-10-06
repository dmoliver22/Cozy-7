// Single source of truth for site-wide settings. Edit this file first when you launch.
const env = (typeof process !== 'undefined' && process.env) || {};
export const SITE = {
  // Set SITE_URL / PREVIEW=1 in CI for a staging deploy; leave unset in production.
  preview: env.PREVIEW === '1',
  name: 'The Oxytocin Report',
  shortName: 'Oxytocin Report',
  tagline: 'The honest guide to what oxytocin can and can’t do.',
  description:
    'Plain-English verdicts on oxytocin for relationships, tinnitus, menopause, anxiety, autism, pain and more. Every human study, every active trial, no spray to sell.',
  // Replace with your real domain before deploying. Used for canonical URLs, sitemap, RSS and social cards.
  url: env.SITE_URL || 'https://theoxytocinreport.com',
  locale: 'en_US',
  language: 'en',
  twitter: '',               // e.g. '@oxytocinreport'
  contactEmail: 'hello@theoxytocinreport.com',
  foundedYear: 2026,
  // Newsletter: paste your Buttondown / Beehiiv / ConvertKit form action URL. Empty hides the form's submit and shows a mailto fallback.
  newsletterAction: '',
  newsletterEmailField: 'email',
  // Independent medical reviewer. Leave null until you have a real, named, credentialed reviewer. Never invent one.
  medicalReviewer: null, // { name: 'Jane Doe, MD', credentials: 'Board-certified endocrinologist', url: '' }
  // Order conditions appear on the home page.
  featuredOrder: [
    'marriage-and-relationships',
    'sex-and-libido',
    'tinnitus',
    'menopause',
    'social-anxiety',
    'oxytocin-deficiency',
    'depression-and-mood',
    'weight-loss',
    'ptsd',
    'autism',
    'pssd',
    'alcohol-and-addiction',
    'chronic-pain',
  ],
};
