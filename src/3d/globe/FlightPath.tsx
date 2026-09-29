import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface FlightPathProps {
  radiusX?: number;
  radiusY?: number;
  tiltAngle?: number;
}

export function generateOrbitalCurve(radiusX = 2.8, radiusY = 2.2, tilt = 0.45): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    // Elliptical ring
    const x = Math.cos(theta) * radiusX;
    const z = Math.sin(theta) * radiusY;
    // Apply tilt around X and Z
    const y = Math.sin(theta) * radiusY * Math.sin(tilt);
    const tiltedX = x * Math.cos(tilt * 0.5) - z * Math.sin(tilt * 0.5);
    const tiltedZ = x * Math.sin(tilt * 0.5) + z * Math.cos(tilt * 0.5);

    points.push(new THREE.Vector3(tiltedX, y, tiltedZ));
  }

  return new THREE.CatmullRomCurve3(points, true);
}

export const FlightPath: React.FC<FlightPathProps> = ({
  radiusX = 2.85,
  radiusY = 2.3,
  tiltAngle = 0.45
}) => {
  const curve = useMemo(() => generateOrbitalCurve(radiusX, radiusY, tiltAngle), [radiusX, radiusY, tiltAngle]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.015, 8, true);
  }, [curve]);

  return (
    <group>
      {/* Golden Glowing Orbital Path */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#D9A441"
          emissive="#D9A441"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Subtle outer halo around the ring */}
      <mesh geometry={tubeGeometry} scale={[1.05, 1.05, 1.05]}>
        <meshBasicMaterial
          color="#FBE08D"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
