import { useMemo } from 'react';
import { MaterialIcon } from './MaterialIcon.jsx';
import { useAppData } from '../lib/appData.js';

export function CompaniesPage({ onOpenCompany }) {
  const { selectedFirm, selectedFund, companies, funds, setSelectedCompanyId } = useAppData();

  const fundById = useMemo(() => new Map((funds ?? []).map((f) => [f.id, f])), [funds]);

  const list = useMemo(() => {
    const base = companies ?? [];
    return base.filter((c) => {
      if (selectedFirm && c.firm_id !== selectedFirm.id) return false;
      if (selectedFund && c.fund_id !== selectedFund.id) return false;
      return true;
    });
  }, [companies, selectedFirm?.id, selectedFund?.id]);

  return (
    <div className="sec-panel" role="tabpanel" id="sec-panel-companies">
      <div className="content companies-page">
        <header className="companies-head">
          <div className="companies-head-left">
            <h1 className="companies-title">Companies</h1>
            <button type="button" className="companies-filter" aria-label="Filter by Fund">
              <span className="companies-filter-text">Filter by Fund</span>
              <MaterialIcon name="expand_more" size={16} color="var(--neutral-700)" />
            </button>
          </div>
        </header>

        <div className="companies-grid" role="list" aria-label="Companies list">
          {(list.length ? list : Array.from({ length: 30 }).map((_, i) => ({ id: i, name: 'Company Name' }))).map(
            (c) => {
              const fund = fundById.get(c.fund_id);
              return (
                <button
                  key={c.id}
                  type="button"
                  className="company-card"
                  role="listitem"
                  onClick={() => {
                    setSelectedCompanyId(c.id);
                    onOpenCompany?.(c.id);
                  }}
                >
                  <div className="company-card-name">{c.name}</div>
                  <div className="company-card-tags" aria-hidden="true">
                    <span className="company-card-tag">{fund?.name ?? 'Fund Name'}</span>
                    <span className="company-card-tag">{fund?.name ?? 'Fund Name'}</span>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

