import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'gold' | 'navy' | 'neutral' | 'success' | 'warning';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
  size = 'md'
}) => {
  const variantStyles = {
    cyan: 'bg-[#18C8D8]/10 text-[#18C8D8] border-[#18C8D8]/30',
    gold: 'bg-[#D9A441]/10 text-[#D9A441] border-[#D9A441]/30',
    navy: 'bg-[#071A2F]/80 text-white border-[#086A9A]/30',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-3 py-1 font-semibold tracking-wider'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase border backdrop-blur-sm ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
