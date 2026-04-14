import { useMemo, useState } from 'react';
import { MaterialIcon } from './MaterialIcon.jsx';
import { useAppData } from '../lib/appData.js';

/**
 * Scalar Design System: Company Dropdown (Default)
 * Figma: Scalar_Design_System-Components, node 405:1021
 *
 * Uses Figma-hosted chevron/search asset URLs (expire ~7 days).
 * Replace with checked-in assets later.
 */
const SEARCH_ICON_IMG = 'https://www.figma.com/api/mcp/asset/90457e77-f358-49d2-82cd-cd9b80f44682';
const CHEVRON_RIGHT_IMG = 'https://www.figma.com/api/mcp/asset/067a2848-8355-4736-984c-10e42b88c14a';

export function CompaniesDropdown({ onClose, onSeeAllCompanies, onSelectCompany }) {
  const { companies, selectedFirm, selectedFund, setSelectedCompanyId } = useAppData();
  const [q, setQ] = useState('');
  const MIN_ITEMS = 8;

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const baseAll = companies ?? [];
    const base = baseAll.filter((c) => {
      if (selectedFirm && c.firm_id !== selectedFirm.id) return false;
      if (selectedFund && c.fund_id !== selectedFund.id) return false;
      return true;
    });
    if (!query) return base.slice(0, MIN_ITEMS);
    return base.filter((c) => c.name.toLowerCase().includes(query)).slice(0, MIN_ITEMS);
  }, [companies, q, selectedFirm?.id, selectedFund?.id]);

  return (
    <div className="company-dd" role="menu" aria-label="Companies">
      <div className="company-dd-search" role="search">
        <img className="company-dd-search-icon" src={SEARCH_ICON_IMG} alt="" aria-hidden="true" />
        <input
          className="company-dd-search-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a Company"
          aria-label="Find a Company"
        />
      </div>

      <div className="company-dd-menu">
        <button
          type="button"
          className="company-dd-item"
          role="menuitem"
          onClick={() => {
            onSeeAllCompanies?.();
            onClose?.();
          }}
        >
          <span className="company-dd-text">See All Companies</span>
        </button>

        {items.map((c) => (
          <button
            key={c.id}
            type="button"
            className="company-dd-item"
            role="menuitem"
            onClick={() => {
              setSelectedCompanyId(c.id);
              onSelectCompany?.(c.id);
              onClose?.();
            }}
          >
            <span className="company-dd-text">{c.name}</span>
            <img className="company-dd-chevron" src={CHEVRON_RIGHT_IMG} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button type="button" className="company-dd-add" onClick={onClose}>
        <MaterialIcon name="add" size={16} color="var(--brand-500)" />
        <span className="company-dd-add-text">Add New Company</span>
      </button>
    </div>
  );
}

