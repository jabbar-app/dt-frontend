import { useAppStore } from '../store';

interface DemoControlsProps {
  onRestart: () => void;
}

export function DemoControls({ onRestart }: DemoControlsProps) {
  const isPlaybackMode = useAppStore(state => state.isPlaybackMode);
  const showAnalytics = useAppStore(state => state.showAnalytics);
  const setShowAnalytics = useAppStore(state => state.setShowAnalytics);

  return (
    <div className="absolute bottom-4 right-[420px] z-20 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-3 space-y-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        Demo Controls
      </h3>
      
      <button
        onClick={onRestart}
        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors flex items-center justify-center gap-2"
        title="Restart simulation (R)"
      >
        <span>🔄</span>
        <span>Restart Simulation</span>
      </button>

      {!isPlaybackMode && (
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className={`w-full px-3 py-2 text-sm font-medium rounded transition-colors flex items-center justify-center gap-2 ${
            showAnalytics
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
          title="Toggle analytics (A)"
        >
          <span>📊</span>
          <span>{showAnalytics ? 'Hide' : 'Show'} Analytics</span>
        </button>
      )}

      <div className="pt-2 border-t border-gray-700 text-xs text-gray-400 space-y-1">
        <div className="flex justify-between">
          <span>Space:</span>
          <span className="text-gray-300">Play/Pause</span>
        </div>
        <div className="flex justify-between">
          <span>←/→:</span>
          <span className="text-gray-300">Navigate</span>
        </div>
        <div className="flex justify-between">
          <span>A:</span>
          <span className="text-gray-300">Analytics</span>
        </div>
        <div className="flex justify-between">
          <span>R:</span>
          <span className="text-gray-300">Restart</span>
        </div>
      </div>
    </div>
  );
}
