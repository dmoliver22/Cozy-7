# The Oxytocin Report: launch handbook

This folder is a complete, production-ready static site. Build it, point a domain at it, fill in six placeholders, and it is live. This file tells you exactly what to do, in order, and what to do in the 90 days after.

## 1. What you have

| Area | What's built |
|---|---|
| Pages | 51 pages: 13 condition verdicts (`/oxytocin-for/<slug>/`), 8 guides, 6 dated updates, a 2-question quiz, trial tracker, drug pipeline, about, editorial policy, disclosure, privacy, medical disclaimer, newsletter, 404 |
| Content | ~43,000 words. Every statistic has a numbered inline citation that links to the Sources list. No dosing advice, no seller brands in body copy, no research-chemical links. A linter (`npm run lint:content`) enforces the spec in `content-brief/CONTENT_SPEC.md` |
| SEO | Canonical URLs, unique titles and meta descriptions, Open Graph and Twitter cards with a generated 1200x630 image per page, JSON-LD on every page (Organization, WebSite, BreadcrumbList, Article+MedicalWebPage with `about: MedicalCondition`, FAQPage, NewsArticle, Dataset for the trackers), XML sitemap, RSS feed, robots.txt that blocks the `/go/` redirect folder, clean trailing-slash URLs |
| Performance | Lighthouse 100/100/100/100 (performance, accessibility, best practices, SEO) on desktop for home and condition pages. Zero JavaScript except the theme toggle, mobile menu and quiz. Self-hosted variable fonts |
| Design | Warm editorial system: Fraunces display serif, Inter body, light and dark themes, six color-coded evidence verdicts, evidence snapshot tiles, sticky table of contents, mobile-first |
| Monetization plumbing | Every "find help" button routes through `/go/<partnerKey>/`, a noindexed redirect whose destination you set in `src/lib/partners.ts`. Links render with `rel="sponsored nofollow"` when a real URL is set. Disclosure text appears beside every block automatically |

## 2. Before you deploy: six placeholders

1. **Domain.** Edit `site.config.mjs` → `url`. Also edit the `Sitemap:` line in `public/robots.txt` to match. The working name "The Oxytocin Report" and `theoxytocinreport.com` are placeholders; check availability before buying. Keep "oxytocin" in the domain if you can: it helps Google tie the whole site to one entity.
2. **Contact email** in `site.config.mjs` → `contactEmail`.
3. **Newsletter.** Create a free Buttondown or Beehiiv account, copy the form action URL into `newsletterAction`. Until you do, the form shows a mailto button.
4. **Partner links** in `src/lib/partners.ts`. Leave `url: ''` for any route you have no partner for; the button falls back to an internal page and the disclosure says so. See section 5.
5. **Medical reviewer.** Leave `medicalReviewer: null` until a real, named, credentialed person has actually reviewed pages. The site already says "pending" honestly. Never fake this; it is the single most damaging thing a health site can do.
6. **Social handle** (optional) in `twitter`.

## 3. Deploy (10 minutes)

The site is static HTML. Any of these work; Cloudflare Pages is free and fastest.

- **Cloudflare Pages / Netlify / Vercel:** connect the GitHub repo, set root directory to `site`, build command `npm run build`, output directory `dist`, Node version 22. Every push to the branch redeploys.
- Set your custom domain in the host's dashboard. Force HTTPS and redirect `www` → apex (or the reverse, pick one).

After the first deploy:
1. Open `https://yourdomain/sitemap-index.xml` and `https://yourdomain/rss.xml` to confirm they load.
2. Google Search Console: add the property (domain type), submit the sitemap, request indexing on the home page, `/oxytocin-for/marriage-and-relationships/`, `/oxytocin-for/tinnitus/` and `/oxytocin-for/oxytocin-deficiency/`.
3. Bing Webmaster Tools: import from Search Console.
4. Test one URL in Google's Rich Results Test to confirm the Article, FAQ and Breadcrumb markup validate.
5. Add privacy-respecting analytics if you want them (Plausible or Fathom, one script tag in `src/layouts/BaseLayout.astro`) and name the service on `/privacy/`.

