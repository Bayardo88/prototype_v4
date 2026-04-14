import { MaterialIcon } from './MaterialIcon.jsx';

/**
 * Intelligence — Figma Navigation-V4, node 111-18243 (Dev Mode).
 * This is the default company workspace landing for the Intelligence product area.
 */
export function IntelligencePage() {
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
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="intel-metric-card">
              <div className="intel-metric-ico" aria-hidden="true" />
              <div className="intel-metric-body">
                <div className="intel-metric-label">Fund Name Value</div>
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
                {[
                  ['6.4.3 regression', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '30.0%', '$9,000,000'],
                  ['ARAMCO Company', 'Fund XIII', '11/3/2025', '11/3/2025', '11/3/2025', '3.8%', '$17,000,000'],
                  ['Airbus SAS', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '0.8%', '$2'],
                  ['Autopopulate Volatility Company', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '24.6%', '$85,000,000'],
                  ['Backsolve Calculation', 'Property and Stakes 1', '11/3/2025', '11/3/2025', '11/3/2025', '13.0%', '$14,500,000'],
                  ['Berkshire Hathaway', 'Property and Stakes 1', '11/3/2025', '11/3/2025', '11/3/2025', '32.3%', '$54,000,000'],
                  ['Blackstone, Inc.', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '21.5%', '$95,000,000'],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="intel-first">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                    <td>{r[5]}</td>
                    <td className="num">{r[6]}</td>
                    <td className="num">{r[6]}</td>
                    <td className="num">{r[6]}</td>
                    <td className="num">{r[6]}</td>
                    <td className="num">{r[6]}</td>
                    <td className="intel-addcol">
                      <MaterialIcon name="add" size={16} color="var(--neutral-500)" />
                    </td>
                  </tr>
                ))}
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

