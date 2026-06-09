/**
 * AreaChart — bağımlılıksız inline SVG alan grafiği (Server Component uyumlu).
 * Recharts yerine hafif, performanslı SVG kullanılır.
 */
export function AreaChart({
  data,
  height = 224,
  ariaLabel = 'Zaman serisi grafiği',
}: {
  data: number[];
  height?: number;
  ariaLabel?: string;
}) {
  const w = 720;
  const h = height;
  const max = Math.max(...data, 1);
  const step = w / Math.max(data.length - 1, 1);
  const points = data.map((v, i) => [i * step, h - (v / max) * (h - 24)] as const);
  const line = points.map((p) => `${p[0]},${p[1]}`).join(' ');
  const area = `0,${h} ${line} ${w},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      style={{ height }}
      preserveAspectRatio="none"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="ls-area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#ls-area-grad)" />
      <polyline
        points={line}
        fill="none"
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
