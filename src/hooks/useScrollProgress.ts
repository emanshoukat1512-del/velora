import { useState, useEffect } from 'react';
import { getGlobalLenis } from '../components/common/SmoothScrollProvider';

let globalScrollProgress = 0;
export const getGlobalScrollProgress = () => globalScrollProgress;

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleProgress = (progress: number) => {
      globalScrollProgress = progress;
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // If Lenis is active, subscribe directly to its smooth scroll event
    const lenis = getGlobalLenis();
    if (lenis) {
      const onLenisScroll = (e: any) => {
        handleProgress(e.progress ?? 0);
      };
      lenis.on('scroll', onLenisScroll);

      return () => {
        lenis.off('scroll', onLenisScroll);
      };
    }

    // Fallback if Lenis is disabled or reduced motion is on
    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      handleProgress(Math.min(Math.max(current, 0), 1));
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return scrollProgress;
}
