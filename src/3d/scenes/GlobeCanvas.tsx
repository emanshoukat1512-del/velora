import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarsBackground } from '../globe/StarsBackground';
import { EarthGlobe } from '../globe/EarthGlobe';

interface GlobeCanvasProps {
  scrollProgress?: number;
  onSelectDestination?: (slug: string) => void;
}

export const GlobeCanvas: React.FC<GlobeCanvasProps> = ({
  scrollProgress = 0,
  onSelectDestination
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 ... 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 1.8]} // Adaptive DPR for crisp retina without killing GPU
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Deep space stars */}
          <StarsBackground count={900} />

          {/* Cinematic Lighting */}
          <ambientLight intensity={0.4} color="#38BDF8" />
          
          {/* Sun / Key Light */}
          <directionalLight
            position={[6, 4, 5]}
            intensity={2.2}
            color="#FFFBEB"
          />

          {/* Electric Cyan Rim / Fill Light */}
          <directionalLight
            position={[-5, -2, -3]}
            intensity={1.1}
            color="#18C8D8"
          />

          {/* Warm Gold Accent Underlight */}
          <pointLight
            position={[0, -4, 2]}
            intensity={0.6}
            color="#D9A441"
          />

          {/* Earth & Orbital Path */}
          <EarthGlobe
            scrollProgress={scrollProgress}
            mousePosition={prefersReducedMotion ? { x: 0, y: 0 } : mousePos}
            onSelectDestination={onSelectDestination}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
