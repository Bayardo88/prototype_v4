import { MaterialIcon } from './MaterialIcon.jsx';

function ReportCard({ kind = 'pdf', name = 'Doc_Name.pdf' }) {
  const icon =
    kind === 'xlsx' ? (
      <MaterialIcon name="grid_on" size={16} color="#16a34a" />
    ) : (
      <MaterialIcon name="picture_as_pdf" size={16} color="#ef4444" />
    );

  return (
    <div className="doc-card" role="group" aria-label={name}>
      <div className="doc-thumb" aria-hidden="true">
        <div className="doc-fileicon">{icon}</div>
      </div>
      <div className="doc-name">{name}</div>
      <div className="doc-meta">
        <span className="doc-pill">Company Name</span>
        <span className="doc-cloud" aria-hidden="true">
          <MaterialIcon name="cloud" size={14} color="var(--neutral-500)" />
        </span>
      </div>
    </div>
  );
}

export function ReportsPage() {
  const items = [
    { kind: 'pdf', name: 'Doc_Name.pdf' },
    { kind: 'xlsx', name: 'Doc_Name.xlsx' },
    { kind: 'pdf', name: 'Doc_Name.pdf' },
    { kind: 'xlsx', name: 'Doc_Name.xlsx' },
  ];

  return (
    <div className="sec-panel" id="sec-panel-reports" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Reports</h1>
            <div className="prod-filters">
              <button type="button" className="prod-filter-pill">
                Filter by Firm
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                Filter by Fund
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                Filter by Company
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
            </div>
          </div>
          <div className="prod-head-right">
            <button type="button" className="prod-btn">
              <MaterialIcon name="request_page" size={16} color="var(--brand-500)" />
              Request Report
            </button>
            <button type="button" className="prod-btn prod-btn--primary">
              <MaterialIcon name="add" size={16} color="var(--neutral-white)" />
              Create Report
            </button>
            <button type="button" className="prod-iconbtn" aria-label="Pin">
              <MaterialIcon name="push_pin" size={16} color="var(--neutral-500)" />
            </button>
          </div>
        </header>

        <div className="docs-grid" aria-label="Reports grid">
          {Array.from({ length: 48 }).map((_, idx) => {
            const seed = items[idx % items.length];
            return <ReportCard key={idx} kind={seed.kind} name={seed.name} />;
          })}
        </div>
      </div>
    </div>
  );
}