## 4. Run locally

```bash
cd site
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs dist/
npm run lint:content # checks every Markdown file against the content spec
npm run check:links  # verifies every internal link in dist/
```

## 5. Money: how each route pays, and the rules

The site never sells oxytocin. It earns on the proven alternative behind each oxytocin search. Payouts below are what affiliate directories reported in 2025–2026; confirm inside each program before relying on them.

| partnerKey | Who to apply to | Reported payout |
|---|---|---|
| couplesTherapy | ReGain (BetterHelp's couples brand, via the BetterHelp affiliate program); Lasting, Paired, Ours apps | $10–$40 per sign-up reported for BetterHelp; older reports were higher |
| onlineTherapy | BetterHelp, Talkspace, Brightside | $10–$60 per sign-up |
| menopauseCare | Midi Health, Alloy, Evernow | Midi ~12% of sales; Alloy ~$10 per verified sign-up |
| sexualHealthCare | Sex-therapy platforms; clinician marketplaces | Varies |
| weightLossCare | Clinician platforms rather than compounders. Prefer programs that prescribe branded GLP-1s | $25–$40 per subscription reported |
| tinnitusCare | Online hearing-care and hearing-aid retailers; tinnitus CBT apps | Percentage of a $1,000+ device sale |
| painCare / addictionCare / endocrinologist | Directories and clinician platforms; often no affiliate program, so these stay internal | Flat sponsorship only if anything |
| pharmacyTelehealth | One licensed, LegitScript-certified telehealth or 503A pharmacy, flat monthly sponsorship | Flat fee you negotiate |

Rules that keep you out of trouble (all are already reflected in the site copy and the `/disclosure/` page):
- **Flat fees only from clinics, therapists, pharmacies and labs.** Per-patient, per-lead or per-booking payments from healthcare providers are fee-splitting under many state laws and, for labs, a federal crime (EKRA). Affiliate payouts from consumer platforms like BetterHelp are structured by the platform and are the normal exception; keep the disclosure visible.
- **Never link to "research use only" peptide vendors.** FDA sent 50+ warning letters to them in September 2025 alone and a vendor owner was sentenced to 70 months in August 2026.
- **Never run paid ads for oxytocin products.** TikTok bans prescription-drug ads; Google and Meta require LegitScript certification for compounded drugs and Meta purged roughly 600,000 health-coach and peptide accounts in May 2026.
- **Never make an efficacy claim for compounded oxytocin, and never publish a "best oxytocin spray" ranking.** Those are the FTC and FDA fact patterns from 2025–2026.
- **Never sell or refer consumer oxytocin tests.** The assays are unreliable and the FTC named diagnostic tests in its 2026 enforcement posture.

Realistic year-one revenue for a solo operator in this niche, extrapolated from adjacent niches: low five figures. The quiz and the lab-test story are what turn moderate traffic into a brand people link to and share.

## 6. The lab-test story (your launch PR)

The page `/guides/amazon-oxytocin-sprays/` promises an independent test and reports no results. Deliver it in month one.

1. **Buy the products.** The 8–12 best-selling items returned for "oxytocin" on Amazon, Walmart and eBay. Pheromone sprays, homeopathic drops, "booster" capsules. Budget $200–$500. Keep receipts, photograph each sealed package with the order number, note lot numbers.
2. **Choose the lab.** You want LC-MS/MS quantification of oxytocin, not an antibody kit. Options: a university mass-spectrometry core facility (many accept external fee-for-service work), or an accredited contract lab (Eurofins, SGS, Intertek, or a US peptide-testing lab with ISO 17025 accreditation). Ask for a quote for "oxytocin quantification by LC-MS/MS, limit of detection in pg/mL, 10–12 samples plus one spiked positive control." Expect $150–$400 per sample. Total $2,000–$5,000. Avoid labs that advertise to peptide vendors; independence is the story.
3. **Design it so nobody can argue.** Blind the samples (the lab gets numbered vials, you keep the key). Include a positive control the lab spikes itself from a certified reference standard. Ask for the method summary, LOD/LOQ, and the raw report. Test two bottles of your top seller to show reproducibility.
4. **Give sellers a right of reply.** Email each brand the result for their product two weeks before publication. Quote their response or note that they did not respond.
5. **Publish.** A results table (product, price, label claim, oxytocin detected yes/no, concentration), the method, the lab's name, the full report as a PDF, and an update log entry. Pitch it to health and consumer reporters the same day; this is the kind of story they take.
6. **Legal note.** Truthful, documented test results about products are protected speech, but have a lawyer read the page before it goes live and stick to what the report says.

## 7. The weekly routine (30 minutes)

- Run `python3 ../oxytocin-tracker/track_trials.py` (needs internet access to clinicaltrials.gov). It prints new registrations and status changes since the last snapshot.
- For anything that changes a verdict, edit the condition page (update `lastReviewed`, `updated`, `activeTrials`, `nextReadout`, body) and add a dated file in `src/content/updates/`. The RSS feed and the home page pick it up automatically.
- Once a month, re-run the SERP checks listed in `../oxytocin-tracker/watchlist.json` and note who is ranking.

## 8. The next 90 days of content

Dated catalysts are in `src/data/catalysts.json`. Write ahead of them so the page exists when people search.

| When | Publish |
|---|---|
| Week 1–2 | Lab-test results (section 6). Short explainer: "What 'IU' means and why two 24 IU sprays aren't the same" |
| Week 3–4 | "Oxytocin and the pituitary: who should actually ask their endocrinologist" (deficiency cluster). "Oxytocin for PTSD couples: how the VA trial works" |
| Month 2 | "Oxytocin and MDMA: why one is being used to test for the other." "What Biohaven is actually doing with BHV-1955." "Oxytocin for cats and dogs is $10. Here's why that isn't a shortcut" (captures the veterinary search bleed honestly) |
| Month 3 | Dec 2026: OxyPLEASURE readout coverage the day it posts. Year-end "every oxytocin trial result of 2026" roundup |
| Ongoing | One update post per trial event; one FAQ-style guide per month answering a real search ("does oxytocin spray expire," "can you fly with oxytocin spray," "oxytocin and alcohol interaction") |

## 9. Things to verify or improve

Writers flagged these during drafting. None are errors, but each deserves a check against the primary source before you treat the page as final:
- Tiouririne 2026 alcohol trial: the paper's DOI appears to be 10.1111/acer.70326; the sources currently cite the trial registry entry. Swap in the article URL.
- Registry "year" values on several NCT sources were inferred from the NCT number pattern.
- TNX-1900 program statuses on the pipeline guide are stated "as Tonix reports them."
- The Swedish vaginal-gel pilot (menopause page) is cited with minimal detail; confirm N and year.
- Lawrence Newman's May 2026 Biohaven presentation is sourced to a secondary summary of the R&D Day filing.
- Research and drafting used AI tools under editorial direction; the editorial policy says so. Get a physician to review the 13 condition pages, then fill in `medicalReviewer` and their name appears everywhere automatically.
- `markdown.rehypePlugins` is a deprecated config path in Astro 7 (used for the inline citation links). It works today; if a future Astro release removes it, move `src/lib/rehype-cite.mjs` into a `unified()` pipeline as the warning suggests.

## 10. File map

```
site/
  site.config.mjs            ← name, domain, email, newsletter, reviewer, page order
  astro.config.mjs           ← sitemap, trailing slashes, markdown plugins
  content-brief/CONTENT_SPEC.md  ← the writing rules every page follows
  src/content/conditions/    ← 13 verdict pages (Markdown + rich frontmatter)
  src/content/guides/        ← 8 guides
  src/content/updates/       ← dated news posts
  src/data/                  ← trials.json, pipeline.json, catalysts.json
  src/lib/partners.ts        ← partner routes and URLs
  src/lib/verdict.ts         ← the six-level evidence scale
  src/lib/schema.ts          ← JSON-LD builders
  src/pages/                 ← routes (home, quiz, hubs, legal, rss, og images, /go/ redirects)
  src/components/, src/layouts/, src/styles/global.css
  scripts/                   ← lint-content, check-links, screenshots, quiz-test
```
