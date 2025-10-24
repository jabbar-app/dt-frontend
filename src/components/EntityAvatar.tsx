import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import type { FusedEntity } from '../types';

interface EntityAvatarProps {
  entity: FusedEntity;
  targetPosition: { x: number; y: number; z: number };
}

// Color mapping based on source
const SOURCE_COLORS = {
  cv_only: '#3b82f6', // Blue
  uwb_only: '#10b981', // Green
  fused: '#a855f7', // Purple
};

export function EntityAvatar({ entity, targetPosition }: EntityAvatarProps) {
  const meshRef = useRef<Mesh>(null);

  // Smooth position interpolation
  useFrame(() => {
    if (meshRef.current) {
      const current = meshRef.current.position;
      const lerpFactor = 0.15; // Smoothing factor (lower = smoother)

      current.x += (targetPosition.x - current.x) * lerpFactor;
      current.y += (targetPosition.z + 0.9 - current.y) * lerpFactor; // Y is height
      current.z += ((-targetPosition.y) - current.z) * lerpFactor;
    }
  });

  const color = SOURCE_COLORS[entity.source];

  return (
    <group>
      {/* Simple humanoid representation using cylinders */}
      <mesh
        ref={meshRef}
        position={[entity.position.x, entity.position.z + 0.9, -entity.position.y]}
        castShadow
      >
        {/* Body */}
        <cylinderGeometry args={[0.2, 0.25, 1.2, 8]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Head */}
      <mesh
        position={[entity.position.x, entity.position.z + 1.7, -entity.position.y]}
        castShadow
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}
