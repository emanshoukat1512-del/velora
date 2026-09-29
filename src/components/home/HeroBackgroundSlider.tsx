import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, MapPin, Compass } from 'lucide-react';

export interface DestinationSlide {
  id: string;
  tag: string;           // e.g. "EXPLORE SWITZERLAND"
  title: string;         // e.g. "Zermatt & The Matterhorn"
  region: string;        // e.g. "Valais, Swiss Alps"
  coordinates: string;   // e.g. "45.9765° N, 7.7491° E"
  imageUrl: string;
  panDirection: 'scale-up' | 'pan-left' | 'pan-right' | 'pan-up';
}

const DESTINATION_SLIDES: DestinationSlide[] = [
  {
    id: 'switzerland',
    tag: 'EXPLORE SWITZERLAND',
    title: 'The Majestic Swiss Alps',
    region: 'Zermatt & Glacier Express',
    coordinates: '45.9765° N, 7.7491° E',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'scale-up'
  },
  {
    id: 'santorini',
    tag: 'DISCOVER SANTORINI',
    title: 'Cobalt Aegean Horizons',
    region: 'Oia Cliffside Caldera, Greece',
    coordinates: '36.4618° N, 25.3753° E',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-right'
  },
  {
    id: 'maldives',
    tag: 'EXPERIENCE MALDIVES',
    title: 'Bioluminescent Coral Atolls',
    region: 'North Malé Luxury Reserves',
    coordinates: '3.2028° N, 73.2207° E',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'scale-up'
  },
  {
    id: 'dubai',
    tag: 'WITNESS DUBAI',
    title: 'Futuristic Architectural Marvels',
    region: 'Downtown & Arabian Dunes, UAE',
    coordinates: '25.2048° N, 55.2708° E',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-left'
  },
  {
    id: 'bali',
    tag: 'EXPERIENCE BALI',
    title: 'Emerald Terraces & Sacred Temples',
    region: 'Ubud Valley, Indonesia',
    coordinates: '8.3405° S, 115.0920° E',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-up'
  },
  {
    id: 'cappadocia',
    tag: 'DISCOVER CAPPADOCIA',
    title: 'Dawn Hot Air Balloon Sanctuaries',
    region: 'Göreme Valley, Turkey',
    coordinates: '38.6431° N, 34.8289° E',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'scale-up'
  },
  {
    id: 'paris',
    tag: 'EXPLORE PARIS',
    title: 'Haute Twilight on the Seine',
    region: 'Île-de-France, Paris',
    coordinates: '48.8566° N, 2.3522° E',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-right'
  },
  {
    id: 'iceland',
    tag: 'DISCOVER ICELAND',
    title: 'Glacial Lagoons & Aurora Skies',
    region: 'Vatnajökull & Diamond Beach',
    coordinates: '64.9631° N, 19.0208° W',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-left'
  },
  {
    id: 'kyoto',
    tag: 'EXPERIENCE KYOTO',
    title: 'Historic Zen Sanctuaries',
    region: 'Arashiyama & Higashiyama, Japan',
    coordinates: '35.0116° N, 135.7681° E',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-up'
  },
  {
    id: 'borabora',
    tag: 'ESCAPE TO BORA BORA',
    title: 'Mount Otemanu Crystal Lagoon',
    region: 'Society Islands, French Polynesia',
    coordinates: '16.5004° S, 151.7415° W',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'scale-up'
  },
  {
    id: 'norway',
    tag: 'EXPLORE NORWEGIAN FJORDS',
    title: 'Cascading Glacial Waters',
    region: 'Geirangerfjord & Nærøyfjord',
    coordinates: '62.1015° N, 7.0941° E',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-left'
  },
  {
    id: 'newyork',
    tag: 'EXPERIENCE NEW YORK',
    title: 'Metropolitan Horizon at Dusk',
    region: 'Manhattan Skyline, United States',
    coordinates: '40.7128° N, 74.0060° W',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2160&q=85',
    panDirection: 'pan-right'
  }
];

interface HeroBackgroundSliderProps {
  scrollProgress?: number;
}

