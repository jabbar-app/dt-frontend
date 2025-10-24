import { Text } from '@react-three/drei';
import type { Room } from '../types';

interface RoomLabelProps {
  room: Room;
  floorLevel: number;
}

export function RoomLabel({ room, floorLevel }: RoomLabelProps) {
  const floorHeight = (floorLevel - 1) * 3;
  
  return (
    <Text
      position={[room.center.x, floorHeight + 0.2, -room.center.y]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.8}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#000000"
    >
      {room.name}
    </Text>
  );
}
