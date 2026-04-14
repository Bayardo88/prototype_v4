import { MaterialIcon } from './MaterialIcon.jsx';
import { useAppData } from '../lib/appData.js';

export function WaterfallsPage() {
  const { selectedFirm, selectedFund, companies } = useAppData();

  return (
    <div className="sec-panel" id="sec-panel-waterfalls" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Waterfalls</h1>
            <div className="prod-filters">
              <button type="button" className="prod-filter-pill">
                {selectedFirm?.name ?? 'Firm'}
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                {selectedFund?.name ?? 'Fund'}
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
            </div>
          </div>
          <div className="prod-head-right">
            <button type="button" className="prod-btn prod-btn--primary">
              <MaterialIcon name="add" size={16} color="var(--neutral-white)" />
              Create Waterfalls
            </button>
            <button type="button" className="prod-iconbtn" aria-label="Pin">
              <MaterialIcon name="push_pin" size={16} color="var(--neutral-500)" />
            </button>
          </div>
        </header>

        <div className="subbar">
          <div className="subbar-left">
            <button type="button" className="subbar-dd">
              Waterfalls Summary
              <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
            </button>
            <button type="button" className="subbar-plus" aria-label="Add view">
              <MaterialIcon name="add" size={16} color="var(--neutral-600)" />
            </button>
          </div>
          <div className="subbar-right">
            <button type="button" className="prod-iconbtn" aria-label="Fit screen">
              <MaterialIcon name="fit_screen" size={16} color="var(--neutral-500)" />
            </button>
            <button type="button" className="prod-iconbtn" aria-label="Filter">
              <MaterialIcon name="filter_list" size={16} color="var(--neutral-500)" />
            </button>
            <button type="button" className="subbar-save">
              Save Notes &amp; Documents
              <MaterialIcon name="expand_more" size={16} color="var(--neutral-white)" />
            </button>
            <button type="button" className="prod-iconbtn" aria-label="More">
              <MaterialIcon name="more_vert" size={18} color="var(--neutral-500)" />
            </button>
          </div>
        </div>

        <div className="scenario-banner" role="status" aria-label="Scenario mode banner">
          <MaterialIcon name="bolt" size={16} fill={1} color="#b45309" />
          <span className="scenario-strong">Scenario Mode Active</span>
          <span className="scenario-text">
            Enterprise Values have been overridden to simulate returns. This values are not saved.
          </span>
          <button type="button" className="scenario-reset">
            Reset Scenario
          </button>
        </div>

        <div className="table-wrap">
          <div className="table-scroll">
            <table className="prod-table">
              <thead>
                <tr>
                  <th>Firm Portfolio Summary</th>
                  <th>{selectedFund?.name ?? 'All Funds'}</th>
                  <th>Enterpris...</th>
                  <th>Unrealiz...</th>
                  <th>MOIC</th>
                  <th>Gross IRR</th>
                  <th className="addcol">Add Column</th>
                </tr>
              </thead>
              <tbody>
                {(companies.length ? companies.slice(0, 18) : Array.from({ length: 18 }).map((_, i) => ({ id: i, name: 'Company' }))).map(
                  (c, idx) => (
                  <tr key={c.id}>
                    <td className="linkish">{c.name}</td>
                    <td>{selectedFund?.name ?? 'All Funds'}</td>
                    <td>11/3/2025</td>
                    <td>11/3/2025</td>
                    <td>1.23x</td>
                    <td>{(idx % 33) + 0.8}%</td>
                    <td className="addcol">
                      <MaterialIcon name="add" size={16} color="var(--neutral-500)" />
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>Total</td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td className="addcol" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

