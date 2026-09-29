import React, { useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

interface PinMarkerProps {
  lat: number;
  lng: number;
  name: string;
  country: string;
  slug: string;
  startingPrice: number;
  radius?: number;
  onSelect?: (slug: string) => void;
}

export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export const PinMarker: React.FC<PinMarkerProps> = ({
  lat,
  lng,
  name,
  country,
  slug,
  startingPrice,
  radius = 2.02,
  onSelect
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const position = latLngToVector3(lat, lng, radius);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(slug);
    } else {
      navigate(`/destinations/${slug}`);
    }
  };

  return (
    <group position={position}>
      {/* Glowing Pin Bead */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={handleClick}
        scale={hovered ? [1.4, 1.4, 1.4] : [1, 1, 1]}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#D9A441' : '#18C8D8'}
          emissive={hovered ? '#D9A441' : '#18C8D8'}
          emissiveIntensity={hovered ? 1.5 : 0.8}
        />
      </mesh>

      {/* Pulsing Base Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.08, 16]} />
        <meshBasicMaterial
          color={hovered ? '#D9A441' : '#18C8D8'}
          transparent
          opacity={hovered ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Popover on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.15, 0]} center>
          <div
            onClick={handleClick}
            className="cursor-pointer bg-[#061321]/95 text-white border border-[#18C8D8]/50 rounded-xl p-2.5 shadow-2xl backdrop-blur-md whitespace-nowrap animate-fadeIn min-w-[130px] pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white">{name}</span>
              <span className="text-[10px] text-[#D9A441] font-semibold">${startingPrice}</span>
            </div>
            <p className="text-[10px] text-slate-400">{country}</p>
            <span className="text-[9px] text-[#18C8D8] mt-1 block font-medium">Click to explore →</span>
          </div>
        </Html>
      )}
    </group>
  );
};
