import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Atmosphere } from './Atmosphere';
import { FlightPath } from './FlightPath';
import { TravelerAirplane } from './TravelerAirplane';
import { PinMarker } from './PinMarker';
import { createEarthCanvasTexture, createCloudsCanvasTexture } from './earthTextures';
import { mockDestinations } from '../../data/mockData';
import { getGlobalLenis } from '../../components/common/SmoothScrollProvider';

interface EarthGlobeProps {
  scrollProgress?: number;
  mousePosition?: { x: number; y: number };
  onSelectDestination?: (slug: string) => void;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({
  scrollProgress = 0,
  mousePosition = { x: 0, y: 0 },
  onSelectDestination
}) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);

  // Generate textures once
  const earthTexture = useMemo(() => createEarthCanvasTexture(), []);
  const cloudsTexture = useMemo(() => createCloudsCanvasTexture(), []);

  useFrame((_, delta) => {
    // Gentle natural rotation
    if (earthMeshRef.current) {
      earthMeshRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y += delta * 0.065;
    }

    // Subtle parallax response to mouse coordinates
    if (globeGroupRef.current) {
      const targetRotX = mousePosition.y * 0.15;
      const targetRotY = mousePosition.x * 0.25;

      globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        globeGroupRef.current.rotation.y,
        targetRotY,
        0.05
      );

      // Read exact synchronized smooth scroll progress from Lenis
      const lenis = getGlobalLenis();
      const currentScrollProgress = lenis ? lenis.progress : scrollProgress;

      // Scroll storytelling zoom & slight tilt
      const scrollScale = 1 + currentScrollProgress * 0.35;
      globeGroupRef.current.scale.set(scrollScale, scrollScale, scrollScale);
      globeGroupRef.current.position.y = -currentScrollProgress * 0.4;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Central Rotating Earth Mesh */}
      <mesh ref={earthMeshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.15}
          bumpScale={0.05}
        />

        {/* Destination Pins attached to Earth surface so they rotate in lockstep */}
        {mockDestinations.map((dest) => (
          <PinMarker
            key={dest.id}
            lat={dest.coordinates.lat}
            lng={dest.coordinates.lng}
            name={dest.name}
            country={dest.country}
            slug={dest.slug}
            startingPrice={dest.startingPrice}
            onSelect={onSelectDestination}
          />
        ))}
      </mesh>

      {/* Atmospheric Cloud Sphere */}
      <mesh ref={cloudsMeshRef} scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Soft Cyan Fresnel Glow */}
      <Atmosphere radius={2.08} />

      {/* Golden Orbital Flight Path & Traveling Jet (VELORA Emblem) */}
      <FlightPath radiusX={2.7} radiusY={2.2} tiltAngle={0.4} />
      <TravelerAirplane />
    </group>
  );
};
