import { MaterialIcon } from './MaterialIcon.jsx';

/**
 * Home landing — Figma Navigation-V4, node 8-5747 (Dev Mode).
 * Tune spacing/typography against Figma specs when available.
 */
const PRODUCTS = [
  { id: 'intelligence', label: 'Intelligence', desc: 'Signals, benchmarks, and company context.', icon: 'hub' },
  { id: 'valuations', label: 'Valuations', desc: 'Models, scenarios, and allocation views.', icon: 'calculate' },
  { id: 'waterfalls', label: 'Waterfalls', desc: 'Distribution logic and participant outcomes.', icon: 'account_tree' },
  { id: 'documents', label: 'Documents', desc: 'Data room and versioned artifacts.', icon: 'folder_open' },
  { id: 'reports', label: 'Reports', desc: 'Board-ready packs and exports.', icon: 'assessment' },
];

export function HomePage({ onSelectProduct, onContinueCompany }) {
  return (
    <main className="home-page" id="home-page-root" aria-label="Home">
      <div className="home-inner">
        <header className="home-hero">
          <div className="home-hero-copy">
            <h1 className="home-title">Portfolio overview</h1>
            <p className="home-lede">
              Pick a product area to open the workspace, or jump back into your last company context.
            </p>
            <div className="home-hero-actions">
              <button type="button" className="home-btn home-btn--primary" onClick={onContinueCompany}>
                Continue to Apple Inc.
              </button>
            </div>
          </div>
          <aside className="home-hero-aside" aria-label="Snapshot">
            <div className="home-stat">
              <span className="home-stat-label">Open tasks</span>
              <span className="home-stat-value">12</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-label">Companies</span>
              <span className="home-stat-value">48</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-label">Measurement date</span>
              <span className="home-stat-value home-stat-value--sm">01/17/2024</span>
            </div>
          </aside>
        </header>

        <section className="home-section" aria-labelledby="home-products-heading">
          <h2 id="home-products-heading" className="home-section-title">
            Product areas
          </h2>
          <div className="home-product-grid">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="home-product-card"
                onClick={() => onSelectProduct(p.id)}
              >
                <MaterialIcon name={p.icon} size={28} color="var(--brand-700)" className="home-product-icon" />
                <span className="home-product-name">{p.label}</span>
                <span className="home-product-desc">{p.desc}</span>
                <span className="home-product-cta">
                  Open
                  <MaterialIcon name="arrow_forward" size={16} color="var(--brand-500)" />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-recent-heading">
          <div className="home-section-head">
            <h2 id="home-recent-heading" className="home-section-title">
              Recent companies
            </h2>
          </div>
          <div className="home-table-wrap">
            <table className="home-table">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Fund</th>
                  <th scope="col">Fair value</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="home-table-actions">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apple Inc.</td>
                  <td>Growth Fund II</td>
                  <td className="home-table-num">$34,560,000</td>
                  <td>
                    <span className="home-pill">Draft</span>
                  </td>
                  <td className="home-table-actions">
                    <button type="button" className="home-linkish" onClick={onContinueCompany}>
                      Open
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Stripe, Inc.</td>
                  <td>Growth Fund II</td>
                  <td className="home-table-num">$18,200,000</td>
                  <td>
                    <span className="home-pill home-pill--muted">Published</span>
                  </td>
                  <td className="home-table-actions">
                    <button type="button" className="home-linkish" onClick={onContinueCompany}>
                      Open
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>ABC Startup Co</td>
                  <td>Seed I</td>
                  <td className="home-table-num">$4,120,000</td>
                  <td>
                    <span className="home-pill">Draft</span>
                  </td>
                  <td className="home-table-actions">
                    <button type="button" className="home-linkish" onClick={onContinueCompany}>
                      Open
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
