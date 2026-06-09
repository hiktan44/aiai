import { cn } from '@/lib/utils';

/** LinkSpark marka logosu — SVG-first (CLAUDE.md). */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="LinkSpark"
      >
        <defs>
          <linearGradient id="ls-grad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#ls-grad)" />
        <path
          d="M13 9.5l-3.2 5.5h3.4L11 22.5l8.2-9.5h-3.6L18.5 9.5H13z"
          fill="#ffffff"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Link<span className="text-gradient">Spark</span>
        </span>
      )}
    </span>
  );
}
