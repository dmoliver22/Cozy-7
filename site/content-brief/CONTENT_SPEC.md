# The Oxytocin Report — Content Specification (for writers)

Working brand: **The Oxytocin Report**. Tagline: *The honest guide to what oxytocin can and can't do.*
Site date: 6 October 2026. All "as of" statements refer to that date.

## Who reads this and why

People type "oxytocin for ___" because something in their life hurts: a marriage in trouble, ringing ears, menopause wrecking their sex life, an autistic child, antidepressants that killed their libido, loneliness, anxiety, weight they can't lose. Oxytocin is the hope they typed in. Our job is to tell them the truth about oxytocin for that problem in plain English, then point them to what actually works. We never sell oxytocin. We are the only page on the internet with no spray to sell.

## Voice

- Plain English. Eighth-grade reading level. Short paragraphs (1–3 sentences). No jargon without an immediate plain-English gloss.
- Warm, direct, confident, calm. No hype, no fear, no sneering at people who tried it.
- "You" voice. Talk to one person.
- Numbers over adjectives: "80 couples," "no benefit over placebo," not "a large study" or "promising."
- Admit uncertainty plainly: "Nobody has tested this in humans." "One small study. That's it."
- Never use em dashes. Use commas, periods, or parentheses.
- No filler intros ("In today's fast-paced world"). First sentence answers the question.
- Avoid: "unlock," "game-changer," "miracle," "revolutionary," "delve," "navigate," "journey," "it's important to note."

## Hard rules (legal and editorial)

1. Never recommend a dose. You may report what a trial used ("the VA trial gives 40 IU before each session") but never "take 24 IU."
2. Never state or imply that compounded or intranasal oxytocin is FDA-approved for anything. Only injectable oxytocin (Pitocin and generics) is approved, and only for labor and postpartum bleeding.
3. Never link to or name "research use only" peptide vendors, grey-market sellers, Amazon listings, or eBay. You may describe that such products exist and what tests found.
4. Never claim a compounded spray "works" for an off-label use. Report studies; let the numbers speak.
5. Never invent a study, number, author, date, or URL. If a fact in your notes is marked unverified, either leave it out or say "reported but not independently verified."
6. Every statistic or study must map to an entry in `sources` (frontmatter). Cite inline with a bracketed number, e.g. `[3]`, matching the order of the sources list.
7. Do not give medical advice. Use "talk to a doctor who knows your history" phrasing where relevant.
8. Do not mention affiliate programs, commissions, or partners in the body. The template handles disclosure and partner blocks. The body only names the *kind* of help that works (e.g., "online couples therapy"), never a brand.

## Evidence verdict scale (frontmatter `verdict`)

| value | label shown | meaning |
|---|---|---|
| `no-human-evidence` | No human evidence | Only animal, mechanism, or case anecdotes |
| `early-signals` | Early signals | 1–2 small human studies with some positive result, nothing replicated |
| `mixed` | Mixed | Multiple human studies, results conflict or depend on context |
| `negative` | Tested, didn't work | Adequately sized trial(s) or meta-analysis found no benefit |
| `promising` | Promising | Replicated positive human results, not yet standard care |
| `established` | Established medicine | Approved and standard (labor, postpartum bleeding only) |

## File format: condition pages

Path: `site/src/content/conditions/<slug>.md`. Plain Markdown. No HTML, no MDX, no components, no images. Headings start at `##`. Target 1,400–2,200 words of body.

Frontmatter (YAML, all fields required unless marked optional):

