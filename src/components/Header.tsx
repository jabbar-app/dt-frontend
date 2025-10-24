import { useAppStore } from '../store';

export function Header() {
  const isPlaybackMode = useAppStore(state => state.isPlaybackMode);
  const isLoading = useAppStore(state => state.isLoading);
  const isSimulationOnly = useAppStore(state => state.isSimulationOnly);
  const setIsSimulationOnly = useAppStore(state => state.setIsSimulationOnly);

  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900 to-transparent">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Logo placeholder */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">CC</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Command Center
            </h1>
            <p className="text-gray-400 text-sm">
              {isPlaybackMode ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  Historical Playback Mode
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Digital Twin
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-900 bg-opacity-50 rounded-lg border border-yellow-600">
              <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-yellow-400 text-sm font-medium">Loading...</span>
            </div>
          )}
          
          {/* Company branding placeholder */}
          <div className="text-right">
            <div className="text-gray-400 text-xs uppercase tracking-wider">Powered by</div>
            <div className="text-white font-semibold">BlueIOT RTLS</div>
          </div>

          <button
            onClick={() => setIsSimulationOnly(!isSimulationOnly)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors border border-gray-600 ${
              isSimulationOnly ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
            title="Toggle simulation-only (F)"
          >
            {isSimulationOnly ? 'Show UI' : 'Hide UI'}
          </button>
        </div>
      </div>
    </header>
  );
}
