import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = '', id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 py-3 
            bg-[var(--bg-secondary)] 
            border border-[var(--glass-border)]
            rounded-lg 
            text-[var(--text-primary)]
            placeholder-[var(--text-muted)]
            focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]
            transition-colors duration-200
            ${error ? 'border-[var(--status-error)] focus:border-[var(--status-error)] focus:ring-[var(--status-error)]' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-[var(--status-error)]">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
