import { formatNumber } from '@/lib/utils';
import type { BreakdownPoint } from '@/lib/types';

/**
 * BarList — yatay oranlı çubuk listesi (referrer, tarayıcı vb. kırılımlar).
 * Server Component; değerler yüzdeye veya ham sayıya göre normalize edilir.
 */
export function BarList({
  data,
  unit = 'count',
}: {
  data: BreakdownPoint[];
  unit?: 'count' | 'percent';
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-foreground">{d.label}</span>
            <span className="font-medium text-muted">
              {unit === 'percent' ? `%${d.value}` : formatNumber(d.value)}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
