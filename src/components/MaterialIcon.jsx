/**
 * Google Material Symbols Outlined (Material Design icons).
 * Self-hosted via @fontsource-variable/material-symbols-outlined.
 */
export function MaterialIcon({
  name,
  size = 20,
  className = '',
  style,
  fill = 0,
  weight = 400,
  color,
  opsz,
}) {
  const optical = opsz ?? Math.round(size);
  const fontVariationSettings = `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${optical}`;
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={{
        fontSize: size,
        width: size,
        height: size,
        color,
        fontVariationSettings,
        ...style,
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}
