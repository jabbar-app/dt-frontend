import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Floor } from '../types';
import { useAppStore } from '../store';

interface FloorPlanProps {
  floor: Floor;
}

export function FloorPlan({ floor }: FloorPlanProps) {
  const highlightedRoomId = useAppStore(state => state.highlightedRoomId);

  // Generate floor geometry from room boundaries
  const floorGeometry = useMemo(() => {
    const shapes: THREE.Shape[] = [];

    floor.rooms.forEach(room => {
      const shape = new THREE.Shape();

      // Create shape from boundary points
      room.boundary.forEach((point, index) => {
        if (index === 0) {
          shape.moveTo(point.x, point.y);
        } else {
          shape.lineTo(point.x, point.y);
        }
      });
      shape.closePath();

      shapes.push(shape);
    });

    return shapes;
  }, [floor]);

  // Calculate floor level height (3 meters per floor)
  const floorHeight = (floor.level - 1) * 3;

  return (
    <group position={[0, floorHeight, 0]}>
      {/* Render each room as an extruded polygon */}
      {floor.rooms.map((room, index) => {
        const shape = floorGeometry[index];
        const isHighlighted = highlightedRoomId === room.room_id;

        // Get color based on zone type
        const getZoneColor = () => {
          if (isHighlighted) {
            return '#fbbf24'; // yellow for highlighted
          }
          switch (room.zone_type) {
            case 'restricted':
              return '#ef4444'; // red
            case 'private':
              return '#f59e0b'; // amber
            default:
              return '#3b82f6'; // blue
          }
        };

        return (
          <group key={room.room_id}>
            {/* Floor surface */}
            <mesh
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial
                color={isHighlighted ? '#fef3c7' : '#1f2937'}
                side={THREE.DoubleSide}
                transparent
                opacity={isHighlighted ? 0.95 : 0.9}
              />
            </mesh>

            {/* Room walls (extruded boundaries) */}
            <mesh
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
            >
              <extrudeGeometry
                args={[
                  shape,
                  {
                    depth: 0.1,
                    bevelEnabled: false,
                  },
                ]}
              />
              <meshStandardMaterial
                color={getZoneColor()}
                transparent
                opacity={isHighlighted ? 0.9 : 0.6}
                side={THREE.DoubleSide}
                emissive={isHighlighted ? '#fbbf24' : '#000000'}
                emissiveIntensity={isHighlighted ? 0.3 : 0}
              />
            </mesh>

            {/* Room boundary lines */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <lineSegments>
                <edgesGeometry
                  args={[
                    new THREE.ExtrudeGeometry(shape, {
                      depth: 0.1,
                      bevelEnabled: false,
                    })
                  ]}
                />
                <lineBasicMaterial
                  color={isHighlighted ? '#fbbf24' : '#ffffff'}
                  linewidth={isHighlighted ? 3 : 2}
                />
              </lineSegments>
            </group>

            {/* Room label */}
            <Text
              position={[room.center.x, 0.15, -room.center.y]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={isHighlighted ? 1.0 : 0.8}
              color={isHighlighted ? '#fbbf24' : '#ffffff'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {room.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
