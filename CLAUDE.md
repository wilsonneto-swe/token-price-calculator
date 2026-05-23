# tokens-price

A single-page Vite + React app that calculates expected USD cost for a given token
volume across the models available in **Claude Code (Anthropic API)** and **Cursor**.

## What it does

- User enters input and output token counts in **thousands (k)**.
- A live table shows, per model: input $/M, output $/M, computed input cost, output cost, and total.
- **Important pricing semantics:** the per-token rates are the *extra-usage / on-demand (overage)*
  rates - what you pay after a plan's included usage runs out. They equal the standard API rates.
  Subscription plan fees (Claude Code Pro/Max, Cursor Pro/Pro+/Ultra) are flat and separate; those
  tiers are listed via `PLANS` in `src/pricing.js`. Verified 2026-05-23 against claude.com/pricing
  and cursor.com/pricing.
- Results are filterable by tool and sortable by any cost column or name.
- A collapsible **"Show / hide models"** panel toggles individual models. A curated subset
  is visible by default; the rest start hidden.

## Structure

- `src/pricing.js` - **single source of truth** for all pricing. A flat `MODELS` array where
  each entry is `{ tool, model, input, output, cacheRead?, show? }`. Prices are USD per 1M tokens.
  `show: true` marks a model as visible by default. `SOURCES` holds the pricing-page links.
- `src/App.jsx` - the calculator UI and all derived/sort/filter logic.
- `src/index.css` - styling, following the design system in `DESIGN.md`.
- `src/main.jsx` - React entry point.

## Adding / updating a model

Edit `src/pricing.js` only: copy a row in the `MODELS` array and adjust its values. Add
`show: true` to surface it by default. No other file needs to change.

To re-verify all prices/context against the official docs, run the **`update-pricing`** skill
(`.claude/skills/update-pricing/`). It lists every page to check and bumps `LAST_UPDATED`
(rendered in the page footer) when done.

## Pricing sources (fetched 2026-05-23)

- Claude Code / Anthropic API: https://platform.claude.com/docs/en/docs/about-claude/pricing
- Cursor: https://cursor.com/docs/models-and-pricing

## Dev

```
npm install
npm run dev      # http://localhost:5173
```

## Design

UI follows `DESIGN.md` (Cursor's design system). See `AGENTS.md`.
