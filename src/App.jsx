import { useMemo, useState } from 'react'
import { MODELS, SOURCES, LAST_UPDATED } from './pricing.js'
import { STRINGS, LOCALES, detectLocale, makePriceFormat, formatContext } from './i18n.js'
import claudeLogo from './assets/claude.svg'
import cursorLogo from './assets/cursor.svg'

const LOGOS = { 'Claude Code': claudeLogo, Cursor: cursorLogo }

const keyOf = (m) => m.tool + '::' + m.model

export default function App() {
  const [locale, setLocale] = useState(detectLocale)
  const [inputK, setInputK] = useState(100)
  const [outputK, setOutputK] = useState(20)
  const [tool, setTool] = useState('All')
  const [sortKey, setSortKey] = useState('total')
  const [showFilter, setShowFilter] = useState(false)
  const [hidden, setHidden] = useState(
    () => new Set(MODELS.filter((m) => !m.show).map(keyOf)),
  )

  const t = STRINGS[locale]
  const fmtPrice = useMemo(() => makePriceFormat(locale), [locale])

  const tools = useMemo(() => ['All', ...new Set(MODELS.map((m) => m.tool))], [])

  const toggleHidden = (k) =>
    setHidden((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })

  const rows = useMemo(() => {
    const inTok = (Number(inputK) || 0) * 1000
    const outTok = (Number(outputK) || 0) * 1000
    return MODELS.filter((m) => (tool === 'All' || m.tool === tool) && !hidden.has(keyOf(m)))
      .map((m) => {
        const inputCost = (inTok / 1_000_000) * m.input
        const outputCost = (outTok / 1_000_000) * m.output
        return { ...m, inputCost, outputCost, total: inputCost + outputCost }
      })
      .sort((a, b) => {
        if (sortKey === 'model') return a.model.localeCompare(b.model)
        if (sortKey === 'tool') return a.tool.localeCompare(b.tool) || a.total - b.total
        return a[sortKey] - b[sortKey]
      })
  }, [inputK, outputK, tool, sortKey, hidden])

  const grouped = useMemo(() => {
    const g = {}
    for (const m of MODELS) (g[m.tool] ||= []).push(m)
    return g
  }, [])

  const maxTotal = useMemo(() => Math.max(0, ...rows.map((r) => r.total)), [rows])

  return (
    <div className="wrap">
      <div className="topbar">
        <h1>{t.title}</h1>
        <div className="lang">
          {LOCALES.map((l) => (
            <button
              key={l}
              className={'lang-btn' + (l === locale ? ' active' : '')}
              onClick={() => setLocale(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="sub">
        <strong>{t.subStrong}</strong>
        {t.subRest}
        {t.sources}{' '}
        {SOURCES.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ' · '}
            <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
          </span>
        ))}
      </p>

      <div className="controls">
        <label>
          {t.inputTokens}
          <input type="number" min="0" value={inputK} onChange={(e) => setInputK(e.target.value)} />
        </label>
        <label>
          {t.outputTokens}
          <input type="number" min="0" value={outputK} onChange={(e) => setOutputK(e.target.value)} />
        </label>
        <label>
          {t.tool}
          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            {tools.map((tv) => (
              <option key={tv} value={tv}>{tv === 'All' ? t.allTools : tv}</option>
            ))}
          </select>
        </label>
        <label>
          {t.sortBy}
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="total">{t.sortTotal}</option>
            <option value="inputCost">{t.sortInput}</option>
            <option value="outputCost">{t.sortOutput}</option>
            <option value="tool">{t.sortTool}</option>
            <option value="model">{t.sortModel}</option>
          </select>
        </label>
      </div>

      <div className="filter-bar">
        <button className="filter-toggle" onClick={() => setShowFilter((s) => !s)}>
          {showFilter ? '▾' : '▸'} {t.showHide}
          {hidden.size > 0 && <span className="badge">{t.hidden(hidden.size)}</span>}
        </button>
        <button className="link" onClick={() => setHidden(new Set())}>
          {t.showAll}
        </button>
        <button
          className="link"
          onClick={() => setHidden(new Set(MODELS.filter((m) => !m.show).map(keyOf)))}
        >
          {t.resetDefault}
        </button>
      </div>

      {showFilter && (
        <div className="filter-panel">
          {Object.entries(grouped).map(([tv, models]) => (
            <div key={tv} className="filter-group">
              <div className="filter-group-title">{tv}</div>
              {models.map((m) => {
                const k = keyOf(m)
                return (
                  <label key={k} className="check">
                    <input
                      type="checkbox"
                      checked={!hidden.has(k)}
                      onChange={() => toggleHidden(k)}
                    />
                    {m.model}
                  </label>
                )
              })}
            </div>
          ))}
        </div>
      )}

      <div className="chart-card">
        <div className="chart-head">
          <h2>{t.chartTitle}</h2>
          <div className="legend">
            <span className="legend-item"><i className="swatch seg-in" />{t.legendInput}</span>
            <span className="legend-item"><i className="swatch seg-out" />{t.legendOutput}</span>
          </div>
        </div>
        <div className="chart">
          {rows.map((r) => {
            const width = maxTotal ? (r.total / maxTotal) * 100 : 0
            const inPct = r.total ? (r.inputCost / r.total) * 100 : 0
            return (
              <div className="bar-row" key={r.tool + r.model}>
                <div className="bar-label">
                  <img className="logo" src={LOGOS[r.tool]} alt={r.tool} title={r.tool} />
                  {r.model}
                </div>
                <div className="bar-track">
                  <div className="bar" style={{ width: width + '%' }}>
                    <div className="seg seg-in" style={{ width: inPct + '%' }} />
                    <div className="seg seg-out" style={{ flex: 1 }} />
                  </div>
                </div>
                <div className="bar-value num">{fmtPrice(r.total)}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="prices-head">
        <h2>{t.pricesTitle}</h2>
        <span className="prices-note">{t.pricesNote}</span>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>{t.thTool}</th>
              <th>{t.thModel}</th>
              <th className="num">{t.thIn}</th>
              <th className="num">{t.thOut}</th>
              <th className="num">{t.thContext}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tool + r.model}>
                <td>
                  <span className="tag">
                    <img className="logo" src={LOGOS[r.tool]} alt="" />
                    {r.tool}
                  </span>
                </td>
                <td className="model-name">{r.model}</td>
                <td className="num">{fmtPrice(r.input)}</td>
                <td className="num">{fmtPrice(r.output)}</td>
                <td className="num muted">{formatContext(r.context, t.varies)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a
        className="ad"
        href="https://cursor.com/referral?code=E4HRF4YHPNKS"
        target="_blank"
        rel="noreferrer"
      >
        <span className="ad-tag">{t.adTag}</span>
        <span className="ad-text">{t.adText}</span>
        <span className="ad-cta">{t.adCta}</span>
      </a>

      <footer className="page-footer">
        {t.lastUpdated}: {LAST_UPDATED}
      </footer>
    </div>
  )
}
