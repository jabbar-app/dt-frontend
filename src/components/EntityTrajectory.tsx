import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import type { FusedEntity } from '../types';

interface EntityTrajectoryProps {
  entity: FusedEntity;
}

// Color mapping based on source (same as avatar)
const SOURCE_COLORS = {
  cv_only: '#3b82f6', // Blue
  uwb_only: '#10b981', // Green
  fused: '#a855f7', // Purple
};

export function EntityTrajectory({ entity }: EntityTrajectoryProps) {
  // Convert trajectory to Three.js coordinates (X,Z on plane, Y is height)
  const points = useMemo(() => {
    if (entity.trajectory.length < 2) return [];
    
    return entity.trajectory.map(point => [
      point.x,
      point.z + 0.1, // Slightly above ground (Y)
      -point.y,
    ] as [number, number, number]);
  }, [entity.trajectory]);

  if (points.length < 2) return null;

  const color = SOURCE_COLORS[entity.source];

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}
