import { useAppStore } from '../store';
import { useMemo, useState } from 'react';

export function OccupancyDashboard() {
  const occupancy = useAppStore(state => state.occupancy);
  const floors = useAppStore(state => state.floors);
  const selectedFloorId = useAppStore(state => state.selectedFloorId);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Calculate floor-level occupancy
  const floorOccupancy = useMemo(() => {
    const floorMap = new Map<string, {
      floor_id: string;
      name: string;
      level: number;
      current_count: number;
      capacity: number;
      male_count: number;
      female_count: number;
      percentage: number;
    }>();

    floors.forEach(floor => {
      floorMap.set(floor.floor_id, {
        floor_id: floor.floor_id,
        name: floor.name,
        level: floor.level,
        current_count: 0,
        capacity: 0,
        male_count: 0,
        female_count: 0,
        percentage: 0,
      });
    });

    occupancy.forEach(occ => {
      const floorData = floorMap.get(occ.floor_id);
      if (floorData) {
        floorData.current_count += occ.current_count;
        floorData.capacity += occ.capacity;
        floorData.male_count += occ.male_count;
        floorData.female_count += occ.female_count;
      }
    });

    floorMap.forEach(floorData => {
      floorData.percentage = floorData.capacity > 0 
        ? (floorData.current_count / floorData.capacity) * 100 
        : 0;
    });

    return Array.from(floorMap.values()).sort((a, b) => a.level - b.level);
  }, [occupancy, floors]);

  // Filter rooms by selected floor
  const roomOccupancy = useMemo(() => {
    if (!selectedFloorId) return occupancy;
    return occupancy.filter(occ => occ.floor_id === selectedFloorId);
  }, [occupancy, selectedFloorId]);

  // Calculate total gender distribution for selected floor
  const genderDistribution = useMemo(() => {
    const data = selectedFloorId 
      ? occupancy.filter(occ => occ.floor_id === selectedFloorId)
      : occupancy;
    
    const totalMale = data.reduce((sum, occ) => sum + occ.male_count, 0);
    const totalFemale = data.reduce((sum, occ) => sum + occ.female_count, 0);
    const totalUnknown = data.reduce((sum, occ) => 
      sum + (occ.current_count - occ.male_count - occ.female_count), 0
    );
    const total = totalMale + totalFemale + totalUnknown;

    return {
      male: totalMale,
      female: totalFemale,
      unknown: totalUnknown,
      total,
      malePercent: total > 0 ? (totalMale / total) * 100 : 0,
      femalePercent: total > 0 ? (totalFemale / total) * 100 : 0,
      unknownPercent: total > 0 ? (totalUnknown / total) * 100 : 0,
    };
  }, [occupancy, selectedFloorId]);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId === selectedRoomId ? null : roomId);
    // TODO: Highlight room on 3D view (will be implemented in future task)
  };

  const getOccupancyColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getOccupancyBgColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="absolute top-20 right-4 w-96 max-h-[calc(100vh-6rem)] overflow-y-auto bg-gray-800 bg-opacity-95 rounded-lg shadow-lg p-4 space-y-4">
      {/* Floor Summary Cards */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Floor Occupancy</h2>
        <div className="space-y-2">
          {floorOccupancy.map(floor => (
            <div 
              key={floor.floor_id}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedFloorId === floor.floor_id 
                  ? 'bg-blue-900 bg-opacity-50 border-blue-500' 
                  : 'bg-gray-700 border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">{floor.name}</h3>
                <span className={`text-2xl font-bold ${getOccupancyColor(floor.percentage)}`}>
                  {floor.current_count}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
                <span>Capacity: {floor.capacity}</span>
                <span className={getOccupancyColor(floor.percentage)}>
                  {floor.percentage.toFixed(0)}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getOccupancyBgColor(floor.percentage)}`}
                  style={{ width: `${Math.min(floor.percentage, 100)}%` }}
                />
              </div>
              {/* Gender distribution mini bar */}
              <div className="flex gap-2 text-xs text-gray-400">
                <span>♂ {floor.male_count}</span>
                <span>♀ {floor.female_count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">
          Gender Distribution
          {selectedFloorId && (
            <span className="text-sm text-gray-400 ml-2">
              ({floors.find(f => f.floor_id === selectedFloorId)?.name})
            </span>
          )}
        </h2>
        <div className="bg-gray-700 p-3 rounded-lg">
          {/* Horizontal bar chart */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Male</span>
                <span className="font-semibold">{genderDistribution.male} ({genderDistribution.malePercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${genderDistribution.malePercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Female</span>
                <span className="font-semibold">{genderDistribution.female} ({genderDistribution.femalePercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${genderDistribution.femalePercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Unknown</span>
                <span className="font-semibold">{genderDistribution.unknown} ({genderDistribution.unknownPercent.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-gray-400 h-3 rounded-full transition-all"
                  style={{ width: `${genderDistribution.unknownPercent}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-600 text-center">
            <span className="text-white font-semibold text-lg">Total: {genderDistribution.total}</span>
          </div>
        </div>
      </div>

      {/* Room Occupancy List */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">
          Room Occupancy
          {selectedFloorId && (
            <span className="text-sm text-gray-400 ml-2">
              ({floors.find(f => f.floor_id === selectedFloorId)?.name})
            </span>
          )}
        </h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {roomOccupancy.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No rooms to display</p>
          ) : (
            roomOccupancy.map(room => {
              const roomData = floors
                .flatMap(f => f.rooms)
                .find(r => r.room_id === room.room_id);
              
              return (
                <div
                  key={room.room_id}
                  onClick={() => handleRoomClick(room.room_id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedRoomId === room.room_id
                      ? 'bg-blue-900 bg-opacity-50 border-blue-500'
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-650'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-medium text-sm">
                      {roomData?.name || 'Unknown Room'}
                    </h3>
                    <span className={`text-xl font-bold ${getOccupancyColor(room.percentage)}`}>
                      {room.current_count}/{room.capacity}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getOccupancyBgColor(room.percentage)}`}
                      style={{ width: `${Math.min(room.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 text-xs text-gray-400">
                      <span>♂ {room.male_count}</span>
                      <span>♀ {room.female_count}</span>
                    </div>
                    <span className={`text-xs font-semibold ${getOccupancyColor(room.percentage)}`}>
                      {room.percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
