import { MaterialIcon } from './MaterialIcon.jsx';
import { useSupabaseTable } from '../lib/useSupabaseTable.js';
import { useAppData } from '../lib/appData.js';

function DocIcon({ kind }) {
  if (kind === 'xlsx') return <MaterialIcon name="grid_on" size={16} color="#16a34a" />;
  if (kind === 'doc') return <MaterialIcon name="description" size={16} color="#2563eb" />;
  if (kind === 'ppt') return <MaterialIcon name="slideshow" size={16} color="#f97316" />;
  return <MaterialIcon name="picture_as_pdf" size={16} color="#ef4444" />;
}

function DocCard({ kind = 'pdf', name = 'Doc_Name.pdf', companyName = 'Company' }) {
  return (
    <div className="doc-card" role="group" aria-label={name}>
      <div className="doc-thumb" aria-hidden="true">
        <div className="doc-fileicon">
          <DocIcon kind={kind} />
        </div>
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

export function DocumentsPage() {
  const { selectedFirm, selectedFund, selectedCompany, companies } = useAppData();
  const { data: documents } = useSupabaseTable('documents', {
    select: 'id,name,company_id',
    orderBy: 'name',
    limit: 150,
  });

  const companyById = new Map(companies.map((c) => [c.id, c.name]));

  return (
    <div className="sec-panel" id="sec-panel-documents" role="tabpanel">
      <div className="content prod-page">
        <header className="prod-head">
          <div className="prod-head-left">
            <h1 className="prod-title">Documents</h1>
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
              Request Document
            </button>
            <button type="button" className="prod-btn prod-btn--primary">
              <MaterialIcon name="upload" size={16} color="var(--neutral-white)" />
              Upload Document
            </button>
            <button type="button" className="prod-btn">
              Request Information
            </button>
            <button type="button" className="prod-iconbtn" aria-label="Pin">
              <MaterialIcon name="push_pin" size={16} color="var(--neutral-500)" />
            </button>
          </div>
        </header>

        <div className="docs-grid" aria-label="Documents grid">
          {(documents.length ? documents : Array.from({ length: 48 }).map((_, i) => ({ id: i, name: 'Doc_Name.pdf' })))
            .slice(0, 48)
            .map((d, idx) => {
              const kind = idx % 10 === 5 ? 'xlsx' : 'pdf';
              const name = d.name.includes('.') ? d.name : `${d.name}.pdf`;
              const companyName = companyById.get(d.company_id) ?? selectedCompany?.name ?? 'Company';
              return <DocCard key={d.id} kind={kind} name={name} companyName={companyName} />;
            })}
        </div>
      </div>
    </div>
  );
}

