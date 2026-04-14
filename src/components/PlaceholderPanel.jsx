export function PlaceholderPanel({ title, description }) {
  return (
    <div className="sec-panel" role="tabpanel">
      <div className="content">
        <div className="sec-placeholder">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}
