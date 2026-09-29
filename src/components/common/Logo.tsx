import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  light = true
}) => {
  const imgSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }[size];

  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow behind logo */}
        <div className="absolute inset-0 rounded-full bg-[#18C8D8]/20 blur-md group-hover:bg-[#18C8D8]/40 transition-all duration-300" />
        <img
          src="/logo.jpg"
          alt="VELORA"
          className={`${imgSize} rounded-full object-cover relative z-10 border border-[#18C8D8]/30 shadow-md group-hover:scale-105 transition-transform duration-300`}
        />
      </div>

      <div className="flex flex-col text-left">
        <span
          className={`font-black tracking-[0.22em] uppercase leading-none font-sans ${textSize} ${
            light ? 'text-white' : 'text-[#071A2F]'
          }`}
          style={{ letterSpacing: '0.2em' }}
        >
          VELORA
        </span>
        {showTagline && (
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#D9A441] font-semibold mt-1">
            See The World Differently
          </span>
        )}
      </div>
    </Link>
  );
};
