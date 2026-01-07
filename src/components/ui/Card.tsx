import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'luxury';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}


const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

const variantClasses = {
    default: 'bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl',
    glass: 'glass-card',
    luxury: 'luxury-card',
};

export function Card({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    hover = false,
    onClick,
}: CardProps) {
    const baseClasses = variantClasses[variant];
    const paddingClass = paddingClasses[padding];
    const hoverClass = hover && variant !== 'glass' ? 'transition-all duration-300 hover:border-[rgba(255,255,255,0.12)] hover:translate-y-[-2px]' : '';
    const clickableClass = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`${baseClasses} ${paddingClass} ${hoverClass} ${clickableClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return (
        <h3 className={`text-lg font-semibold text-[var(--text-primary)] ${className}`}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return (
        <p className={`text-sm text-[var(--text-secondary)] mt-1 ${className}`}>
            {children}
        </p>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`mt-4 pt-4 border-t border-[var(--glass-border)] ${className}`}>
            {children}
        </div>
    );
}
