import { MaterialIcon } from './MaterialIcon.jsx';
import { useSupabaseTable } from '../lib/useSupabaseTable.js';

export function ValuationsPage() {
  const { data: companies } = useSupabaseTable('companies', {
    select: 'id,name',
    orderBy: 'name',
    limit: 150,
  });

  return (
    <div className="sec-panel" id="sec-panel-valuations" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Valuations</h1>
            <div className="prod-filters">
              <button type="button" className="prod-filter-pill">
                Filter by Firm
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                Filter by Fund
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
            </div>
          </div>
          <div className="prod-head-right">
            <button type="button" className="prod-btn prod-btn--primary">
              <MaterialIcon name="add" size={16} color="var(--neutral-white)" />
              Create New Valuation
            </button>
            <button type="button" className="prod-iconbtn" aria-label="Pin">
              <MaterialIcon name="push_pin" size={16} color="var(--neutral-500)" />
            </button>
          </div>
        </header>

        <div className="subbar">
          <div className="subbar-left">
            <button type="button" className="subbar-dd">
              Valuation Summary
              <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
            </button>
            <button type="button" className="subbar-plus" aria-label="Add view">
              <MaterialIcon name="add" size={16} color="var(--neutral-600)" />
            </button>
          </div>
          <div className="subbar-right">
            <div className="subbar-meta">
              <span className="subbar-meta-usd">USD</span>
              <span className="subbar-meta-unit">($) Thousands</span>
            </div>
            <button type="button" className="prod-iconbtn" aria-label="Fit screen">
              <MaterialIcon name="fit_screen" size={16} color="var(--neutral-500)" />
            </button>
            <button type="button" className="subbar-action">
              Bulk Actions
              <MaterialIcon name="expand_more" size={16} color="var(--brand-500)" />
            </button>
            <button type="button" className="prod-iconbtn" aria-label="More">
              <MaterialIcon name="more_vert" size={18} color="var(--neutral-500)" />
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-scroll">
            <table className="prod-table valuations-table">
              <thead>
                <tr>
                  <th className="chk" />
                  <th>Company</th>
                  <th>Valuation Date</th>
                  <th>Valuation Status</th>
                  <th>Enterprise Valuation</th>
                  <th>Enterprise Value</th>
                  <th>Equity Value</th>
                  <th>Breakeven Equity Enter...</th>
                  <th>Allocation Method</th>
                  <th>Current Fund Valuation</th>
                  <th>% Change from Previous</th>
                </tr>
              </thead>
              <tbody>
                {(companies.length ? companies.slice(0, 28) : Array.from({ length: 28 }).map((_, i) => ({ id: i, name: '6.4.3 regression' }))).map(
                  (c, idx) => (
                  <tr key={c.id}>
                    <td className="chk">
                      <input type="checkbox" aria-label="Select row" />
                    </td>
                    <td className="linkish">{c.name}</td>
                    <td>11/12/2026</td>
                    <td>
                      <span className="tag tag--green">Published</span>
                    </td>
                    <td>
                      <span className="chip">EV</span>
                    </td>
                    <td>11/11/30</td>
                    <td>11/11/30</td>
                    <td>11/11/30</td>
                    <td>
                      <span className="chip">OPM</span> <span className="chip">CSE</span>
                    </td>
                    <td>11/11/30</td>
                    <td>11/11/30</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td className="chk" />
                  <td>Total</td>
                  <td />
                  <td />
                  <td />
                  <td>11/11/30</td>
                  <td>11/11/30</td>
                  <td>11/11/30</td>
                  <td />
                  <td>11/11/30</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

