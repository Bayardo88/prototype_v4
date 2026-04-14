import { MaterialIcon } from './MaterialIcon.jsx';
import { useSupabaseTable } from '../lib/useSupabaseTable.js';

/**
 * Homepage dashboard — matches `Homepage_-_Full_Dashboard` screenshot.
 */
export function HomePage() {
  const { data: firms } = useSupabaseTable('firms', { select: 'id,name,firm_value,firm_value_delta', orderBy: 'name', limit: 1 });
  const { data: funds } = useSupabaseTable('funds', { select: 'id,name', orderBy: 'name', limit: 8 });

  const firm = firms[0];
  const easy = funds.slice(0, 5);
  const metricFunds = funds.slice(0, 4);

  function formatMoney(n) {
    if (typeof n !== 'number') return n ?? '';
    return n.toLocaleString('en-US');
  }

  return (
    <main className="home-page" id="home-page-root" aria-label="Home">
      <div className="home-tabs">
        <div className="home-tab active">Home</div>
        <button type="button" className="home-tab-plus" aria-label="Add tab">
          <MaterialIcon name="add" size={16} color="var(--neutral-600)" />
        </button>
      </div>

      <div className="home-dash">
        <div className="home-top">
          <div className="home-welcome">
            <div className="home-welcome-title">Welcome</div>
            <div className="home-welcome-user">&lt;User Name&gt;</div>
          </div>

          <div className="home-firm-card" aria-label="Firm value card">
            <div className="home-firm-head">
              <div className="home-firm-k">Firm Value</div>
              <div className="home-firm-meta">
                <span className="home-firm-delta">
                  +{typeof firm?.firm_value_delta === 'number' ? firm.firm_value_delta.toFixed(2) : '7.45'}%
                </span>
                <button type="button" className="home-kebab" aria-label="More">
                  <MaterialIcon name="more_vert" size={18} color="var(--neutral-500)" />
                </button>
              </div>
            </div>
            <div className="home-firm-v">
              ${typeof firm?.firm_value === 'number' ? formatMoney(firm.firm_value) : '18,092,124'}
            </div>
            <div className="home-spark" aria-hidden="true" />
          </div>
        </div>

        <div className="home-mid">
          <div className="home-easy">
            <div className="home-easy-title">Easy Access to Scalar’s Features</div>
            <div className="home-easy-grid" aria-hidden="true">
              {(easy.length ? easy : Array.from({ length: 5 }).map((_, i) => ({ id: i, name: 'Fund Name Value' }))).map(
                (f) => (
                  <div key={f.id} className="home-easy-tile">
                    {f.name}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="home-metrics">
          {(metricFunds.length ? metricFunds : Array.from({ length: 4 }).map((_, i) => ({ id: i, name: 'Fund Name Value' }))).map(
            (f, idx) => (
            <div key={idx} className="home-metric">
              <div className="home-metric-ico" aria-hidden="true" />
              <div className="home-metric-body">
                <div className="home-metric-label">{f.name}</div>
                <div className="home-metric-value">$2,350,404</div>
              </div>
            </div>
          ))}
        </div>

        <section className="home-ai" aria-label="AI helper">
          <div className="home-ai-title">We value your time. Let our Ai speed your process</div>
          <div className="home-ai-input">
            <span className="home-ai-icon" aria-hidden="true">
              <MaterialIcon name="auto_awesome" size={16} fill={1} color="var(--color-ai)" />
            </span>
            <input className="home-ai-text" placeholder="How can I help you?" aria-label="AI prompt" />
            <span className="home-ai-hint">Hit Return</span>
          </div>
          <div className="home-ai-suggestions" aria-label="AI suggestions">
            <button type="button" className="home-ai-chip">Ai Suggestion</button>
            <button type="button" className="home-ai-chip">Ai Suggestion</button>
            <button type="button" className="home-ai-chip">Ai Suggestion</button>
            <button type="button" className="home-ai-chip">Ai Suggestion</button>
          </div>
        </section>

        <div className="home-bottom">
          <section className="home-todos" aria-label="To-Do list">
            <div className="home-card-head">
              <span>To-Do’s List</span>
              <button type="button" className="home-kebab" aria-label="More">
                <MaterialIcon name="more_vert" size={18} color="var(--neutral-500)" />
              </button>
            </div>
            <div className="home-todo-list">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="home-todo">
                  <div className="home-todo-chk" aria-hidden="true" />
                  <div className="home-todo-text">
                    <div className="home-todo-title">Task Name/Type</div>
                    <div className="home-todo-sub">Small Task Description</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="home-empty" aria-label="Customize dashboard">
            <div className="home-empty-copy">
              Is there anything else you want to display on your Homescreen?
            </div>
            <button type="button" className="home-empty-btn">
              <MaterialIcon name="edit" size={16} color="var(--neutral-white)" />
              Edit Your Dashboard
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
