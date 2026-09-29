import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#18C8D8]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2 font-medium tracking-wide',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold tracking-wide'
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#086A9A] via-[#129FB0] to-[#18C8D8] text-white shadow-lg shadow-[#18C8D8]/20 hover:shadow-[#18C8D8]/40 hover:brightness-110 hover:-translate-y-0.5',
    gold:
      'bg-gradient-to-r from-[#B88329] via-[#D9A441] to-[#F0C96F] text-[#071A2F] font-semibold shadow-lg shadow-[#D9A441]/25 hover:shadow-[#D9A441]/45 hover:brightness-105 hover:-translate-y-0.5',
    outline:
      'border border-[#18C8D8]/50 text-[#18C8D8] hover:bg-[#18C8D8]/10 hover:border-[#18C8D8]',
    ghost:
      'text-slate-300 hover:text-white hover:bg-white/10',
    glass:
      'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30'
  }[variant];

  const content = (
    <>
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      
      <span>{children}</span>
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
