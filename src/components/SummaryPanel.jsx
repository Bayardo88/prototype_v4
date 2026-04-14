import { useAppData } from '../lib/appData.js';
import { MaterialIcon } from './MaterialIcon.jsx';

export function SummaryPanel() {
  const { selectedFund, companies } = useAppData();
  const selectedFundName = selectedFund?.name ?? 'All Funds';
  return (
    <div
      className="sec-panel"
      id="sec-panel-summary"
      role="tabpanel"
      aria-labelledby="sec-tab-summary"
    >
      <div className="content company-summary">
        <div className="tm-bar" role="toolbar" aria-label="Tertiary menu">
          <div className="tm-left">
            <div className="tm-chip">
              <span className="tm-chip-text">Summary</span>
              <MaterialIcon name="more_vert" size={16} color="var(--neutral-900)" />
            </div>
            <button type="button" className="tm-tab" aria-label="Company Overview">
              Company Overview
            </button>
            <button type="button" className="tm-tab" aria-label="At a Glance">
              At a Glance
            </button>
            <button type="button" className="tm-iconbtn" aria-label="Add view">
              <MaterialIcon name="add" size={16} color="var(--neutral-600)" />
            </button>
          </div>

          <div className="tm-right">
            <button className="ai-btn" type="button" aria-label="AI">
              <img
                className="ai-btn-icon"
                src="https://www.figma.com/api/mcp/asset/06b36e9e-8896-4db1-9b28-4ae63dedb08e"
                alt=""
                aria-hidden="true"
              />
            </button>

            <div className="tm-currency" aria-label="Currency">
              <div className="tm-cur-usd">USD</div>
              <div className="tm-cur-thousands">($) Thousands</div>
            </div>

            <button type="button" className="tm-iconbtn" aria-label="Fit screen">
              <MaterialIcon name="fit_screen" size={16} color="var(--neutral-500)" />
            </button>
            <button type="button" className="tm-iconbtn" aria-label="Filter">
              <MaterialIcon name="filter_list" size={16} color="var(--neutral-500)" />
            </button>

            <button type="button" className="tm-save" aria-label="Save">
              <span className="tm-save-text">Save</span>
              <MaterialIcon name="expand_more" size={16} color="var(--neutral-white)" />
            </button>

            <button type="button" className="tm-meatball" aria-label="More">
              <MaterialIcon name="more_vert" size={20} color="var(--neutral-500)" />
            </button>
          </div>
        </div>

        <div className="intel-table-scroll company-summary-scroll">
          <table className="intel-table2 company-summary-table" aria-label="Summary table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Valuation Date</th>
                <th>{selectedFundName}</th>
                <th>Invested Capital</th>
                <th>Invested Capital</th>
                <th>Invested Capital</th>
                <th className="intel-addcol">Add Allocation Scenario</th>
              </tr>
            </thead>
            <tbody>
              {(companies.length ? companies.slice(0, 40) : Array.from({ length: 40 }).map((_, i) => ({ id: i, name: 'Company' }))).map(
                (c, idx) => (
                  <tr key={c.id}>
                    <td className="intel-first">{c.name}</td>
                    <td>11/3/2025</td>
                    <td className="num">$9,000,000</td>
                    <td className="num">$9,000,000</td>
                    <td className="num">$9,000,000</td>
                    <td className="num">$9,000,000</td>
                    <td className="intel-addcol">{idx === 0 ? '+' : ''}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
