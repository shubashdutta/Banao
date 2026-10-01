import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  href,
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-5 py-3 sm:px-6 sm:py-3.5 gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#FF6B35] text-white hover:bg-[#e85925] shadow-sm hover:shadow-md hover:shadow-[#FF6B35]/20 border border-transparent',
    outline:
      'bg-white/80 hover:bg-neutral-50 text-neutral-800 border border-neutral-300 hover:border-neutral-400 shadow-2xs',
    white:
      'bg-white text-neutral-900 hover:bg-neutral-100 shadow-md hover:shadow-lg border border-transparent',
    secondary:
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200',
    ghost:
      'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 border border-transparent',
  }[variant];

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          className="transition-transform duration-200 group-hover:translate-x-1 shrink-0"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        className={`group ${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`group ${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
