import { useAppStore } from '../store';
import { Sphere, Cone, Text } from '@react-three/drei';

interface CameraMarkersProps {
  floorId: string;
}

export function CameraMarkers({ floorId }: CameraMarkersProps) {
  const cameras = useAppStore(state => state.cameras);
  
  // Filter cameras for the selected floor
  const floorCameras = cameras.filter(camera => camera.floor_id === floorId);

  return (
    <group>
      {floorCameras.map(camera => (
        <group key={camera.camera_id} position={[camera.position.x, camera.position.y, camera.position.z]}>
          {/* Camera body (sphere) */}
          <Sphere args={[0.3, 16, 16]} castShadow>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
          </Sphere>
          
          {/* Camera lens/direction indicator (cone) */}
          <Cone 
            args={[0.2, 0.4, 8]} 
            position={[0, -0.3, 0]}
            rotation={[Math.PI, 0, 0]}
            castShadow
          >
            <meshStandardMaterial color="#059669" />
          </Cone>

          {/* Camera label */}
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.4}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            📹
          </Text>
        </group>
      ))}
    </group>
  );
}
