/**
 * Scalar Design System: AI trigger button
 * Figma: Scalar_Design_System-Components, node 466:3116
 *
 * Uses a Figma-hosted asset URL (expires ~7 days).
 * Replace with a checked-in asset when you want it permanent.
 */
const AI_UNION_IMG = 'https://www.figma.com/api/mcp/asset/0ca2019f-8bac-48c0-a6df-936176d13301';

export function AiToolButton({ className = '', ...props }) {
  return (
    <button type="button" className={`ai-btn ${className}`.trim()} {...props}>
      <img className="ai-btn-icon" src={AI_UNION_IMG} alt="" aria-hidden="true" />
    </button>
  );
}

