import { useAppStore } from '../store';

export function FloorSelector() {
  const floors = useAppStore(state => state.floors);
  const selectedFloorId = useAppStore(state => state.selectedFloorId);
  const setSelectedFloorId = useAppStore(state => state.setSelectedFloorId);

  if (floors.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-4 backdrop-blur-sm">
        <div className="text-white text-sm font-semibold mb-2 text-center">
          Select Floor
        </div>
        <div className="flex gap-2">
          {floors.map(floor => (
            <button
              key={floor.floor_id}
              onClick={() => setSelectedFloorId(floor.floor_id)}
              className={`
                px-4 py-2 rounded-md font-medium transition-all
                ${selectedFloorId === floor.floor_id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              <div className="text-xs opacity-75">Level {floor.level}</div>
              <div className="text-sm">{floor.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
