import { Sphere, Cone } from '@react-three/drei';
import type { CameraLocation } from '../types';

interface CameraMarkerProps {
  camera: CameraLocation;
}

export function CameraMarker({ camera }: CameraMarkerProps) {
  return (
    <group position={[camera.position.x, camera.position.y, camera.position.z]}>
      {/* Camera body (sphere) */}
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Camera lens direction indicator (cone) */}
      <Cone 
        args={[0.1, 0.3, 8]} 
        position={[0, 0, -0.25]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#059669" />
      </Cone>
      
      {/* Camera label would go here if needed */}
    </group>
  );
}
