export type Verdict =
  | 'no-human-evidence'
  | 'early-signals'
  | 'mixed'
  | 'negative'
  | 'promising'
  | 'established';

export const VERDICTS: Record<
  Verdict,
  { label: string; short: string; meaning: string; score: number; tone: string }
> = {
  'established': {
    label: 'Established medicine',
    short: 'Established',
    meaning: 'Approved and standard care. For oxytocin that means labor and postpartum bleeding only.',
    score: 6,
    tone: 'established',
  },
  'promising': {
    label: 'Promising',
    short: 'Promising',
    meaning: 'Replicated positive results in humans, not yet standard care.',
    score: 5,
    tone: 'promising',
  },
  'mixed': {
    label: 'Mixed',
    short: 'Mixed',
    meaning: 'Several human studies. Results conflict or depend heavily on context.',
    score: 4,
    tone: 'mixed',
  },
  'early-signals': {
    label: 'Early signals',
    short: 'Early',
    meaning: 'One or two small human studies with a positive result. Nothing replicated yet.',
    score: 3,
    tone: 'early',
  },
  'no-human-evidence': {
    label: 'No human evidence',
    short: 'No human data',
    meaning: 'Only animal studies, lab mechanisms, or anecdotes.',
    score: 2,
    tone: 'none',
  },
  'negative': {
    label: 'Tested, didn’t work',
    short: 'Didn’t work',
    meaning: 'Adequately sized trials or a meta-analysis found no benefit over placebo.',
    score: 1,
    tone: 'negative',
  },
};

export const VERDICT_KEYS = Object.keys(VERDICTS) as Verdict[];
