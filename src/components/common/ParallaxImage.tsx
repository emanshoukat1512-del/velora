import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  hoverZoom?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[16/10]',
  hoverZoom = true
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#071A2F] ${aspectRatio} ${containerClassName}`}
    >
      {/* Skeleton / Ambient glow placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
      )}

      {/* Image with viewport reveal (scale 0.96 -> 1, opacity 0 -> 1) and desktop hover zoom (scale 1 -> 1.04) */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${
          isVisible && isLoaded
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-[0.96]'
        } ${
          hoverZoom
            ? 'hover:scale-[1.04] transition-transform duration-500 ease-out'
            : ''
        } ${className}`}
      />
    </div>
  );
};
