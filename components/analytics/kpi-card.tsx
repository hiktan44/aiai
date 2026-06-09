import { cn } from '@/lib/utils';

export interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: number; // yüzde değişim (+/−)
  icon: React.ReactNode;
}

/** KpiCard — tekil metrik kartı (Server Component). */
export function KpiCard({ label, value, delta, icon }: KpiCardProps) {
  const isPositive = (delta ?? 0) >= 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="font-display text-3xl font-bold text-foreground">{value}</span>
        {delta !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-xs font-medium',
              isPositive ? 'text-success' : 'text-error',
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(!isPositive && 'rotate-180')}
              aria-hidden
            >
              <path d="m5 12 7-7 7 7M12 5v14" />
            </svg>
            {Math.abs(delta)}%
          </span>
        )}
      </div>
    </div>
  );
}
