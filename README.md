# Token Price Calculator for Claude Code and Cursor

Compare per-token prices and context windows across **Claude Code** (Anthropic API) and **Cursor**
models, and estimate the cost of any token volume in seconds. A fast, single-page calculator for
developers deciding which AI coding model is cheapest for their workload.

> Tokenomics: see exactly what each model costs per million tokens, what its context window is, and
> how much a real session would run.

## Features

- **Cost estimate by model** for any input/output token volume (entered in thousands, "k").
- **Price-per-million reference table** with input rate, output rate, and context window per model.
- **Horizontal bar chart** comparing total estimated cost across models, split into input vs output.
- **Show / hide models**, sort by cost or name, and filter by tool.
- **Two languages**: English (en-US) and Brazilian Portuguese (pt-BR), auto-detected from the browser.
- **Single editable data file** (`src/pricing.js`) holds every model, price, and context size.

## What the prices mean

The per-token rates are the **extra-usage / on-demand (overage) rates**: what you pay once a
subscription plan's included usage runs out. They match the standard API rates. Subscription plan
fees (Claude Code Pro/Max, Cursor Pro/Pro+/Ultra) are flat and separate.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- No backend; all pricing data is static and lives in `src/pricing.js`.

## Updating prices

All models, prices, and context windows live in `src/pricing.js`. To add a model, copy a row in the
`MODELS` array and edit its values; set `show: true` to make it visible by default.

To re-verify everything against the official sources, run the `update-pricing` skill in
`.claude/skills/update-pricing/`. It lists every page to check and updates the "last verified" date
shown in the page footer.

### Pricing sources

- Claude Code / Anthropic API: https://platform.claude.com/docs/en/docs/about-claude/pricing
- Cursor: https://cursor.com/docs/models-and-pricing

## Keywords

Claude Code pricing, Cursor pricing, token price calculator, LLM cost calculator, AI model cost
comparison, price per million tokens, context window comparison, Opus, Sonnet, Haiku, GPT-5, Gemini.

## License

MIT
