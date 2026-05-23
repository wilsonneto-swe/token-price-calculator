// i18n: en-US (default) and pt-BR. Browser language is detected on load.
// Add a language by adding an entry with the same keys.

export const STRINGS = {
  'en-US': {
    title: 'Token Price Calculator',
    subStrong: 'Extra-usage / on-demand rates',
    subRest:
      ' per token (USD per 1M tokens · May 2026): what you pay once a plan’s included usage runs out. Plan fees are flat and separate. Enter token counts in thousands (k). ',
    sources: 'Sources:',
    adTag: 'Referral',
    adText: 'Get 50% off your first month of Cursor, any plan.',
    adCta: 'Claim offer ↗',
    inputTokens: 'Input tokens (k)',
    outputTokens: 'Output tokens (k)',
    tool: 'Tool',
    sortBy: 'Sort by',
    allTools: 'All',
    sortTotal: 'Total cost',
    sortInput: 'Input cost',
    sortOutput: 'Output cost',
    sortTool: 'Tool',
    sortModel: 'Model name',
    showHide: 'Show / hide models',
    hidden: (n) => `${n} hidden`,
    showAll: 'Show all',
    resetDefault: 'Reset to default',
    chartTitle: 'Estimated cost by model (for the tokens above)',
    legendInput: 'Input',
    legendOutput: 'Output',
    pricesTitle: 'Price per model',
    pricesNote: 'Rates per 1M tokens. Context = max window.',
    thTool: 'Tool',
    thModel: 'Model',
    thIn: 'In $/M',
    thOut: 'Out $/M',
    thContext: 'Context',
    varies: 'varies',
    lastUpdated: 'Pricing last verified',
  },
  'pt-BR': {
    title: 'Calculadora de Preço de Tokens',
    subStrong: 'Tarifas de uso extra / sob demanda',
    subRest:
      ' por token (USD por 1M de tokens · maio de 2026): o que você paga quando o uso incluído no plano acaba. As mensalidades dos planos são fixas e separadas. Informe a quantidade de tokens em milhares (k). ',
    sources: 'Fontes:',
    adTag: 'Indicação',
    adText: 'Ganhe 50% de desconto no primeiro mês do Cursor, em qualquer plano.',
    adCta: 'Resgatar oferta ↗',
    inputTokens: 'Tokens de entrada (k)',
    outputTokens: 'Tokens de saída (k)',
    tool: 'Ferramenta',
    sortBy: 'Ordenar por',
    allTools: 'Todas',
    sortTotal: 'Custo total',
    sortInput: 'Custo de entrada',
    sortOutput: 'Custo de saída',
    sortTool: 'Ferramenta',
    sortModel: 'Nome do modelo',
    showHide: 'Mostrar / ocultar modelos',
    hidden: (n) => `${n} ${n === 1 ? 'oculto' : 'ocultos'}`,
    showAll: 'Mostrar todos',
    resetDefault: 'Restaurar padrão',
    chartTitle: 'Custo estimado por modelo (para os tokens acima)',
    legendInput: 'Entrada',
    legendOutput: 'Saída',
    pricesTitle: 'Preço por modelo',
    pricesNote: 'Tarifas por 1M de tokens. Contexto = janela máxima.',
    thTool: 'Ferramenta',
    thModel: 'Modelo',
    thIn: 'Ent. $/M',
    thOut: 'Saí. $/M',
    thContext: 'Contexto',
    varies: 'varia',
    lastUpdated: 'Preços verificados em',
  },
}

export const LOCALES = Object.keys(STRINGS)

export function detectLocale() {
  const lang = (typeof navigator !== 'undefined' && navigator.language) || 'en-US'
  return lang.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US'
}

export function formatContext(n, variesLabel) {
  if (!n) return variesLabel
  if (n >= 1_000_000) return n / 1_000_000 + 'M'
  return n / 1_000 + 'K'
}

// All USD amounts: exactly 2 decimals.
export function makePriceFormat(locale) {
  return (n) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n)
}
