import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { generateOrbitalCurve } from './FlightPath';

export const TravelerAirplane: React.FC = () => {
  const planeRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const curve = useMemo(() => generateOrbitalCurve(2.85, 2.3, 0.45), []);

  useFrame((_, delta) => {
    if (!planeRef.current) return;

    // Advance airplane along path
    progressRef.current = (progressRef.current + delta * 0.08) % 1;

    const point = curve.getPointAt(progressRef.current);
    const tangent = curve.getTangentAt(progressRef.current).normalize();

    planeRef.current.position.copy(point);

    // Orient plane forward along tangent
    const lookAtTarget = point.clone().add(tangent);
    planeRef.current.lookAt(lookAtTarget);
  });

  return (
    <group ref={planeRef} scale={[0.18, 0.18, 0.18]}>
      {/* Fuselage */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.28, 2.2, 16]} />
        <meshStandardMaterial
          color="#F8FAFC"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshStandardMaterial
          color="#18C8D8"
          emissive="#18C8D8"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Main Wings */}
      <mesh position={[0, -0.02, 0.1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.04, 0.65]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Wingtip Gold Accents */}
      <mesh position={[1.6, 0.08, 0.1]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.08, 0.25, 0.4]} />
        <meshStandardMaterial color="#D9A441" emissive="#D9A441" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-1.6, 0.08, 0.1]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.08, 0.25, 0.4]} />
        <meshStandardMaterial color="#D9A441" emissive="#D9A441" emissiveIntensity={0.6} />
      </mesh>

      {/* Tail Fin */}
      <mesh position={[0, 0.4, -0.9]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[0.04, 0.6, 0.5]} />
        <meshStandardMaterial color="#086A9A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Tail Stabilizers */}
      <mesh position={[0, 0.05, -0.95]}>
        <boxGeometry args={[1.1, 0.03, 0.35]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Jet Engines */}
      <mesh position={[0.7, -0.22, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.7, -0.22, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Contrail / Engine Glow Point Light */}
      <pointLight color="#18C8D8" intensity={1.5} distance={1.2} />
    </group>
  );
};
