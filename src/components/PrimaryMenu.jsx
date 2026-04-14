import { MaterialIcon } from './MaterialIcon.jsx';
import { useEffect, useRef, useState } from 'react';
import { CompaniesDropdown } from './CompaniesDropdown.jsx';
import { SearchModal } from './SearchModal.jsx';

const LOGO_URL = 'https://placehold.co/34x32/01294C/9ACBF6?text=·';
const AVATAR_URL = 'https://placehold.co/32x32/E2E8F0/475569?text=·';

const NAV_ITEMS = [
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'valuations', label: 'Valuations' },
  { id: 'waterfalls', label: 'Waterfalls' },
  { id: 'documents', label: 'Documents' },
  { id: 'reports', label: 'Reports' },
];

export function PrimaryMenu({
  variant = 'company',
  activeProduct = 'intelligence',
  onLogoClick,
  onProductNavigate,
  onCompaniesSeeAll,
  onCompaniesSelect,
}) {
  const hideContext = variant === 'home';
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const companiesWrapRef = useRef(null);

  function onNavKeyDown(e, id) {
    if (!onProductNavigate) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onProductNavigate(id);
    }
  }

  useEffect(() => {
    function onDocDown(e) {
      if (!companiesOpen) return;
      const wrap = companiesWrapRef.current;
      if (!wrap) return;
      if (!wrap.contains(e.target)) setCompaniesOpen(false);
    }
    function onKey(e) {
      if (!companiesOpen) return;
      if (e.key === 'Escape') setCompaniesOpen(false);
    }
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [companiesOpen]);

  useEffect(() => {
    function onKey(e) {
      if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) return;
      const ae = document.activeElement;
      const inOtherField =
        !searchOpen &&
        ae &&
        (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA') &&
        !ae.hasAttribute('data-search-modal-input');
      if (inOtherField) return;
      e.preventDefault();
      setSearchOpen((v) => !v);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  return (
    <>
    <header className="primary-menu" role="banner">
      <div className="pm-left">
        <button type="button" className="pm-logo-btn" onClick={onLogoClick} aria-label="Home">
          <img className="pm-logo" src={LOGO_URL} alt="" width={34} height={32} decoding="async" />
        </button>
        <nav className="main-nav" aria-label="Product">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item${activeProduct === item.id ? ' active' : ''}`}
              role={onProductNavigate ? 'button' : undefined}
              tabIndex={onProductNavigate ? 0 : undefined}
              onClick={() => onProductNavigate?.(item.id)}
              onKeyDown={(e) => onNavKeyDown(e, item.id)}
            >
              <span className="nav-item-text">{item.label}</span>
            </div>
          ))}
        </nav>
        {!hideContext && (
          <div className="pm-pills">
            <div className="nav-pill-wrap" ref={companiesWrapRef}>
              <button
                type="button"
                className="nav-pill"
                data-dropdown="false"
                aria-haspopup="menu"
                aria-expanded={companiesOpen}
                onClick={() => setCompaniesOpen((v) => !v)}
              >
                <MaterialIcon name="domain" size={16} className="nav-pill-icon" color="var(--neutral-100)" />
                <span className="nav-pill-label nav-pill-label--companies">Companies</span>
                <MaterialIcon
                  name="expand_more"
                  size={16}
                  className="nav-pill-icon"
                  color="var(--neutral-100)"
                />
              </button>
              {companiesOpen && (
                <div className="nav-pill-popover" role="presentation">
                  <CompaniesDropdown
                    onClose={() => setCompaniesOpen(false)}
                    onSeeAllCompanies={onCompaniesSeeAll}
                    onSelectCompany={onCompaniesSelect}
                  />
                </div>
              )}
            </div>
            <div className="nav-pill" data-dropdown="true" data-picker-label="true">
              <MaterialIcon name="calendar_today" size={16} className="nav-pill-icon" color="var(--brand-200)" />
              <span className="nav-pill-label">Measurement Date</span>
              <span className="nav-pill-date">01/17/2024</span>
              <MaterialIcon name="expand_more" size={16} className="nav-pill-icon" color="var(--neutral-white)" />
            </div>
          </div>
        )}
      </div>
      <div className="pm-right">
        <button
          type="button"
          className="search-bar"
          role="search"
          aria-haspopup="dialog"
          aria-expanded={searchOpen}
          aria-controls={searchOpen ? 'search-modal-dialog' : undefined}
          onClick={() => setSearchOpen(true)}
        >
          <MaterialIcon name="search" size={16} color="var(--neutral-400)" />
          <span className="search-text">cmd + K</span>
        </button>
        <div className="notif-btn" data-dot="true" aria-label="Notifications, 6 unread">
          <MaterialIcon name="notifications" size={16} fill={1} color="var(--neutral-300)" />
          <span className="notif-badge">6</span>
        </div>
        <div className="tool-switch" data-property-1="Valuations" aria-label="View switch">
          <div className="ts-btn active" data-state="selected" aria-current="true">
            <MaterialIcon name="grid_view" size={14} fill={1} color="var(--neutral-white)" />
          </div>
          <div className="ts-btn" data-state="unselected">
            <MaterialIcon name="view_list" size={14} fill={0} color="var(--brand-600)" />
          </div>
        </div>
        <img className="avatar" src={AVATAR_URL} alt="" width={32} height={32} decoding="async" />
        <div className="pm-user-menu" aria-label="Account menu">
          <MaterialIcon name="more_vert" size={20} color="var(--neutral-100)" />
        </div>
      </div>
    </header>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
