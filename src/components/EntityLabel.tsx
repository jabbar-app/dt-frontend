import { Html } from '@react-three/drei';
import type { FusedEntity } from '../types';

interface EntityLabelProps {
  entity: FusedEntity;
}

// Gender icons
const GENDER_ICONS = {
  male: '♂',
  female: '♀',
  unknown: '?',
};

export function EntityLabel({ entity }: EntityLabelProps) {
  const genderIcon = entity.gender ? GENDER_ICONS[entity.gender] : '';
  const displayId = entity.entity_id.split('-')[1]?.substring(0, 6) || entity.entity_id.substring(0, 8);

  return (
    <Html
      position={[entity.position.x, entity.position.z + 2.2, entity.position.y]}
      center
      distanceFactor={8}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-1">
          <span className="font-mono">{displayId}</span>
          {entity.gender && entity.gender !== 'unknown' && (
            <span className="text-sm">{genderIcon}</span>
          )}
        </div>
        {entity.tag_id && (
          <div className="text-[10px] text-gray-400 mt-0.5">
            Tag: {entity.tag_id.split('-')[1]?.substring(0, 4)}
          </div>
        )}
      </div>
    </Html>
  );
}