```yaml
---
title: "Oxytocin for Tinnitus: What the Evidence Actually Shows"   # 50–65 chars, includes "Oxytocin" and the condition
description: "..."          # 140–160 chars, plain, answers the question, no clickbait
condition: "Tinnitus"       # short noun phrase
question: "Does oxytocin help tinnitus?"   # the question a searcher asks
verdict: early-signals
oneLiner: "One small Brazilian pilot found less ringing. Nobody has replicated it, and the only US trial was shut down early."  # 1 sentence, <= 200 chars
humanStudies: 2             # count of human studies discussed (integer)
largestStudy: "16 patients, placebo-controlled crossover (2017)"
activeTrials: 0             # registered human trials recruiting or active now (integer)
nextReadout: ""             # e.g. "Dec 2026" or "" if none
partnerKey: tinnitusCare    # one of: couplesTherapy | onlineTherapy | menopauseCare | tinnitusCare | weightLossCare | sexualHealthCare | addictionCare | endocrinologist | painCare | pharmacyTelehealth | none
whatWorks:                  # 2–4 items, the real solutions for THIS problem, evidence-backed, plain names (no brands)
  - name: "Sound therapy and CBT for tinnitus"
    why: "The approach with the strongest evidence for reducing how much tinnitus bothers you."
  - name: "A hearing test"
    why: "Most tinnitus comes with hearing loss, and treating that often helps."
faq:                        # 4–6 items, real questions people search, concise answers (40–90 words each), no inline citations needed
  - q: "Is there a clinical trial for oxytocin and tinnitus I can join?"
    a: "..."
sources:                    # 6–15 items, numbered in the order you cite them
  - title: "Tinnitus treatment with oxytocin: a pilot study"
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5613090/"
    year: 2017
    type: study            # study | trial-registry | review | meta-analysis | regulator | company | news | other
relatedSlugs: ["social-anxiety", "chronic-pain"]   # 2–4 other condition slugs
lastReviewed: 2026-10-06
updated: 2026-10-06
---
```

Body structure, in this exact order with these exact H2 headings:

1. `## The short answer` (80–150 words. Answer first. Then the one or two facts that matter most.)
2. `## Why people hope oxytocin will help` (100–200 words. The real-life problem, the biology that makes the hope reasonable, and where the hype came from.)
3. `## What the research actually found` (500–900 words. Walk through the human studies chronologically or by strength. Give N, design, dose used, result, and a plain-English read of each. Say explicitly when evidence is animal-only. Use `### ` sub-headings for each major study or theme.)
4. `## What's being tested right now` (100–300 words. Registered trials with NCT numbers, who runs them, how many people, when results are expected. If none: say so plainly and say what would need to happen.)
5. `## Where this leaves you` (120–220 words. Honest synthesis: what a careful person would conclude today, what would change the picture, and a transition into "the things that are proven to help with [problem]" without naming brands.)

The template then renders: the "What actually works" block (from `whatWorks`), the FAQ (from `faq`), and the Sources (from `sources`). Do not write those sections in the body.

## File format: guide pages

Path: `site/src/content/guides/<slug>.md`. Same voice and rules. Target 1,200–2,000 words. Headings start at `##`, your choice of structure, but open with a short answer paragraph and include a `## Frequently asked questions`-free body (FAQ goes in frontmatter).

```yaml
---
title: "..."           # 50–65 chars
description: "..."     # 140–160 chars
summary: "..."         # 1–2 sentences for cards
partnerKey: pharmacyTelehealth | none | (any key above)
faq: [...]             # 3–6 items
sources: [...]         # 5–15 items
relatedSlugs: [...]    # slugs of conditions or guides, 2–4
lastReviewed: 2026-10-06
updated: 2026-10-06
---
```

## File format: updates (news)

Path: `site/src/content/updates/<yyyy-mm-dd>-<slug>.md`. 300–600 words. News voice: what happened, what it means, what we changed on the site.

```yaml
---
title: "..."
description: "..."
date: 2026-10-06
tags: ["trials", "relationships"]
affects: ["marriage-and-relationships"]   # condition/guide slugs this update touches, may be []
sources: [...]
---
```

## Verified facts you may rely on (as of 6 Oct 2026)

Use these freely. Anything else must come from the research notes with a URL, or be verified by your own search.

