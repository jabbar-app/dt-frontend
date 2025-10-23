import { useState } from 'react';
import { useAppStore } from '../store';

export function PlaybackPanel() {
  const {
    isPlaybackMode,
    setIsPlaybackMode,
    setPlaybackTimeRange,
    playbackFilterFloorId,
    playbackFilterRoomId,
    setPlaybackFilterFloorId,
    setPlaybackFilterRoomId,
    floors,
  } = useAppStore();

  const [showPanel, setShowPanel] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartPlayback = () => {
    // Parse date and time inputs
    const start = new Date(`${startDate}T${startTime}`).getTime();
    const end = new Date(`${endDate}T${endTime}`).getTime();

    if (isNaN(start) || isNaN(end)) {
      alert('Please enter valid date and time values');
      return;
    }

    if (start >= end) {
      alert('Start time must be before end time');
      return;
    }

    setPlaybackTimeRange(start, end);
    setIsPlaybackMode(true);
    setShowPanel(false);
  };

  const handleExitPlayback = () => {
    setIsPlaybackMode(false);
    setPlaybackFilterFloorId(null);
    setPlaybackFilterRoomId(null);
  };

  const handleQuickSelect = (hours: number) => {
    const now = new Date();
    const end = now.getTime();
    const start = end - (hours * 60 * 60 * 1000);

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    setStartDate(startDateObj.toISOString().split('T')[0]);
    setStartTime(startDateObj.toTimeString().slice(0, 5));
    setEndDate(endDateObj.toISOString().split('T')[0]);
    setEndTime(endDateObj.toTimeString().slice(0, 5));
  };

  // Get rooms for selected floor
  const selectedFloor = floors.find(f => f.floor_id === playbackFilterFloorId);
  const rooms = selectedFloor?.rooms || [];

  return (
    <>
      {/* Toggle Button - moved to not overlap with header */}
      <button
        onClick={() => isPlaybackMode ? handleExitPlayback() : setShowPanel(!showPanel)}
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-30 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 ${
          isPlaybackMode
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isPlaybackMode ? (
          <>
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
            Exit Playback
          </>
        ) : (
          <>
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Historical Playback
          </>
        )}
      </button>

      {/* Configuration Panel */}
      {showPanel && !isPlaybackMode && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-96 animate-slide-down">
          <h2 className="text-xl font-bold text-white mb-4">Historical Playback</h2>

          {/* Quick Select Buttons */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 6, 24, 168].map(hours => (
                <button
                  key={hours}
                  onClick={() => handleQuickSelect(hours)}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                >
                  {hours < 24 ? `${hours}h` : `${hours / 24}d`}
                </button>
              ))}
            </div>
          </div>

          {/* Start Date/Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date & Time
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* End Date/Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date & Time
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Floor Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filter by Floor (Optional)
            </label>
            <select
              value={playbackFilterFloorId || ''}
              onChange={(e) => {
                setPlaybackFilterFloorId(e.target.value || null);
                setPlaybackFilterRoomId(null); // Reset room filter
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Floors</option>
              {floors.map(floor => (
                <option key={floor.floor_id} value={floor.floor_id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room Filter */}
          {playbackFilterFloorId && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Room (Optional)
              </label>
              <select
                value={playbackFilterRoomId || ''}
                onChange={(e) => setPlaybackFilterRoomId(e.target.value || null)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Rooms</option>
                {rooms.map(room => (
                  <option key={room.room_id} value={room.room_id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleStartPlayback}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Start Playback
            </button>
            <button
              onClick={() => setShowPanel(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
