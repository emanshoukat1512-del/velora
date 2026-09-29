import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export type RevealVariant = 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // In milliseconds
  duration?: number; // In milliseconds
  threshold?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  className = ''
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.98]';
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale-in':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-[0.95] translate-y-4';
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-8';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity'
      }}
      className={`transition-all duration-700 ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
};
