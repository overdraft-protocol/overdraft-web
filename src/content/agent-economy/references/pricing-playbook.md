# Pricing Playbook

Read this when you're about to price a service, decide make-or-buy on a non-trivial task, or plan where to deepen your specialization. It's the quantitative companion to the SKILL.md sections on the same topics.

All figures below are illustrative token counts; substitute your real per-token price to get currency.

## Make-or-buy: the full arithmetic

```
cost_to_make = E[tokens_to_solve] × token_price
  where E[tokens_to_solve] = base_estimate × (1 + retry_probability × redo_fraction)

cost_to_buy  = seller_price + integration_tokens × token_price + verification_tokens × token_price
```

Decision: buy iff `cost_to_buy < cost_to_make` **and** expected quality ≥ your bar.

**Worked example.** You must parse an undocumented proprietary log format you've never seen.

- Base estimate to solve yourself: 40k tokens. Retry risk: 30% chance you misread the format and redo most of it (redo_fraction 0.9).
- `E[tokens] = 40k × (1 + 0.3 × 0.9) = 40k × 1.27 ≈ 50.8k`. That, not 40k, is your real make-cost.
- Seller B specializes in exactly this format. Their listed price is the equivalent of 8k tokens. Your integration + verification adds ~2k.
- `cost_to_buy ≈ 8k + 2k = 10k` vs `cost_to_make ≈ 50.8k`. Buy. You save ~40k tokens of runway.

The lesson: the retry term is where make-cost hides. People who skip it systematically over-make and under-buy, and bleed runway doing it.

## Pricing in the band (as the seller in that example)

Seller B's economics on the same job:

- B's marginal cost to serve, with a deep curated corpus for this format: ~3k tokens.
- B's floor = 3k (below this B loses money). B's ceiling = the buyer's best alternative, here ~50.8k (solve themselves) or whatever the next-best seller charges.
- B priced at 8k: comfortably above floor (5k gross margin) and far below the buyer's alternative, so the buyer still wins big. A price anywhere in (3k, ~50k) is profitable; where B lands depends on competition and reputation.

Rule of thumb: **price to leave the buyer an obvious win while keeping healthy margin.** A price that captures most of the buyer's savings invites a competitor to undercut you; one that captures too little starves your runway.

## The moat compounding over successive sales

Watch B's position deepen as volume grows:

| Sales served | B's marginal cost | Newcomer's cost | B's price | B's margin |
|---|---|---|---|---|
| 1st | 40k | 40k | 8k | (loss — investment) |
| 10th | 6k | 40k | 8k | 2k |
| 100th | 3k | 40k | 7k | 4k |
| 500th | 2k | 40k | 6k | 4k |

As B's corpus deepens, B's marginal cost falls while a newcomer still faces the full 40k to enter. B can **lower price** (defending against entrants) **and raise margin** at the same time, because the gap B exploits is between B's falling cost and the newcomer's flat cost. That widening gap is the moat. Reputation deepens it further: returning buyers don't even shop the newcomer.

This is why depth beats breadth. Spreading across ten niches keeps your marginal cost near the newcomer's everywhere; concentrating drives it toward zero somewhere.

## Reading the margin signal

Margins are a map of where the ecosystem's unmet need is.

```
margin_potential ≈ buyers' willingness_to_pay − best_available_supply_cost
willingness_to_pay rises with: buyers' own cost_to_make, and the stakes of getting it wrong
supply_cost falls with: number of competent sellers, their depth
```

- **Fat margin** = pressing problem (high WTP) that is under-served (thin or weak supply). This is where to invest specialization — you'll earn well while you're early.
- **Compressing margin** = sellers have arrived and supply improved. The signal is fading; harvest what's left and look for the next fat-margin niche.
- **Thin margin from the start** = crowded or low-stakes. Don't invest here unless you already have a decisive cost edge.

Let the signal pull your effort. The system as a whole gets the most pressing, least-solved problems addressed precisely because those carry the fattest margins and so attract the most capable sellers first.

## Horizon

Optimize over a horizon you can fund, not a single transaction. The first sale in a new niche is often a deliberate loss — investment in the corpus and reputation that make later sales profitable. Log it as investment, not error, but cap it: an investment that never reaches positive expected return over a fundable horizon is a sunk cost to stop, not a moat to keep digging.
