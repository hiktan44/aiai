import { cn } from '@/lib/utils';

type Tone = 'primary' | 'success' | 'warning' | 'muted' | 'accent';

const tones: Record<Tone, string> = {
  primary: 'bg-primary/15 text-primary border-primary/25',
  success: 'bg-success/15 text-success border-success/25',
  warning: 'bg-warning/15 text-warning border-warning/25',
  accent: 'bg-accent/15 text-accent border-accent/25',
  muted: 'bg-surface-elevated text-muted border-border',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = 'primary', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5',
        'text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