export const HeroBackgroundSlider: React.FC<HeroBackgroundSliderProps> = ({
  scrollProgress = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check system prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Preload upcoming slides
  useEffect(() => {
    const preloadIndexes = [
      (currentIndex + 1) % DESTINATION_SLIDES.length,
      (currentIndex + 2) % DESTINATION_SLIDES.length
    ];
    preloadIndexes.forEach((idx) => {
      const img = new Image();
      img.src = DESTINATION_SLIDES[idx].imageUrl;
    });
  }, [currentIndex]);

  // Initial preload of first 3 images on mount
  useEffect(() => {
    [0, 1, 2].forEach((idx) => {
      const img = new Image();
      img.src = DESTINATION_SLIDES[idx].imageUrl;
    });
  }, []);

  // Slide transition handlers
  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % DESTINATION_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 1600);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + DESTINATION_SLIDES.length) % DESTINATION_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 1600);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1600);
  }, [currentIndex]);

  // Auto rotation timer (5.5s display)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, goToNext]);

  // Parallax subtle offset with depth
  const parallaxOffset = scrollProgress * 60;
  const currentSlide = DESTINATION_SLIDES[currentIndex];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 
        ============================================================
        LAYER 1: CINEMATIC DESTINATION IMAGES (Dual-Buffered crossfade)
        ============================================================
      */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(0, ${parallaxOffset * 0.25}px, 0)`
        }}
      >
        {DESTINATION_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          // Calculate pan/zoom style for Ken Burns
          let transformStyle = 'scale(1.04) translate3d(0, 0, 0)';
          if (isActive && !prefersReducedMotion) {
            switch (slide.panDirection) {
              case 'scale-up':
                transformStyle = 'scale(1.10) translate3d(0, 0, 0)';
                break;
              case 'pan-left':
                transformStyle = 'scale(1.09) translate3d(-1.5%, 0, 0)';
                break;
              case 'pan-right':
                transformStyle = 'scale(1.09) translate3d(1.5%, 0, 0)';
                break;
              case 'pan-up':
                transformStyle = 'scale(1.09) translate3d(0, -1.2%, 0)';
                break;
            }
          }

          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                transition: prefersReducedMotion
                  ? 'opacity 800ms ease'
                  : 'opacity 1600ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                loading={index < 2 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-center will-change-transform"
                style={{
                  transform: transformStyle,
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'transform 6000ms cubic-bezier(0.2, 0.9, 0.4, 1)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 
        ============================================================
      {/* 
        ============================================================
        LAYER 2: CINEMATIC LIGHTING, VIGNETTES & TEXT READABILITY
        Ensures the 3D globe and hero typography remain 100% crisp
        while keeping destination images vivid, colorful, and sharp
        ============================================================
      */}
      {/* Subtle darkening to balance vivid travel photography with hero readability */}
      <div className="absolute inset-0 bg-[#061321]/35 pointer-events-none z-[1]" />

      {/* Radial soft spotlight vignette: center is illuminated, edges melt into midnight theme */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(6, 19, 33, 0.1) 0%, rgba(6, 19, 33, 0.55) 60%, rgba(6, 19, 33, 0.9) 100%)'
        }}
      />

      {/* Deep gradient fade at the top for navbar and status badge clarity */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#061321]/90 via-[#061321]/50 to-transparent pointer-events-none z-[1]" />

      {/* Deep gradient fade at the bottom to merge seamlessly with the page body */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#061321] via-[#061321]/75 to-transparent pointer-events-none z-[1]" />

      {/* Subtle brand cyan atmospheric glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#18C8D8]/10 blur-[130px] rounded-full pointer-events-none z-[1]" />

      {/* 
        ============================================================
        LAYER 3: DESTINATION TITLE BADGE (Bottom-Left)
        Animates smoothly with fade-in & upward movement
        ============================================================
      */}
      <div className="absolute bottom-8 left-4 sm:left-8 lg:left-12 z-30 pointer-events-auto max-w-sm hidden sm:block">
        <div
          key={`badge-${currentIndex}`}
          className="group backdrop-blur-xl bg-[#061321]/75 hover:bg-[#071A2F]/90 border border-white/10 hover:border-[#18C8D8]/40 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/60 transition-all duration-500 will-change-transform animate-fadeIn"
          style={{
            animationDuration: '700ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18C8D8] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#18C8D8]">
              {currentSlide.tag}
            </span>
          </div>

          <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
            {currentSlide.title}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 font-light mt-1">
            <span className="flex items-center gap-1 text-slate-400 truncate">
              <MapPin className="w-3 h-3 text-[#18C8D8]/80 shrink-0" />
              {currentSlide.region}
            </span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline truncate">
              {currentSlide.coordinates}
            </span>
          </div>
        </div>
      </div>

      {/* 
        ============================================================
        LAYER 4: DESTINATION INDICATOR & MINIMAL CONTROLS (Bottom-Right)
        ============================================================
      */}
      <div className="absolute bottom-8 right-4 sm:right-8 lg:right-12 z-30 pointer-events-auto">
        <div className="backdrop-blur-xl bg-[#061321]/75 border border-white/10 rounded-2xl p-2 sm:p-2.5 flex items-center gap-3 shadow-2xl shadow-black/60">
          {/* Numeric Indicator */}
          <div className="px-2.5 py-1 text-xs font-mono font-medium text-slate-300 flex items-center gap-1">
            <span className="text-white font-bold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-slate-400">
              {String(DESTINATION_SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Dots Indicator (visible on larger screens) */}
          <div className="hidden lg:flex items-center gap-1.5 px-1">
            {DESTINATION_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Jump to destination ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIndex
                    ? 'w-5 h-1.5 bg-[#18C8D8] shadow-sm shadow-[#18C8D8]/50'
                    : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Interactive Micro Controls */}
          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              aria-label="Previous destination"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause background rotation' : 'Play background rotation'}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#18C8D8] hover:text-white hover:bg-[#18C8D8]/20 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              aria-label="Next destination"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        ============================================================
        LAYER 5: MOBILE SLIDE INDICATOR (Ultra-compact for mobile)
        ============================================================
      */}
      <div className="sm:hidden absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061321]/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
          <Compass className="w-3 h-3 text-[#18C8D8] animate-spin" style={{ animationDuration: '10s' }} />
          <span className="font-semibold text-white truncate max-w-[170px]">
            {currentSlide.title}
          </span>
          <span className="text-[#18C8D8] font-mono">
            {String(currentIndex + 1).padStart(2, '0')}/{DESTINATION_SLIDES.length}
          </span>
        </div>
      </div>
    </div>
  );
};
