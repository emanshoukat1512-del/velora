import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Atmosphere: React.FC<{ radius?: number }> = ({ radius = 2.05 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Soft atmospheric glow material
  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec3 vNormal;
    void main() {
      // Fresnel intensity: higher at the edges
      float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      vec3 glowColor = vec3(0.09, 0.78, 0.85); // Electric cyan #18C8D8
      gl_FragColor = vec4(glowColor, intensity * 0.7);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[radius, radius, radius]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};
