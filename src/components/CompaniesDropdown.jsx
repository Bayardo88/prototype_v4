import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppData } from '../lib/appData.js';
import { useUiState } from '../lib/uiState.jsx';

/**
 * Scalar Design System: Company Dropdown (Default)
 * Figma: Scalar_Design_System-Components, node 405:1021
 *
 * Company-row hover flyout (sections submenu):
 * Figma node 517:6170 — https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=517-6170
 *
 * Cap Table nested submenu (on selecting “Cap Table” in that flyout):
 * Figma node 405:1023 — https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=405-1023
 *
 * Remote icon URLs expire ~7 days; replace with checked-in assets later.
 */
const SEARCH_ICON_IMG = 'https://www.figma.com/api/mcp/asset/9091958d-0962-4be3-a443-01d25891a9fe';
const CHEVRON_RIGHT_IMG = 'https://www.figma.com/api/mcp/asset/304395bc-b56e-488d-b2b6-5ecd265b4b6b';
const ADD_ICON_IMG = 'https://www.figma.com/api/mcp/asset/3982a25c-c7e9-4e12-a8e1-25880ccdd3bd';
/** Chevron glyph for nested items (Figma 517:6170) */
const SUBMENU_CHEVRON_IMG = 'https://www.figma.com/api/mcp/asset/4599d9d4-833e-4998-9735-149ee8c1c848';

const COMPANY_SECTION_FLYOUT = [
  { id: 'summary', label: 'Summary', chevron: false },
  { id: 'financials', label: 'Financials', chevron: false },
  { id: 'cap-table', label: 'Cap Table', chevron: true },
  { id: 'valuations', label: 'Valuations', chevron: true },
  { id: 'waterfall', label: 'Waterfalls', chevron: false },
];

/** Figma 405:1023 — Company Sub-menu / Cap Table */
const CAP_TABLE_SUBMENU_ITEMS = [
  { id: 'cap-table', label: 'Cap Table' },
  { id: 'fund-ownership', label: 'Fund Ownership' },
  { id: 'breakpoint-analysis', label: 'Breakpoint Analysis' },
  { id: 'cash-flow-ledger', label: 'Cash Flow Ledger' },
];

export function CompaniesDropdown({ onClose, onSeeAllCompanies, onSelectCompany }) {
  const { companies, selectedFirm, selectedFund, setSelectedCompanyId } = useAppData();
  const { queueCompanySecondaryTab, queueCapTableTertiary } = useUiState();
  const [q, setQ] = useState('');
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null);
  const [capNestedForCompanyId, setCapNestedForCompanyId] = useState(null);
  const leaveTimerRef = useRef(null);
  const prevHoveredCompanyRef = useRef(null);
  const MIN_ITEMS = 8;

  useEffect(() => {
    if (hoveredCompanyId == null) {
      setCapNestedForCompanyId(null);
      prevHoveredCompanyRef.current = null;
      return;
    }
    const prev = prevHoveredCompanyRef.current;
    if (prev != null && prev !== hoveredCompanyId) {
      setCapNestedForCompanyId(null);
    }
    prevHoveredCompanyRef.current = hoveredCompanyId;
  }, [hoveredCompanyId]);

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

  function clearFlyoutLeaveTimer() {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }

  function scheduleCloseFlyout() {
    clearFlyoutLeaveTimer();
    leaveTimerRef.current = setTimeout(() => setHoveredCompanyId(null), 140);
  }

  function openFlyoutForCompany(companyId) {
    clearFlyoutLeaveTimer();
    setHoveredCompanyId(companyId);
  }

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };
  }, []);

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
          className="company-dd-item company-dd-item--see-all"
          role="menuitem"
          onMouseEnter={() => {
            clearFlyoutLeaveTimer();
            setHoveredCompanyId(null);
          }}
          onClick={() => {
            onSeeAllCompanies?.();
            onClose?.();
          }}
        >
          <span className="company-dd-text">See All Companies</span>
        </button>

        {displayItems.map((c) => {
          const isPlaceholder = !!c.__placeholder;
          const showFlyout = !isPlaceholder && hoveredCompanyId === c.id;
          const showCapNested = showFlyout && capNestedForCompanyId === c.id;

          return (
            <div
              key={c.id}
              className={`company-dd-row${showFlyout ? ' company-dd-row--flyout-open' : ''}`}
              onMouseEnter={() => {
                if (!isPlaceholder) openFlyoutForCompany(c.id);
              }}
              onMouseLeave={scheduleCloseFlyout}
            >
              <button
                type="button"
                className="company-dd-item company-dd-item--company"
                role="menuitem"
                disabled={isPlaceholder}
                aria-disabled={isPlaceholder}
                aria-expanded={showFlyout}
                onClick={() => {
                  if (isPlaceholder) return;
                  setSelectedCompanyId(c.id);
                  onSelectCompany?.(c.id);
                  onClose?.();
                }}
              >
                <span className="company-dd-text">{c.name}</span>
                {!isPlaceholder && (
                  <img className="company-dd-chevron" src={CHEVRON_RIGHT_IMG} alt="" aria-hidden="true" />
                )}
              </button>

              {showFlyout && (
                <div
                  className="company-dd-flyout"
                  role="presentation"
                  onMouseEnter={clearFlyoutLeaveTimer}
                  onMouseLeave={scheduleCloseFlyout}
                >
                  <div className="company-dd-flyout-columns" role="menu" aria-label={`${c.name} sections`}>
                    <div className="company-dd-flyout-inner">
                      {COMPANY_SECTION_FLYOUT.map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          className={`company-dd-flyout-item${
                            row.id === 'cap-table' && showCapNested ? ' company-dd-flyout-item--branch-open' : ''
                          }`}
                          role="menuitem"
                          aria-haspopup={row.id === 'cap-table' ? 'menu' : undefined}
                          aria-expanded={row.id === 'cap-table' ? showCapNested : undefined}
                          onClick={() => {
                            if (row.id === 'cap-table') {
                              setCapNestedForCompanyId((prev) => (prev === c.id ? null : c.id));
                              return;
                            }
                            queueCompanySecondaryTab(row.id);
                            setSelectedCompanyId(c.id);
                            onSelectCompany?.(c.id);
                            onClose?.();
                          }}
                        >
                          <span className="company-dd-flyout-text">{row.label}</span>
                          {row.chevron && (
                            <img
                              className="company-dd-flyout-chevron"
                              src={SUBMENU_CHEVRON_IMG}
                              alt=""
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    {showCapNested && (
                      <div
                        className="company-dd-flyout-nested"
                        role="menu"
                        aria-label="Cap Table"
                        onMouseEnter={clearFlyoutLeaveTimer}
                      >
                        <div className="company-dd-flyout-nested-inner">
                          {CAP_TABLE_SUBMENU_ITEMS.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              className="company-dd-flyout-item"
                              role="menuitem"
                              onClick={() => {
                                queueCompanySecondaryTab('cap-table');
                                queueCapTableTertiary(sub.id);
                                setSelectedCompanyId(c.id);
                                onSelectCompany?.(c.id);
                                onClose?.();
                              }}
                            >
                              <span className="company-dd-flyout-text">{sub.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button type="button" className="company-dd-add" onClick={onClose}>
        <img src={ADD_ICON_IMG} alt="" aria-hidden="true" width={16} height={16} />
        <span className="company-dd-add-text">Add New Company</span>
      </button>
    </div>
  );
}
