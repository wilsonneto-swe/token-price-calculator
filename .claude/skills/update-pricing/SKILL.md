---
name: update-pricing
description: Re-verify and update the token pricing data in this project. Use when the user asks to refresh, update, or check the model prices/context sizes, or wants to confirm the data is current. Fetches the official Anthropic and Cursor pages, reconciles src/pricing.js, and bumps the last-verified date.
---

# Update pricing data

All pricing for this app lives in **`src/pricing.js`** (the `MODELS` array). Each entry:

```js
{ tool, model, input, output, cacheRead, context, show? }
```

- `input` / `output` / `cacheRead`: USD per 1,000,000 tokens.
- `context`: max context window in tokens (e.g. `400_000`, `1_000_000`). `null` => varies (Auto).
- `show: true`: visible by default in the UI. Leave the default-shown set alone unless the user asks to change it.

## Pages to check

Fetch each and compare against the current `MODELS` rows.

### Claude Code (Anthropic API) — prices + context

1. **Prices** (input, output, cache read): https://platform.claude.com/docs/en/docs/about-claude/pricing
   - Read the "Model pricing" table. Base Input -> `input`, Output Tokens -> `output`, "Cache Hits & Refreshes" -> `cacheRead`.
   - Note: `Opus 4.7 (Fast)` uses the **Fast mode** pricing on the same page ($30 in / $150 out).
2. **Context windows**: https://platform.claude.com/docs/en/docs/about-claude/models/overview
   - Read the "Context window" row. Opus 4.7 / Sonnet 4.6 = 1M; Haiku 4.5 = 200k.

### Cursor — prices + context

3. **Prices** (all Cursor rows: Auto, Composer, Claude-via-Cursor, GPT, Gemini, Grok, Kimi):
   https://cursor.com/docs/models-and-pricing
   - The table has Input $/M, Cache Write $/M, Cache Read $/M, Output $/M. Use Input -> `input`,
     Output -> `output`, Cache Read -> `cacheRead`.
4. **Context windows + long-context thresholds** (per-model pages):
   `https://cursor.com/docs/models/<slug>` — e.g. `gpt-5-5`, `gpt-5`, `gemini-3-pro`, `grok-4-3`,
   `kimi-k2-5`, `composer-2-5`.
   - The Cursor pricing table has **no context column**, and individual pages often don't expose the
     raw context number to a plain fetch. What is usually visible is a **long-context threshold**
     (e.g. "input exceeds 272k tokens"), which implies a 400k-class window for the GPT-5 family.
   - When Cursor doesn't publish a context number, fall back to the **provider's published spec**
     (OpenAI GPT-5 = 400k, Google Gemini = 1M, xAI Grok = 256k, Moonshot Kimi = 256k). Cursor's own
     **Composer** context is not published — keep the existing best-effort value and flag it as
     unverified to the user.

### Plan tiers (context only, not in MODELS)

The README/CLAUDE.md states the MODELS rates are **extra-usage / on-demand (overage) rates**, not the
flat plan fee. If the user asks about plans, confirm tiers at:
- Claude: https://claude.com/pricing
- Cursor: https://cursor.com/pricing

## Procedure

1. Read `src/pricing.js` to see the current values.
2. Fetch the pages above (batch the fetches in parallel where possible).
3. For every model, compare `input`, `output`, `cacheRead`, and `context`. Edit only the values that
   changed. Add new models (copy a row) or remove retired ones as needed.
4. **Report a diff** to the user: list each changed field as `old -> new`, and call out anything you
   could NOT verify from an official page (especially Cursor context sizes).
5. **Bump the date**: set `LAST_UPDATED` in `src/pricing.js` to today's date in `YYYY-MM-DD` format.
   This date renders in the page footer ("Pricing last verified: <date>"). Also update the
   `// Sources (fetched YYYY-MM-DD)` comment at the top of the file to the same date.
6. Confirm the app still compiles (the Vite dev server hot-reloads; if it isn't running, start it
   with `npm run dev` and check `src/pricing.js` returns HTTP 200).

## Notes

- Do not invent precise numbers. If a value can't be confirmed, keep the current one and tell the user
  it is unverified rather than guessing a new figure.
- Keep model names normalized: model name first, version after (e.g. `Opus 4.7`, not `4.7 Opus`).
  Cursor's Claude rows omit the "Claude" prefix.
- Prices are per 1M tokens; the app rounds displayed values to 2 decimals.
