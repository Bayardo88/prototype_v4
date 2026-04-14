import { MaterialIcon } from './MaterialIcon.jsx';

const SECONDARY_TABS = [
  { id: 'summary', label: 'Summary', tabId: 'sec-tab-summary' },
  { id: 'financials', label: 'Financials' },
  { id: 'cap-table', label: 'Cap Table' },
  { id: 'valuations', label: 'Valuations' },
  { id: 'waterfall', label: 'Waterfall' },
];

export function CompanyBar({ activeSecondary, onSecondaryChange }) {
  function onKeyDown(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSecondaryChange(id);
    }
  }

  return (
    <div
      className="company-bar"
      id="company-bar-root"
      data-secondary={activeSecondary}
    >
      <div className="cb-left">
        <span className="company-name">Apple Inc.</span>
        <div className="fund-filter">
          <span className="fund-filter-text">Filter by Fund</span>
          <MaterialIcon name="expand_more" size={14} color="var(--neutral-700)" />
        </div>
        <div className="draft-chip">
          <span className="draft-chip-text">Draft</span>
        </div>
        <nav className="sec-tabs" role="tablist" aria-label="Company sections">
          {SECONDARY_TABS.map((tab) => (
            <div
              key={tab.id}
              id={tab.tabId}
              className={`sec-tab${activeSecondary === tab.id ? ' active' : ''}`}
              role="tab"
              tabIndex={0}
              data-sec={tab.id}
              aria-selected={activeSecondary === tab.id}
              onClick={() => onSecondaryChange(tab.id)}
              onKeyDown={(e) => onKeyDown(e, tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </nav>
      </div>
      <div className="cb-right">
        <div className="info-lbl">
          <span className="info-lbl-name">Equity Value</span>
          <span className="info-lbl-val">$34,560,000</span>
        </div>
        <div className="info-lbl">
          <span className="info-lbl-name">Unrealized Firm Total</span>
          <span className="info-lbl-val">$48,871,695</span>
        </div>
        <div className="ver-sel ver-sel-only">
          <span className="ver-sel-text">Valuation Version - 12/31/2026</span>
          <MaterialIcon name="expand_more" size={14} color="var(--brand-500)" />
        </div>
      </div>
    </div>
  );
}
