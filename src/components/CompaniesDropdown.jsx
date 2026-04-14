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
const SEARCH_ICON_IMG = 'https://www.figma.com/api/mcp/asset/9091958d-0962-4be3-a443-01d25891a9fe';
const CHEVRON_RIGHT_IMG = 'https://www.figma.com/api/mcp/asset/304395bc-b56e-488d-b2b6-5ecd265b4b6b';
const ADD_ICON_IMG = 'https://www.figma.com/api/mcp/asset/3982a25c-c7e9-4e12-a8e1-25880ccdd3bd';

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
    const filtered = query ? base.filter((c) => c.name.toLowerCase().includes(query)) : base;
    const primary = filtered.slice(0, MIN_ITEMS);
    if (primary.length >= MIN_ITEMS) return primary;

    // If firm/fund filtering yields < MIN_ITEMS, top up from the full company list.
    const used = new Set(primary.map((c) => c.id));
    const fallback = (query ? baseAll.filter((c) => c.name.toLowerCase().includes(query)) : baseAll).filter(
      (c) => !used.has(c.id)
    );
    return primary.concat(fallback.slice(0, MIN_ITEMS - primary.length));
  }, [companies, q, selectedFirm?.id, selectedFund?.id]);

  const displayItems = useMemo(() => {
    if (items.length >= MIN_ITEMS) return items;
    const padded = items.slice();
    for (let i = padded.length; i < MIN_ITEMS; i += 1) {
      padded.push({ id: `placeholder-${i}`, name: 'Company Name', __placeholder: true });
    }
    return padded;
  }, [items]);

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

        {displayItems.map((c) => (
          <button
            key={c.id}
            type="button"
            className="company-dd-item"
            role="menuitem"
            disabled={!!c.__placeholder}
            aria-disabled={!!c.__placeholder}
            onClick={() => {
              if (c.__placeholder) return;
              setSelectedCompanyId(c.id);
              onSelectCompany?.(c.id);
              onClose?.();
            }}
          >
            <span className="company-dd-text">{c.name}</span>
            {!c.__placeholder && (
              <img className="company-dd-chevron" src={CHEVRON_RIGHT_IMG} alt="" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      <button type="button" className="company-dd-add" onClick={onClose}>
        <img src={ADD_ICON_IMG} alt="" aria-hidden="true" width={16} height={16} />
        <span className="company-dd-add-text">Add New Company</span>
      </button>
    </div>
  );
}

