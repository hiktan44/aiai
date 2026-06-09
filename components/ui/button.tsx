import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_0_24px_rgba(99,102,241,0.18)] focus-visible:ring-primary',
  secondary:
    'bg-surface-elevated text-foreground hover:bg-surface border border-border focus-visible:ring-border',
  ghost:
    'bg-transparent text-muted hover:text-foreground hover:bg-surface focus-visible:ring-border',
  outline:
    'bg-transparent text-foreground border border-border hover:border-primary hover:text-primary focus-visible:ring-primary',
  destructive: 'bg-error text-white hover:opacity-90 focus-visible:ring-error',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

/**
 * Buton sınıflarını üretir. <Link> gibi anchor tabanlı öğeleri buton gibi
 * stillemek için kullanılır (geçersiz <a><button> iç içe yapısını önler).
 */
export function buttonClassName(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}): string {
  const { variant = 'primary', size = 'md', className } = opts ?? {};
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
    'transition-all duration-200 outline-none',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName({ variant, size, className })}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
