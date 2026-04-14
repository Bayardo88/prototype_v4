import { useEffect, useState } from 'react';
import { CompanyBar } from './CompanyBar.jsx';
import { SummaryPanel } from './SummaryPanel.jsx';
import { ValuationsPanel } from './ValuationsPanel.jsx';
import { PlaceholderPanel } from './PlaceholderPanel.jsx';
import { FinancialsPanel } from './FinancialsPanel.jsx';
import { CapTablePanel } from './CapTablePanel.jsx';
import { CompanyWaterfallsPanel } from './CompanyWaterfallsPanel.jsx';
import { useUiState } from '../lib/uiState.jsx';

export function CompanyWorkspace() {
  const { pendingCompanySecondaryTab, clearPendingCompanySecondaryTab } = useUiState();
  const [activeSecondary, setActiveSecondary] = useState('summary');

  useEffect(() => {
    if (!pendingCompanySecondaryTab) return;
    setActiveSecondary(pendingCompanySecondaryTab);
    clearPendingCompanySecondaryTab();
  }, [pendingCompanySecondaryTab, clearPendingCompanySecondaryTab]);

  return (
    <div className="company-workspace" aria-label="Company workspace">
      <CompanyBar activeSecondary={activeSecondary} onSecondaryChange={setActiveSecondary} />
      {activeSecondary === 'summary' && <SummaryPanel />}
      {activeSecondary === 'financials' && <FinancialsPanel />}
      {activeSecondary === 'cap-table' && <CapTablePanel />}
      {activeSecondary === 'valuations' && <ValuationsPanel />}
      {activeSecondary === 'waterfall' && <CompanyWaterfallsPanel />}
      {activeSecondary !== 'summary' &&
        activeSecondary !== 'financials' &&
        activeSecondary !== 'cap-table' &&
        activeSecondary !== 'valuations' &&
        activeSecondary !== 'waterfall' && (
        <PlaceholderPanel
          title="Coming soon"
          description="This section is not yet implemented in the prototype."
        />
      )}
    </div>
  );
}

