# Oxytocin niche tracker — baseline, 6 October 2026

Files in this folder:

| File | What it is |
|---|---|
| `README.md` | This baseline report: what was verified, what was wrong in the earlier research, open gaps, catalysts |
| `trials_baseline.csv` | 18 registered trials worth watching, with status as of today and why each matters |
| `pipeline_baseline.csv` | Drug-development programs (BHV-1955, TNX-2900, carbetocin, merotocin, compounded generic) |
| `competitors_baseline.csv` | 30 competitor domains, with whether their oxytocin pages were actually found in the search index |
| `watchlist.json` | Queries, catalysts and pages to re-run on each tracking pass |
| `track_trials.py` | Stdlib-only script that pulls all oxytocin trials from the ClinicalTrials.gov v2 API and diffs against the last snapshot |

Method note: the cloud session that produced this could not open any website directly (the environment's network policy denied every host, including clinicaltrials.gov). Everything below was established through search-index results and their snippets. Where a claim could not be confirmed that way, it is marked unverified rather than repeated.

## 1. Corrections to the earlier research

The earlier AI's strategy is directionally sound. Several of its load-bearing specifics are not.

| Earlier claim | What I found |
|---|---|
| OxytocinBio.com launched ~27 July 2026 with 63 guides, calculators and a trial-dose explorer, and already ranks for intranasal dosing queries | No trace of the domain or brand anywhere in the search index, including a domain-restricted search and a search for its distinctive page titles ("oxytocin cost per month", "oxytocin price without insurance"). Meanwhile six smaller peptide dosing sites surface immediately. A 60-page site "ranking prominently" would show up. Treat as unverified or fabricated until you open it yourself. Every downstream claim about its editorial policy, its missed alcohol trial, and its taxonomy falls with it. |
| Palmer Luckey's oxytocin comment recirculated on a 28 Sept Moonshots/XPRIZE episode | Not found. Moonshots LIVE was 25 Sept and episode 295 did feature Luckey, but nothing links oxytocin to it. A plain "Palmer Luckey oxytocin" search returns nothing. The quote itself ("completely unregulated, which is great", a kilogram from Sigma-Aldrich) appears only in podcast-summary aggregators. |
| My First Million made oxytocin its lead idea on 5 Oct | Confirmed. Episode 868, 5 Oct 2026, oxytocin dosing at 3:08, then loneliness and faith-based businesses. The attention spike is real. |
| "2026 JAMA Psychiatry trial" in 80 couples | Real, but published online November 2025 (print issue Feb 2026). It is an eleven-month-old story, not breaking news. Findings as described: oxytocin alone did nothing for wound healing; oxytocin plus affectionate touch did. |
| Celia Health, Maximus, Pru, Peptifact, Titan Peptide Lab, Jay Campbell, PepFinder, AnthologyRX, Nutree, Newtropin all publishing oxytocin pages in 2026 | None surfaced for oxytocin. Mochi, TrimRx, Healthspan, Push Health, Heally and Invigor did. |
| Carbetocin COMPASS PWS "just" failed | Announced 24 Sept 2025, a year ago. |
| Merotocin "first-in-human" | It is in Phase II for lactation support (Ferring). |
| "Updated" vaginal-oxytocin meta-analysis of 7 studies / 631 women | Real but from September 2023 (BMC Women's Health). |
| 2026 meta-analysis of 42 RCTs across mental disorders | A 2026 meta-analysis titled "Does intranasal oxytocin reduce symptoms of mental disorders?" exists on PubMed. The 42/1,922 figures could not be confirmed from snippets. |
| 2026 autism meta-analysis, 12 RCTs / 733 participants, null | Confirmed (Alpha Psychiatry, Aug 2026). |
| 100-person 12-week multisite alcohol RCT, July 2026 | Confirmed (Tiouririne et al., Alcohol: Clinical and Experimental Research, 15 July 2026). Up to 70 IU/day. Primary endpoint negative. Oxytocin group scored lower on anger and physical aggression. Most common adverse event: reduced sense of smell. |
| VA couples trial, 240 participants, completion Sept 2028 | Confirmed as NCT06194851 (VA San Diego, PI Leslie Morland), recruiting. The 2028 date was not re-verified today. |

Net: keep the clusters, discard the competitor timeline, and stop citing OxytocinBio as the benchmark until someone has actually loaded the page.

## 2. New things the earlier research missed

**The tinnitus story is one person.** Lawrence C. Newman, MD, was the NYU principal investigator on NCT04210310 (high-dose oxytocin nasal spray for tinnitus). That trial was terminated when he left NYU, with results submitted in August 2022. He is co-inventor on US patent 11,241,477 ("Oxytocin compositions for treatment of tinnitus"), assigned first to NYU and then to Maskbegone LLC. He presented the BHV-1955 clinical rationale at Biohaven's R&D Day on 27 May 2026. So Biohaven's program is the continuation of the NYU work, and BHV-1955 is still listed as preclinical in Biohaven's 2026 filings. No IND or Phase 1 date was found. That means: strong narrative, no near-term catalyst, and a search landscape where "BHV-1955" currently returns bovine herpesvirus papers. Genuinely empty.

**Basel is running three 2026 oxytocin-deficiency trials.** University Hospital Basel has PHOENIX (NCT07361263, estrogen stimulation test for oxytocin deficiency, posted Jan 2026, completion Feb 2027), OxyPLEASURE (NCT06808516, oxytocin and sexual well-being in AVP deficiency, primary completion Dec 2026) and OxyMENO (NCT07742124, neurophysin-I in postmenopausal vs premenopausal women, started 20 Aug 2026). An MGH-side deficiency study (NCT06460948) completed and was last updated May 2026. The deficiency-and-testing cluster is not speculative. It has dated catalysts in 2027.

**Completed-but-unpublished trials are free news hooks.** NCT06757517 (oxytocin for benzodiazepine withdrawal, 48 IU/day) completed September 2026. NCT04228289 (VA oxytocin for PTSD) is completed and was updated March 2026. Both will publish, and both are unclaimed topics.

**The cost/buy space is already programmatic.** compoundingfinder.com runs per-state oxytocin pages plus a cost guide. ubiehealth.com runs multiple AI-generated "feeling numb, low oxytocin" symptom pages. That is the strongest evidence yet to stay out of dosage/cost and to move fast on deficiency before more programmatic players arrive.

**Pricing points observed today:** Push Health or Invigor from $99/mo; Heally program from $115; Bayview from $118 per 10 mL; Healthspan ~$135/mo; Defiance Health $195/mo; FormBlends $206/mo.

## 3. Gap map after verification

| Cluster | SERP today | Verdict |
|---|---|---|
| Oxytocin + marriage / couples therapy | Time Healthland (2013), Scientific American, UNSW news, a 2013 PMC review, the alcohol couples-therapy RCT, a Veeva trial listing. No specialist site. | Open. Most time-sensitive because of the 5 Oct podcast. |
| Oxytocin + tinnitus / BHV-1955 | 2017 Frontiers pilot and its mirrors only. "BHV-1955" returns cattle virus papers. | Wide open, but slow-burn. Build 5 to 8 pages, then wait for an IND. |
| Oxytocin deficiency + testing | University press releases, Newswise, Ubie Health AI pages. | Open with real 2027 catalysts. Highest authority payoff. |
| Drug pipeline (BHV-1955, TNX-2900, carbetocin, merotocin) | Investor sites and rare-disease news. No consumer synthesis. | Open. One strong table page plus per-program pages. |
| PSSD / SSRI sexual dysfunction | PubMed, a Q&A site, an advocacy blog. | Open, high intent, handle carefully. |
| Menopause / vaginal oxytocin | Academic only. | Open, modest volume. |
| Delivery science (does it reach the brain) | Academic. | Open. |
| Dosage / cost / buy / prescription | Six peptide guide sites, two telehealth marketplaces, programmatic directories, pharmacy pages. | Crowded. Cover for completeness later, do not lead with it. |

## 4. What to track, and how

`track_trials.py` pulls every ClinicalTrials.gov study with oxytocin as an intervention and prints new registrations and status changes since the last snapshot. It needs outbound access to clinicaltrials.gov, which this cloud environment currently blocks. Run it locally, or allow the domain under the environment's network settings and it can run on a weekly routine from here.

Catalysts with dates are in `watchlist.json`. The SERP queries to re-run each pass are listed there too.

## 5. Revised view

The earlier AI's three-wave framing (consumer, clinical, biotech) holds. What changed after verification:

1. The competitive threat it described does not appear to exist in the form described. The real competition is a layer of generic peptide guide sites and telehealth blogs, none of which owns a cluster.
2. The consumer wave is one podcast episode old. The clinical wave is real and dated. Prioritize content that will still be correct when the Basel and VA trials read out.
3. The biggest content differentiator available right now is honest negative-result coverage: the alcohol trial, the autism meta-analysis, the carbetocin failure, the terminated NYU tinnitus study. No competitor does this and it is exactly what Google's YMYL guidance rewards.
