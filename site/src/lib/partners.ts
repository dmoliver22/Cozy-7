/**
 * Partner routes. Each key is a *kind of help*, not a brand. Fill `url` with your affiliate or referral
 * link when you have one. While `url` is empty, the /go/<key>/ redirect sends people to `fallback`
 * (an internal page) so nothing on the site is ever a dead end.
 *
 * Rules baked in: links render with rel="sponsored nofollow noopener", /go/ is disallowed in robots.txt,
 * and the disclosure line is always shown next to the block. Never pay or accept per-patient fees for
 * therapist or clinic referrals (fee-splitting rules). Flat sponsorships only.
 */
export type PartnerKey =
  | 'couplesTherapy'
  | 'onlineTherapy'
  | 'menopauseCare'
  | 'tinnitusCare'
  | 'weightLossCare'
  | 'sexualHealthCare'
  | 'addictionCare'
  | 'endocrinologist'
  | 'painCare'
  | 'pharmacyTelehealth'
  | 'none';

export interface Partner {
  heading: string;
  blurb: string;
  cta: string;
  url: string;
  fallback: string;
  kind: 'affiliate' | 'sponsor' | 'directory' | 'internal';
}

export const PARTNER_KEYS: PartnerKey[] = [
  'couplesTherapy', 'onlineTherapy', 'menopauseCare', 'tinnitusCare', 'weightLossCare',
  'sexualHealthCare', 'addictionCare', 'endocrinologist', 'painCare', 'pharmacyTelehealth', 'none',
];

export const partners: Record<Exclude<PartnerKey, 'none'>, Partner> = {
  couplesTherapy: {
    heading: 'If the relationship is the real problem',
    blurb:
      'Couples therapy with a trained therapist has decades of evidence behind it. Online options start within days and cost less than a month of compounded spray.',
    cta: 'Compare online couples counseling',
    url: '',
    fallback: '/oxytocin-for/marriage-and-relationships/',
    kind: 'affiliate',
  },
  onlineTherapy: {
    heading: 'Talk to someone who treats this every day',
    blurb:
      'Evidence-based therapy and, where appropriate, approved medication are what actually move these conditions. Online platforms can match you with a licensed clinician quickly.',
    cta: 'Find a licensed therapist online',
    url: '',
    fallback: '/guides/what-is-oxytocin/',
    kind: 'affiliate',
  },
  menopauseCare: {
    heading: 'Get menopause care that is actually proven',
    blurb:
      'Low-dose vaginal estrogen and other approved treatments have strong evidence. Menopause-trained clinicians can prescribe them, often by telehealth.',
    cta: 'Find a menopause-trained clinician',
    url: '',
    fallback: '/oxytocin-for/menopause/',
    kind: 'affiliate',
  },
  tinnitusCare: {
    heading: 'Start with what works for tinnitus today',
    blurb:
      'No drug is approved for tinnitus. A hearing evaluation, sound therapy and tinnitus-focused CBT are the approaches with real evidence for making it bother you less.',
    cta: 'Learn about evidence-based tinnitus care',
    url: '',
    fallback: '/oxytocin-for/tinnitus/',
    kind: 'affiliate',
  },
  weightLossCare: {
    heading: 'If weight is the goal, use the tools with evidence',
    blurb:
      'GLP-1 medications and structured programs have large trials behind them. An obesity-medicine clinician can tell you whether they fit your situation.',
    cta: 'Talk to a weight-management clinician',
    url: '',
    fallback: '/oxytocin-for/weight-loss/',
    kind: 'affiliate',
  },
  sexualHealthCare: {
    heading: 'Low desire and orgasm problems have real treatments',
    blurb:
      'Approved medications exist for some causes, and sex therapy helps many others. A clinician who treats sexual health can sort out which applies to you.',
    cta: 'Find a sexual-health clinician',
    url: '',
    fallback: '/oxytocin-for/sex-and-libido/',
    kind: 'affiliate',
  },
  addictionCare: {
    heading: 'Treatments that are proven to reduce drinking and use',
    blurb:
      'Medications like naltrexone and buprenorphine, combined with counseling, have strong evidence. Confidential help is available online and by phone.',
    cta: 'Find confidential addiction care',
    url: '',
    fallback: '/oxytocin-for/alcohol-and-addiction/',
    kind: 'affiliate',
  },
  endocrinologist: {
    heading: 'If you have pituitary disease, see an endocrinologist',
    blurb:
      'Oxytocin deficiency is only being studied in people with pituitary or hypothalamic conditions. An endocrinologist can tell you whether that applies to you and whether a study is recruiting.',
    cta: 'How to find an endocrinologist',
    url: '',
    fallback: '/oxytocin-for/oxytocin-deficiency/',
    kind: 'directory',
  },
  painCare: {
    heading: 'Chronic pain care with evidence behind it',
    blurb:
      'Multidisciplinary pain programs, pain-focused CBT and physical therapy outperform any single pill for most chronic pain. A pain specialist can build that plan.',
    cta: 'Learn about evidence-based pain care',
    url: '',
    fallback: '/oxytocin-for/chronic-pain/',
    kind: 'affiliate',
  },
  pharmacyTelehealth: {
    heading: 'Still want to try it? Do it the legal, safe way',
    blurb:
      'That means a licensed prescriber, a licensed compounding pharmacy, and a clear understanding that it is off-label and unproven. Never a "research" vial.',
    cta: 'Read our guide to getting it legally',
    url: '',
    fallback: '/guides/oxytocin-nasal-spray/',
    kind: 'sponsor',
  },
};

export function partnerHref(key: PartnerKey): string {
  if (key === 'none') return '';
  return `/go/${key}/`;
}
