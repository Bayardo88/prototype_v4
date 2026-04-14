import { MaterialIcon } from './MaterialIcon.jsx';

export function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="bt-tab">
        <MaterialIcon name="article" size={13} color="var(--neutral-500)" />
        Notes
      </div>
      <div className="bt-tab">
        <MaterialIcon name="table_chart" size={13} color="var(--neutral-500)" />
        Sheets
      </div>
      <div className="bt-tab">
        <MaterialIcon name="draft" size={13} color="var(--neutral-500)" />
        Documents
      </div>
      <div className="bt-tab file">
        <MaterialIcon name="table_chart" size={12} color="rgba(255,255,255,0.85)" />
        ABC Startup Co CAP Table 12-31-2024
        <MaterialIcon
          name="close"
          size={14}
          color="rgba(255,255,255,0.85)"
          className="bt-close"
        />
      </div>
      <div className="bt-actions">
        <div className="bt-icon">
          <MaterialIcon name="open_in_full" size={16} color="var(--neutral-500)" />
        </div>
        <div className="bt-icon">
          <MaterialIcon name="view_column" size={16} color="var(--neutral-500)" />
        </div>
      </div>
    </div>
  );
}
