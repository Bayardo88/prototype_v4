import { MaterialIcon } from './MaterialIcon.jsx';
import { useSupabaseTable } from '../lib/useSupabaseTable.js';

/**
 * Intelligence — Figma Navigation-V4, node 111-18243 (Dev Mode).
 * This is the default company workspace landing for the Intelligence product area.
 */
export function IntelligencePage() {
  const { data: firms } = useSupabaseTable('firms', { select: 'id,name', orderBy: 'name', limit: 150 });
  const { data: funds } = useSupabaseTable('funds', { select: 'id,name', orderBy: 'name', limit: 150 });
  const { data: companies } = useSupabaseTable('companies', { select: 'id,name', orderBy: 'name', limit: 150 });

  return (
    <div className="sec-panel" id="sec-panel-intelligence" role="tabpanel">
      <div className="content intel-page">
        <div className="intel-topbar">
          <div className="intel-topbar-left">
            <h1 className="intel-page-title">Intelligence</h1>
            <div className="intel-filters">
              <button type="button" className="intel-filter-pill">
                Filter by Firm
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="intel-filter-pill">
                Filter by Fund
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
            </div>
          </div>
        </div>

        <section className="intel-ai-card" aria-label="AI helper">
          <div className="intel-ai-title">We value your time. Let our Ai speed your process</div>
          <div className="intel-ai-input">
            <span className="intel-ai-icon" aria-hidden="true">
              <MaterialIcon name="auto_awesome" size={16} fill={1} color="var(--color-ai)" />
            </span>
            <input className="intel-ai-text" placeholder="How can I help you?" aria-label="AI prompt" />
            <span className="intel-ai-hint">Hit Return</span>
          </div>
          <div className="intel-ai-suggestions" aria-label="AI suggestions">
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
          </div>
        </section>

        <section className="intel-metrics-row" aria-label="Fund metrics">
          {(funds.length ? funds.slice(0, 5) : Array.from({ length: 5 }).map((_, i) => ({ id: i, name: 'Fund Name Value' }))).map((f, idx) => (
            <div key={idx} className="intel-metric-card">
              <div className="intel-metric-ico" aria-hidden="true" />
              <div className="intel-metric-body">
                <div className="intel-metric-label">{f.name}</div>
                <div className="intel-metric-value">$2,350,404</div>
              </div>
            </div>
          ))}
        </section>

        <section className="intel-table-card" aria-label="Portfolio table">
          <div className="intel-table-toolbar">
            <div className="intel-toolbar-left">
              <button type="button" className="intel-dd">
                Summary
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="intel-iconbtn" aria-label="Info">
                <MaterialIcon name="info" size={16} color="var(--neutral-500)" />
              </button>
            </div>
            <div className="intel-toolbar-right">
              <div className="intel-currency">
                <span className="intel-cur-usd">USD</span>
                <span className="intel-cur-thousands">($) Thousands</span>
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </div>
              <button type="button" className="intel-iconbtn" aria-label="Fit screen">
                <MaterialIcon name="fit_screen" size={16} color="var(--neutral-500)" />
              </button>
              <button type="button" className="intel-save">
                Save
                <MaterialIcon name="expand_more" size={16} color="var(--neutral-white)" />
              </button>
              <button type="button" className="intel-iconbtn" aria-label="More">
                <MaterialIcon name="more_vert" size={18} color="var(--neutral-500)" />
              </button>
            </div>
          </div>

          <div className="intel-table-scroll">
            <table className="intel-table2">
              <thead>
                <tr>
                  <th>Firm Portfolio Summary</th>
                  <th>All Funds</th>
                  <th>Valuation Date</th>
                  <th>Initial Investment</th>
                  <th>Most Recent Inv...</th>
                  <th>FDO %</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th className="intel-addcol">Add Column</th>
                </tr>
              </thead>
              <tbody>
                {(companies.length ? companies.slice(0, 24) : Array.from({ length: 24 }).map((_, i) => ({ id: i, name: 'Company' }))).map(
                  (c, idx) => (
                    <tr key={c.id}>
                      <td className="intel-first">{c.name}</td>
                      <td>{funds[idx % (funds.length || 1)]?.name ?? 'All Funds'}</td>
                      <td>11/3/2025</td>
                      <td>11/3/2025</td>
                      <td>11/3/2025</td>
                      <td>{((idx % 40) + 0.8).toFixed(1)}%</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="intel-addcol">
                        <MaterialIcon name="add" size={16} color="var(--neutral-500)" />
                      </td>
                    </tr>
                  )
                )}
                <tr className="intel-total">
                  <td className="intel-first">Total</td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td className="num">$13,200,000</td>
                  <td className="num">$13,250,000</td>
                  <td className="num">$13,300,000</td>
                  <td className="num">$12,900,000</td>
                  <td className="num">$13,450,000</td>
                  <td className="intel-addcol" />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

