import { MaterialIcon } from './MaterialIcon.jsx';

export function WaterfallsPage() {
  return (
    <div className="sec-panel" id="sec-panel-waterfalls" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Waterfalls</h1>
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
                  <th>All Funds</th>
                  <th>Enterpris...</th>
                  <th>Unrealiz...</th>
                  <th>MOIC</th>
                  <th>Gross IRR</th>
                  <th className="addcol">Add Column</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['6.4.3 regression', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '30.0%'],
                  ['ARAMCO Company', 'Fund XIII', '11/3/2025', '11/3/2025', '11/3/2025', '3.8%'],
                  ['Airbus SAS', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '0.8%'],
                  ['Autopopulate Volatility Company', 'Berkshire Hathaway', '11/3/2025', '11/3/2025', '11/3/2025', '24.6%'],
                  ['Backsolve Calculation', 'Property and Stakes 1', '11/3/2025', '11/3/2025', '11/3/2025', '13.0%'],
                  ['Berkshire Hathaway', 'Property and Stakes 1', '11/3/2025', '11/3/2025', '11/3/2025', '32.3%'],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="linkish">{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>{r[3]}</td>
                    <td>{r[4]}</td>
                    <td>{r[5]}</td>
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

