import { useState } from 'react';
import { CompanyBar } from './CompanyBar.jsx';
import { SummaryPanel } from './SummaryPanel.jsx';
import { ValuationsPanel } from './ValuationsPanel.jsx';
import { PlaceholderPanel } from './PlaceholderPanel.jsx';

export function CompanyWorkspace() {
  const [activeSecondary, setActiveSecondary] = useState('summary');

  return (
    <div className="company-workspace" aria-label="Company workspace">
      <CompanyBar activeSecondary={activeSecondary} onSecondaryChange={setActiveSecondary} />
      {activeSecondary === 'summary' && <SummaryPanel />}
      {activeSecondary === 'valuations' && <ValuationsPanel />}
      {activeSecondary !== 'summary' && activeSecondary !== 'valuations' && (
        <PlaceholderPanel
          title="Coming soon"
          description="This section is not yet implemented in the prototype."
        />
      )}
    </div>
  );
}

