import { MaterialIcon } from './MaterialIcon.jsx';

export function CompanyWaterfallsPanel() {
  return (
    <div className="sec-panel" id="sec-panel-waterfall" role="tabpanel" aria-label="Waterfall">
      <div className="content company-waterfall">
        <div className="tm-bar" role="toolbar" aria-label="Tertiary menu">
          <div className="tm-left">
            <div className="tm-chip">
              <span className="tm-chip-text">Summary</span>
              <MaterialIcon name="more_vert" size={16} color="var(--neutral-900)" />
            </div>
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

        <div className="waterfall-grid" aria-label="Waterfall layout">
          <div className="waterfall-table" role="table" aria-label="Valuation summary">
            <div className="wf-row wf-head">
              <div className="wf-cell wf-left">Valuation Summary</div>
              <div className="wf-cell wf-mid">Enterprise Value</div>
            </div>

            <div className="wf-row wf-band">
              <div className="wf-cell wf-left wf-strong">Valuation Approach</div>
              <div className="wf-cell wf-mid wf-empty" />
            </div>

            {[
              ['GPC', '$80,520'],
              ['GT', '$76,714'],
              ['Backsolve Valuation', '$35,755'],
              ['Backsolve Valuation', '$58,147'],
              ['DCF', '$21,780'],
              ['Scenario Equity Value', ''],
              ['Scenario Weighting/Probability', ''],
              ['Weighted Equity Value', ''],
              ['Debt', ''],
              ['Cash', ''],
              ['Weighted Enterprise Value', ''],
            ].map(([label, value], idx) => (
              <div key={`${label}-${idx}`} className={`wf-row${idx % 2 ? '' : ' wf-alt'}`}>
                <div className={`wf-cell wf-left${label.includes('Scenario') || label.includes('Weighted') ? ' wf-strong' : ''}`}>
                  {label}
                </div>
                <div className="wf-cell wf-mid wf-right">{value || '—'}</div>
              </div>
            ))}
          </div>

          <div className="waterfall-empty" aria-label="Allocation scenarios">
            <div className="waterfall-empty-head">
              <span className="waterfall-empty-title">Add Allocation Scenario</span>
              <button type="button" className="tm-iconbtn" aria-label="Add allocation scenario">
                <MaterialIcon name="add" size={16} color="var(--neutral-600)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

