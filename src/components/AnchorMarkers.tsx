import { useAppStore } from '../store';
import { Box, Text } from '@react-three/drei';

interface AnchorMarkersProps {
  floorId: string;
}

export function AnchorMarkers({ floorId }: AnchorMarkersProps) {
  const anchors = useAppStore(state => state.anchors);
  
  // Filter anchors for the selected floor
  const floorAnchors = anchors.filter(anchor => anchor.floor_id === floorId);

  return (
    <group>
      {floorAnchors.map(anchor => (
        <group key={anchor.anchor_id} position={[anchor.position.x, anchor.position.y, anchor.position.z]}>
          {/* Anchor body (box) */}
          <Box args={[0.4, 0.4, 0.4]} castShadow>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.3} />
          </Box>

          {/* Anchor label */}
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.4}
            color="#8b5cf6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            📡
          </Text>
        </group>
      ))}
    </group>
  );
}
