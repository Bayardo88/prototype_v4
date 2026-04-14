import { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialIcon } from './MaterialIcon.jsx';
import { useAppData } from '../lib/appData.js';

/**
 * Intelligence — Figma Navigation-V4, node 111-18243 (Dev Mode).
 * This is the default company workspace landing for the Intelligence product area.
 *
 * Table toolbar AI: trigger expands into inline AiTool AI-input-field — node 466:3115
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=466-3115
 */
const FIRM_MENU_PAD = [
  'Meridian Capital Group',
  'Sterling Peak Partners',
  'HarborLine Ventures',
  'Cascade Equity Partners',
  'Ironwood Holdings',
];

const FUND_MENU_PAD = [
  'Meridian Growth Fund',
  'Sterling Income Trust',
  'HarborLine Credit II',
  'Cascade Opportunity Fund',
  'Ironwood Select LP',
];

export function IntelligencePage() {
  const { selectedFirm, selectedFund, firms, funds, companies, setSelectedFirmId, setSelectedFundId } = useAppData();
  const selectedFundName = selectedFund?.name ?? 'All Funds';
  const [aiToolbarOpen, setAiToolbarOpen] = useState(false);
  const [firmFilterOpen, setFirmFilterOpen] = useState(false);
  const [fundFilterOpen, setFundFilterOpen] = useState(false);
  const aiPopoverWrapRef = useRef(null);
  const firmFilterWrapRef = useRef(null);
  const fundFilterWrapRef = useRef(null);
  const aiToolbarInputRef = useRef(null);

  const firmMenuItems = useMemo(() => {
    const sorted = [...(firms ?? [])].sort((a, b) => String(a.name).localeCompare(String(b.name)));
    const pick = sorted.slice(0, 5);
    if (pick.length >= 5) return pick;
    const seen = new Set(pick.map((f) => f.name));
    const out = [...pick];
    for (const label of FIRM_MENU_PAD) {
      if (out.length >= 5) break;
      if (seen.has(label)) continue;
      seen.add(label);
      out.push({ id: `intel-firm-dd-${out.length}`, name: label, __placeholder: true });
    }
    return out;
  }, [firms]);

  const fundMenuItems = useMemo(() => {
    const pool = selectedFirm
      ? (funds ?? []).filter((fd) => fd.firm_id === selectedFirm.id)
      : [...(funds ?? [])];
    const sorted = [...pool].sort((a, b) => String(a.name).localeCompare(String(b.name)));
    const pick = sorted.slice(0, 5);
    if (pick.length >= 5) return pick;
    const seen = new Set(pick.map((f) => f.name));
    const out = [...pick];
    for (const label of FUND_MENU_PAD) {
      if (out.length >= 5) break;
      if (seen.has(label)) continue;
      seen.add(label);
      out.push({ id: `intel-fund-dd-${out.length}`, name: label, __placeholder: true });
    }
    return out;
  }, [funds, selectedFirm?.id]);

  useEffect(() => {
    if (!aiToolbarOpen && !firmFilterOpen && !fundFilterOpen) return;
    function onDocMouseDown(e) {
      if (aiToolbarOpen && aiPopoverWrapRef.current && !aiPopoverWrapRef.current.contains(e.target)) {
        setAiToolbarOpen(false);
      }
      if (firmFilterOpen && firmFilterWrapRef.current && !firmFilterWrapRef.current.contains(e.target)) {
        setFirmFilterOpen(false);
      }
      if (fundFilterOpen && fundFilterWrapRef.current && !fundFilterWrapRef.current.contains(e.target)) {
        setFundFilterOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setAiToolbarOpen(false);
        setFirmFilterOpen(false);
        setFundFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [aiToolbarOpen, firmFilterOpen, fundFilterOpen]);

  useEffect(() => {
    if (aiToolbarOpen) aiToolbarInputRef.current?.focus();
  }, [aiToolbarOpen]);

  return (
    <div className="sec-panel" id="sec-panel-intelligence" role="tabpanel">
      <div className="content intel-page">
        <div className="intel-topbar">
          <div className="intel-topbar-left">
            <h1 className="intel-page-title">Intelligence</h1>
            <div className="intel-filters">
              <div className="intel-filter-wrap" ref={firmFilterWrapRef}>
                <button
                  type="button"
                  className="intel-filter-pill"
                  data-open={firmFilterOpen ? 'true' : 'false'}
                  aria-haspopup="listbox"
                  aria-expanded={firmFilterOpen}
                  aria-controls="intel-firm-filter-list"
                  onClick={() => setFirmFilterOpen((v) => !v)}
                >
                  <span className="intel-filter-pill-label">{selectedFirm?.name ?? 'Filter by Firm'}</span>
                  <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
                </button>
                {firmFilterOpen && (
                  <div className="intel-filter-dd" id="intel-firm-filter-list" role="listbox" aria-label="Firms">
                    {firmMenuItems.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        role="option"
                        aria-selected={selectedFirm?.id === f.id}
                        disabled={!!f.__placeholder}
                        className={`intel-filter-dd-item${selectedFirm?.id === f.id ? ' is-active' : ''}`}
                        onClick={() => {
                          if (f.__placeholder) return;
                          setSelectedFirmId(f.id);
                          setFirmFilterOpen(false);
                        }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="intel-filter-wrap" ref={fundFilterWrapRef}>
                <button
                  type="button"
                  className="intel-filter-pill"
                  data-open={fundFilterOpen ? 'true' : 'false'}
                  aria-haspopup="listbox"
                  aria-expanded={fundFilterOpen}
                  aria-controls="intel-fund-filter-list"
                  onClick={() => setFundFilterOpen((v) => !v)}
                >
                  <span className="intel-filter-pill-label">{selectedFund?.name ?? 'Filter by Fund'}</span>
                  <MaterialIcon name="expand_more" size={14} color="var(--neutral-600)" />
                </button>
                {fundFilterOpen && (
                  <div className="intel-filter-dd" id="intel-fund-filter-list" role="listbox" aria-label="Funds">
                    {fundMenuItems.map((fd) => (
                      <button
                        key={fd.id}
                        type="button"
                        role="option"
                        aria-selected={selectedFund?.id === fd.id}
                        disabled={!!fd.__placeholder}
                        className={`intel-filter-dd-item${selectedFund?.id === fd.id ? ' is-active' : ''}`}
                        onClick={() => {
                          if (fd.__placeholder) return;
                          setSelectedFundId(fd.id);
                          setFundFilterOpen(false);
                        }}
                      >
                        {fd.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="intel-ai-card" aria-label="AI helper">
          <div className="intel-ai-title">We value your time. Let our Ai speed your process</div>
          <div className="intel-ai-input">
            <span className="intel-ai-icon" aria-hidden="true">
              <MaterialIcon name="auto_awesome" size={16} fill={1} color="var(--color-ai)" />
            </span>
            <input className="intel-ai-text" placeholder="How can I help you?" aria-label="AI prompt" />
            <span className="intel-ai-hint">Hit Return</span>
          </div>
          <div className="intel-ai-suggestions" aria-label="AI suggestions">
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
            <button type="button" className="intel-ai-chip">
              Ai Suggestion
            </button>
          </div>
        </section>

        <section className="intel-metrics-row" aria-label="Fund metrics">
          {(funds.length ? funds.slice(0, 5) : Array.from({ length: 5 }).map((_, i) => ({ id: i, name: 'Fund' }))).map((f, idx) => (
            <div key={idx} className="intel-metric-card">
              <div className="intel-metric-ico" aria-hidden="true" />
              <div className="intel-metric-body">
                <div className="intel-metric-label">{f.name}</div>
                <div className="intel-metric-value">$2,350,404</div>
              </div>
            </div>
          ))}
        </section>

        <section className="intel-table-card" aria-label="Portfolio table">
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
              <div className="intel-ai-toolbar-slot" ref={aiPopoverWrapRef}>
                {!aiToolbarOpen ? (
                  <button
                    className="ai-btn"
                    type="button"
                    aria-label="Open AI assistant"
                    aria-expanded="false"
                    aria-controls="intel-ai-toolbar-query"
                    onClick={() => setAiToolbarOpen(true)}
                  >
                    <MaterialIcon name="auto_awesome" size={16} fill={1} color="var(--neutral-white)" />
                  </button>
                ) : (
                  <div
                    className="ai-input"
                    id="intel-ai-toolbar-ai"
                    role="search"
                    aria-label="AI assistant"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.stopPropagation();
                        setAiToolbarOpen(false);
                      }
                    }}
                  >
                    <span className="ai-input-icon" aria-hidden="true">
                      <MaterialIcon name="auto_awesome" size={16} fill={1} color="var(--color-ai)" />
                    </span>
                    <input
                      ref={aiToolbarInputRef}
                      id="intel-ai-toolbar-query"
                      className="ai-input-text"
                      type="text"
                      placeholder="How can I help you?"
                      aria-label="Ask AI"
                    />
                    <span className="ai-input-chip" aria-hidden="true">
                      <span className="ai-input-chip-text">Hit Return</span>
                    </span>
                  </div>
                )}
              </div>

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

          <div className="intel-table-scroll">
            <table className="intel-table2">
              <thead>
                <tr>
                  <th>Firm Portfolio Summary</th>
                  <th>{selectedFundName}</th>
                  <th>Valuation Date</th>
                  <th>Initial Investment</th>
                  <th>Most Recent Inv...</th>
                  <th>FDO %</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th>Invested Capital</th>
                  <th className="intel-addcol">Add Column</th>
                </tr>
              </thead>
              <tbody>
                {(companies.length ? companies.slice(0, 24) : Array.from({ length: 24 }).map((_, i) => ({ id: i, name: 'Company' }))).map(
                  (c, idx) => (
                    <tr key={c.id}>
                      <td className="intel-first">{c.name}</td>
                      <td>{selectedFundName}</td>
                      <td>11/3/2025</td>
                      <td>11/3/2025</td>
                      <td>11/3/2025</td>
                      <td>{((idx % 40) + 0.8).toFixed(1)}%</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="num">$9,000,000</td>
                      <td className="intel-addcol">
                        <MaterialIcon name="add" size={16} color="var(--neutral-500)" />
                      </td>
                    </tr>
                  )
                )}
                <tr className="intel-total">
                  <td className="intel-first">Total</td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td className="num">$13,200,000</td>
                  <td className="num">$13,250,000</td>
                  <td className="num">$13,300,000</td>
                  <td className="num">$12,900,000</td>
                  <td className="num">$13,450,000</td>
                  <td className="intel-addcol" />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

