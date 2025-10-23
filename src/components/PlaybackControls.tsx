import { useAppStore } from '../store';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  startTime: number;
  endTime: number;
  onSeek: (time: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  currentTime,
  startTime,
  endTime,
  onSeek,
  playbackSpeed,
  onSpeedChange,
}: PlaybackControlsProps) {
  const isPlaybackMode = useAppStore(state => state.isPlaybackMode);

  if (!isPlaybackMode) return null;

  const duration = endTime - startTime;
  const progress = duration > 0 ? ((currentTime - startTime) / duration) * 100 : 0;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    const newTime = startTime + (duration * percent / 100);
    onSeek(newTime);
  };

  const speeds = [1, 2, 4, 8, 16];

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-[800px] transition-all duration-300">
      {/* Timestamp Display */}
      <div className="flex justify-between items-center mb-2 text-sm text-gray-300">
        <span className="font-medium">{formatDate(currentTime)}</span>
        <span className="text-lg font-mono text-white font-bold tracking-wider">
          {formatTime(currentTime)}
        </span>
        <span className="font-medium">{formatDate(endTime)}</span>
      </div>

      {/* Timeline Scrubber */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider transition-all"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #374151 ${progress}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(startTime)}</span>
          <span>{formatTime(endTime)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 font-medium">Speed:</span>
          <div className="flex gap-1">
            {speeds.map(speed => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-3 py-1 rounded text-sm transition-all duration-200 transform hover:scale-105 ${
                  playbackSpeed === speed
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
