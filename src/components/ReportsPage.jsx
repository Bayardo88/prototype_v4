import { MaterialIcon } from './MaterialIcon.jsx';
import { useSupabaseTable } from '../lib/useSupabaseTable.js';
import { useAppData } from '../lib/appData.js';

function ReportCard({ kind = 'pdf', name = 'Doc_Name.pdf', companyName = 'Company' }) {
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
        <span className="doc-pill">{companyName}</span>
        <span className="doc-cloud" aria-hidden="true">
          <MaterialIcon name="cloud" size={14} color="var(--neutral-500)" />
        </span>
      </div>
    </div>
  );
}

export function ReportsPage() {
  const { selectedFirm, selectedFund, selectedCompany, companies } = useAppData();
  const { data: reports } = useSupabaseTable('reports', {
    select: 'id,name,company_id',
    orderBy: 'name',
    limit: 150,
  });
  const companyById = new Map(companies.map((c) => [c.id, c.name]));

  return (
    <div className="sec-panel" id="sec-panel-reports" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Reports</h1>
            <div className="prod-filters">
              <button type="button" className="prod-filter-pill">
                {selectedFirm?.name ?? 'Firm'}
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                {selectedFund?.name ?? 'Fund'}
                <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
              </button>
              <button type="button" className="prod-filter-pill">
                {selectedCompany?.name ?? 'Company'}
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
          {(reports.length ? reports : Array.from({ length: 48 }).map((_, i) => ({ id: i, name: 'Doc_Name.pdf' })))
            .slice(0, 48)
            .map((r, idx) => {
              const kind = idx % 6 === 0 ? 'xlsx' : 'pdf';
              const name = r.name.includes('.') ? r.name : `${r.name}.${kind === 'xlsx' ? 'xlsx' : 'pdf'}`;
              const companyName = companyById.get(r.company_id) ?? selectedCompany?.name ?? 'Company';
              return <ReportCard key={r.id} kind={kind} name={name} companyName={companyName} />;
            })}
        </div>
      </div>
    </div>
  );
}

