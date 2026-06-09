import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Erişilebilir form input'u — her zaman bağlı bir <label> ile gelir (a11y).
 * Hata durumunda aria-invalid + aria-describedby ile ekran okuyuculara bildirir.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const describedById = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById}
          className={cn(
            'h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-foreground',
            'placeholder:text-muted/60 transition-colors outline-none',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            error
              ? 'border-error focus-visible:ring-error'
              : 'border-border focus-visible:border-primary focus-visible:ring-primary',
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