- FDA: oxytocin is approved only as an injectable (Pitocin and generics) for inducing or augmenting labor and controlling postpartum bleeding. No intranasal, sublingual, or compounded form is FDA-approved for anything. Syntocinon nasal spray was withdrawn from the US market in the mid-1990s. Australia's register lists a Syntocinon 40 IU/mL nasal spray (ARTG 13382) for export only; it may not be supplied in Australia. Switzerland, Portugal and Brazil market the spray for lactation.
- Compounded oxytocin nasal spray is made by 503A compounding pharmacies for a named patient with a prescription. Telehealth prices observed Oct 2026: from about $99–$115/month at the low end to $195–$206/month at the high end; one pharmacy lists from $118 per 10 mL. Pharmacy fill prices reported at $21–$120.
- FDA sent roughly 100 warning letters in September 2025 and 30 more in Feb–March 2026 to telehealth companies over compounded-drug marketing claims ("FDA approved," "clinically proven," "same active ingredient"). FDA sent 50+ warning letters to "research use only" peptide sellers in Sept 2025 and continued through 2026; one seller's owner was sentenced to 70 months in Aug 2026.
- Relationships: Ditzen et al. 2009 (Biological Psychiatry), 47 couples, intranasal oxytocin before a lab conflict discussion increased positive relative to negative communication and lowered cortisol. Randomized trial of intranasal oxytocin (40 IU) added to Alcohol Behavioral Couple Therapy, 96 couples, Journal of Clinical Psychiatry 2025: well tolerated, no improvement in drinking or relationship outcomes beyond therapy alone. JAMA Psychiatry 2026;83(2):118–127 (published online Nov 2025): 80 healthy couples, four suction-blister wounds each; oxytocin alone did not speed healing or lower cortisol; oxytocin combined with affectionate touch (and, less robustly, sexual activity) was associated with faster wound healing. VA San Diego trial NCT06194851 (PI Leslie Morland): Phase 2, recruiting, about 240 participants (120 couples), veteran takes intranasal oxytocin before each of eight brief cognitive-behavioral conjoint therapy sessions; completion expected around 2028. The My First Million podcast (episode 868, 5 Oct 2026) led with "oxytocin dosing for marriage" as a business idea, reviving a remark Palmer Luckey made on the same podcast in October 2022 (episode 378). Expert concern about using oxytocin in couples therapy dates to 2011–2013 press coverage (TIME).
- Tinnitus: Azevedo et al. 2017, Frontiers in Neurology, Brazil: open-label 10-week study in 15 patients plus a placebo-controlled crossover in 16 patients, both reporting reduced tinnitus; authors called for larger trials. NYU Langone trial NCT04210310 (high-dose nasal spray, PI Lawrence C. Newman) was TERMINATED due to the investigator leaving the institution; completed May 2022, results submitted Aug 2022. US patent 11,241,477 "Oxytocin compositions for treatment of tinnitus" (inventors Newman and Cramer) was assigned to NYU, later to Maskbegone LLC. Biohaven lists BHV-1955, a long-acting intranasal oxytocin for tinnitus, as preclinical; Newman presented it at Biohaven's R&D Day on 27 May 2026. No IND or Phase 1 date announced.
- Autism: Sikich et al. 2021 (NEJM), 290 children, 24 weeks, no benefit over placebo. 2026 meta-analysis (Alpha Psychiatry, Aug 2026): 12 RCTs, 733 participants, no significant effect on social outcomes.
- Alcohol: Tiouririne et al. 2026 (Alcohol: Clinical and Experimental Research, 15 July 2026): 100 adults with alcohol use disorder, 12 weeks, up to 70 IU/day, no difference in heavy drinking days; oxytocin group scored lower on anger and physical aggression; most common side effect was reduced sense of smell.
- Mental disorders broadly: a 2026 meta-analysis titled "Does intranasal oxytocin reduce symptoms of mental disorders?" found small, non-significant overall effects, with a modest signal in schizophrenia-spectrum disorders (exact trial counts not verified).
- Social anxiety: Guastella et al. 2009, oxytocin added to exposure therapy improved self-evaluation of speech performance but not overall treatment outcome.
- Sex: Behnia et al. 2014 (Hormones and Behavior), 29 couples, intranasal oxytocin before sex; modest effects on orgasm intensity and contentment, no change in most measures. A controlled study in women with sexual dysfunction found oxytocin and placebo produced similar improvements.
- Menopause: BMC Women's Health 2023 meta-analysis of vaginal oxytocin gel: 7 studies, 631 women; clinically assessed atrophy improved, but dyspareunia, pH, and histology did not differ significantly. A Phase 3 oxytocin vaginal gel trial NCT06514586 (about 242 women) is registered. OxyMENO NCT07742124 (University Hospital Basel, started 20 Aug 2026) measures neurophysin-I in post- vs premenopausal women.
- Oxytocin deficiency: Atila et al. 2023 (Lancet Diabetes & Endocrinology), Basel: MDMA-stimulated oxytocin was blunted in people with arginine-vasopressin deficiency (central diabetes insipidus), supporting a clinically relevant oxytocin-deficient state. Lawson, Endocrine Reviews 2025: oxytocin deficiency in hypothalamic-pituitary disease is an emerging field; no validated routine clinical test exists; single blood measurements are unreliable. Neurophysin-I (co-released with oxytocin, longer half-life) validated as a surrogate biomarker (MacLean lab, University of Arizona, 2024). Trials: PHOENIX NCT07361263 (oral estrogens as a stimulation test; completion Feb 2027), OxyPLEASURE NCT06808516 (oxytocin and sexual well-being in AVP deficiency; primary completion Dec 2026), both Basel. No consumer oxytocin test exists; research immunoassays give values that vary 100-fold between methods.
- Prader-Willi: Acadia's Phase 3 COMPASS PWS trial of intranasal carbetocin (175 participants) missed its primary and all secondary endpoints, announced 24 Sept 2025, program discontinued. Tonix TNX-2900 (magnesium-potentiated intranasal oxytocin) Phase 2 guided for the second half of 2027 (slipped from 2026, then from Q1 2027), ages 8–17.5, Orphan and Rare Pediatric Disease designations.
- Pain: Memorial University of Newfoundland trial NCT04903002, about 336 participants, crossover, 24 IU vs 48 IU vs placebo, active not recruiting, primary completion around March 2026, results pending. Brigham and Women's IV oxytocin post-hysterectomy pain trial NCT06483659 recruiting.
- Other active or completed trials: benzodiazepine withdrawal NCT06757517 (St. Olavs, Norway, 60 people, 48 IU/day, completed 2026, unpublished); dementia caregiver stress NCT06364228 (Nebraska, 12 vs 24 IU for 21 days, completion May 2027); schizophrenia add-on NCT06881810 (active, not recruiting); VA oxytocin for PTSD NCT04228289 (completed, updated Mar 2026, unpublished); opioid use disorder NCT05761860 (University of Florida, Dec 2026).
- Delivery: whether nasal oxytocin reaches the human brain in meaningful amounts is still debated (Quintana et al. 2021 review: evidence limited). Trial doses have ranged from 6 to 160 IU/day. Peak plasma 15–45 min, half-life roughly 30 min.
- Consumer products: "Liquid Trust" (Vero Labs) was tested by a University of Washington researcher and found negative for oxytocin, "consistent with tap water" (2013–2014 reporting). Amazon "oxytocin" sprays are pheromone or homeopathic products; reviews are polarized.
- Interest: Exploding Topics lists "oxytocin" at roughly 550K monthly searches, +117% (time window not shown). Treat as indicative only.

## Research notes available to you

Read the relevant files in `/home/user/Cozy-7/research_notes/Oxytocin market open lane/` for sources with URLs:
`science_whitespace.md` (trials, studies, pipeline), `demand_side.md` (what people ask, communities), `supply_side.md` (prices, providers), `regulatory_edges.md` (FDA/FTC rules), `tools_communities_gaps.md` (products, tests, Liquid Trust), `adjacent_business_models.md` (skip unless needed).
Also `/home/user/Cozy-7/oxytocin-tracker/trials_baseline.csv` and `pipeline_baseline.csv`.

Direct web fetching is blocked in this environment. Web search works but the budget is shared: use at most 15 searches, only to verify a fact you need and cannot find in the notes.

## Quality bar

A reader who knows nothing should finish the page knowing exactly what the evidence says, what to watch for, and what to do next. A clinician who reads it should find nothing wrong. A Google rater should see original synthesis, named studies with numbers, honest uncertainty, and a clear author stance. That is the bar.
