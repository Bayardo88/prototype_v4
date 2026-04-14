import valuationsHtml from '../valuations-fragment.html?raw';

export function ValuationsPanel() {
  return (
    <div
      className="sec-panel"
      id="sec-panel-valuations"
      role="tabpanel"
      dangerouslySetInnerHTML={{ __html: valuationsHtml }}
    />
  );
}
