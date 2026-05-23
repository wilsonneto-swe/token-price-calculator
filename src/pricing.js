// ===========================================================================
// PRICING DATA - single source of truth.
// All prices are USD per 1,000,000 tokens (per MTok).
// To add a model: copy a row and edit it. `cacheRead` is optional.
// `show: true` => visible by default; everything else starts hidden
// (toggle any model in the app's "Show / hide models" panel).
// Sources (fetched 2026-05-23):
//   Anthropic: https://platform.claude.com/docs/en/docs/about-claude/pricing
//   Cursor:    https://cursor.com/docs/models-and-pricing
// ===========================================================================

// Date this pricing data was last verified (YYYY-MM-DD).
// The "update-pricing" skill bumps this after re-checking the sources.
export const LAST_UPDATED = '2026-05-23'

export const SOURCES = [
  { label: 'Claude Code (Anthropic API)', url: 'https://platform.claude.com/docs/en/docs/about-claude/pricing' },
  { label: 'Cursor models & pricing', url: 'https://cursor.com/docs/models-and-pricing' },
]

// `context` = max context window in tokens. Claude sizes are from Anthropic
// docs; GPT (400k), Gemini (1M), Grok/Kimi (256k) and Composer (256k) are the
// models' standard windows. Cursor "Max Mode" can extend several of these to
// 1M. `context: null` => varies (e.g. Auto routes to different models).
export const MODELS = [
  // --- Claude Code / Anthropic API (first-party pricing) ----------------
  { tool: 'Claude Code', model: 'Opus 4.7',        input: 5,  output: 25,  cacheRead: 0.5, context: 1_000_000, show: true },
  { tool: 'Claude Code', model: 'Opus 4.7 (Fast)', input: 30, output: 150, cacheRead: 3,   context: 1_000_000, show: true },
  { tool: 'Claude Code', model: 'Sonnet 4.6',      input: 3,  output: 15,  cacheRead: 0.3, context: 1_000_000, show: true },
  { tool: 'Claude Code', model: 'Haiku 4.5',       input: 1,  output: 5,   cacheRead: 0.1, context: 200_000,   show: true },

  // --- Cursor :: Auto ---------------------------------------------------
  { tool: 'Cursor', model: 'Auto',                 input: 1.25, output: 6,   cacheRead: 0.25, context: null },

  // --- Cursor :: Composer (Cursor's own models) -------------------------
  { tool: 'Cursor', model: 'Composer 1',           input: 1.25, output: 10,   cacheRead: 0.125, context: 256_000 },
  { tool: 'Cursor', model: 'Composer 1.5',         input: 3.5,  output: 17.5, cacheRead: 0.35,  context: 256_000 },
  { tool: 'Cursor', model: 'Composer 2',           input: 0.5,  output: 2.5,  cacheRead: 0.2,   context: 256_000 },
  { tool: 'Cursor', model: 'Composer 2.5',         input: 0.5,  output: 2.5,  cacheRead: 0.2,   context: 256_000, show: true },

  // --- Cursor :: Claude -------------------------------------------------
  { tool: 'Cursor', model: 'Opus 4.7',        input: 5,  output: 25,  cacheRead: 0.5, context: 1_000_000, show: true },
  { tool: 'Cursor', model: 'Opus 4.7 (Fast)', input: 30, output: 150, cacheRead: 3,   context: 1_000_000, show: true },
  { tool: 'Cursor', model: 'Opus 4.6',        input: 5,  output: 25,  cacheRead: 0.5, context: 1_000_000, show: true },
  { tool: 'Cursor', model: 'Opus 4.5',        input: 5,  output: 25,  cacheRead: 0.5, context: 200_000 },
  { tool: 'Cursor', model: 'Sonnet 4.6',      input: 3,  output: 15,  cacheRead: 0.3, context: 1_000_000, show: true },
  { tool: 'Cursor', model: 'Sonnet 4.5',      input: 3,  output: 15,  cacheRead: 0.3, context: 200_000 },
  { tool: 'Cursor', model: 'Sonnet 4',        input: 3,  output: 15,  cacheRead: 0.3, context: 200_000 },
  { tool: 'Cursor', model: 'Sonnet 4 (1M)',   input: 6,  output: 22.5, cacheRead: 0.6, context: 1_000_000 },
  { tool: 'Cursor', model: 'Haiku 4.5',       input: 1,  output: 5,   cacheRead: 0.1, context: 200_000 },

  // --- Cursor :: OpenAI GPT ---------------------------------------------
  { tool: 'Cursor', model: 'GPT-5',             input: 1.25, output: 10,  cacheRead: 0.125, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5 Fast',        input: 2.5,  output: 20,  cacheRead: 0.25,  context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5 Mini',        input: 0.25, output: 2,   cacheRead: 0.025, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5-Codex',       input: 1.25, output: 10,  cacheRead: 0.125, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.1 Codex',     input: 1.25, output: 10,  cacheRead: 0.125, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.1 Codex Max', input: 1.25, output: 10,  cacheRead: 0.125, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.1 Codex Mini', input: 0.25, output: 2,  cacheRead: 0.025, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.2',           input: 1.75, output: 14,  cacheRead: 0.175, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.2 Codex',     input: 1.75, output: 14,  cacheRead: 0.175, context: 400_000, show: true },
  { tool: 'Cursor', model: 'GPT-5.3 Codex',     input: 1.75, output: 14,  cacheRead: 0.175, context: 400_000, show: true },
  { tool: 'Cursor', model: 'GPT-5.4',           input: 2.5,  output: 15,  cacheRead: 0.25,  context: 400_000, show: true },
  { tool: 'Cursor', model: 'GPT-5.4 Mini',      input: 0.75, output: 4.5, cacheRead: 0.075, context: 400_000, show: true },
  { tool: 'Cursor', model: 'GPT-5.4 Nano',      input: 0.2,  output: 1.25, cacheRead: 0.02, context: 400_000 },
  { tool: 'Cursor', model: 'GPT-5.5',           input: 5,    output: 30,  cacheRead: 0.5,   context: 400_000, show: true },

  // --- Cursor :: Google Gemini ------------------------------------------
  { tool: 'Cursor', model: 'Gemini 2.5 Flash',  input: 0.3, output: 2.5, cacheRead: 0.03, context: 1_000_000 },
  { tool: 'Cursor', model: 'Gemini 3 Flash',    input: 0.5, output: 3,   cacheRead: 0.05, context: 1_000_000 },
  { tool: 'Cursor', model: 'Gemini 3 Pro',      input: 2,   output: 12,  cacheRead: 0.2,  context: 1_000_000, show: true },
  { tool: 'Cursor', model: 'Gemini 3.1 Pro',    input: 2,   output: 12,  cacheRead: 0.2,  context: 1_000_000, show: true },

  // --- Cursor :: Other --------------------------------------------------
  { tool: 'Cursor', model: 'Grok 4.20',  input: 2,    output: 6,   cacheRead: 0.2, context: 256_000 },
  { tool: 'Cursor', model: 'Grok 4.3',   input: 1.25, output: 2.5, cacheRead: 0.2, context: 256_000, show: true },
  { tool: 'Cursor', model: 'Kimi K2.5',  input: 0.6,  output: 3,   cacheRead: 0.1, context: 256_000, show: true },
]
