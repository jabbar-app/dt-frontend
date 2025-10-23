import { useMemo, useRef } from 'react';
import { useAppStore } from '../store';
import { EntityAvatar } from './EntityAvatar';
import { EntityTrajectory } from './EntityTrajectory';
import { EntityLabel } from './EntityLabel';

interface EntitiesProps {
  floorId: string;
}

export function Entities({ floorId }: EntitiesProps) {
  const entities = useAppStore(state => state.entities);
  
  // Store previous positions for smooth interpolation
  const previousPositionsRef = useRef<Map<string, { x: number; y: number; z: number }>>(new Map());

  // Filter entities for the current floor
  const floorEntities = useMemo(() => {
    return entities.filter(entity => entity.floor_id === floorId);
  }, [entities, floorId]);

  // Update previous positions and get target positions for interpolation
  const entitiesWithTargets = useMemo(() => {
    return floorEntities.map(entity => {
      const prevPos = previousPositionsRef.current.get(entity.entity_id);
      const targetPosition = { ...entity.position };

      // Store current position as previous for next frame
      previousPositionsRef.current.set(entity.entity_id, targetPosition);

      return {
        entity,
        targetPosition,
        initialPosition: prevPos || targetPosition,
      };
    });
  }, [floorEntities]);

  // Clean up positions for entities that no longer exist
  useMemo(() => {
    const currentIds = new Set(floorEntities.map(e => e.entity_id));
    const storedIds = Array.from(previousPositionsRef.current.keys());
    
    storedIds.forEach(id => {
      if (!currentIds.has(id)) {
        previousPositionsRef.current.delete(id);
      }
    });
  }, [floorEntities]);

  return (
    <group>
      {entitiesWithTargets.map(({ entity, targetPosition }) => (
        <group key={entity.entity_id}>
          {/* Entity avatar with smooth interpolation */}
          <EntityAvatar entity={entity} targetPosition={targetPosition} />
          
          {/* Trajectory path (last 30 seconds) */}
          <EntityTrajectory entity={entity} />
          
          {/* Entity label with ID and gender */}
          <EntityLabel entity={entity} />
        </group>
      ))}
    </group>
  );
}
