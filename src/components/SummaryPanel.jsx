import { useAppData } from '../lib/appData.js';

export function SummaryPanel() {
  const { selectedCompany } = useAppData();
  return (
    <div
      className="sec-panel"
      id="sec-panel-summary"
      role="tabpanel"
      aria-labelledby="sec-tab-summary"
    >
      <div className="content summary-page">
        <h1 className="sum-page-title">Summary</h1>
        <p className="sum-page-sub">{selectedCompany?.name ?? 'Company'} · Measurement date 01/17/2024 · Draft</p>
        <div className="sum-sec-head">Company Overview</div>
        <div className="sum-kpi-grid">
          <div className="sum-kpi">
            <div className="sum-kpi-label">Total cost</div>
            <div className="sum-kpi-value">$24,180,000</div>
            <div className="sum-kpi-sub">Across all funds</div>
          </div>
          <div className="sum-kpi">
            <div className="sum-kpi-label">Fair value</div>
            <div className="sum-kpi-value positive">$34,560,000</div>
            <div className="sum-kpi-sub">Mark as of measurement date</div>
          </div>
          <div className="sum-kpi">
            <div className="sum-kpi-label">Value creation</div>
            <div className="sum-kpi-value positive">$10,380,000</div>
            <div className="sum-kpi-sub">FV − total cost</div>
          </div>
          <div className="sum-kpi">
            <div className="sum-kpi-label">Gross MOIC</div>
            <div className="sum-kpi-value">1.43x</div>
            <div className="sum-kpi-sub">Fair value / cost</div>
          </div>
          <div className="sum-kpi">
            <div className="sum-kpi-label">Gross IRR</div>
            <div className="sum-kpi-value positive">28.4%</div>
            <div className="sum-kpi-sub">Since first investment</div>
          </div>
          <div className="sum-kpi">
            <div className="sum-kpi-label">DPI</div>
            <div className="sum-kpi-value">0.12x</div>
            <div className="sum-kpi-sub">Distributions / paid-in</div>
          </div>
        </div>
        <div className="sum-split">
          <div className="sum-split-col">
            <div className="sum-card">
              <div className="sum-card-h">Holdings</div>
              <table className="sum-table">
                <thead>
                  <tr>
                    <th>Security</th>
                    <th className="num">Cost</th>
                    <th className="num">Fair value</th>
                    <th className="num">Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="linkish">Series D Preferred</span>
                    </td>
                    <td className="num">$18,000,000</td>
                    <td className="num">$26,400,000</td>
                    <td className="num">12.4%</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="linkish">Series C Preferred</span>
                    </td>
                    <td className="num">$4,680,000</td>
                    <td className="num">$5,920,000</td>
                    <td className="num">3.1%</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="linkish">Common (secondary)</span>
                    </td>
                    <td className="num">$1,500,000</td>
                    <td className="num">$2,240,000</td>
                    <td className="num">0.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sum-split-col">
            <div className="sum-sec-head">At a Glance</div>
            <div className="sum-card">
              <div className="sum-card-h">Company snapshot</div>
              <div className="sum-dl">
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Sector</span>
                  <span className="sum-dl-v">Technology</span>
                </div>
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Industry</span>
                  <span className="sum-dl-v">Consumer electronics</span>
                </div>
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Headquarters</span>
                  <span className="sum-dl-v">Cupertino, CA</span>
                </div>
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Initial investment</span>
                  <span className="sum-dl-v">03/14/2019</span>
                </div>
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Lead partner</span>
                  <span className="sum-dl-v">J. Morgan</span>
                </div>
                <div className="sum-dl-row">
                  <span className="sum-dl-k">Status</span>
                  <span className="sum-dl-v">Active · Late stage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
