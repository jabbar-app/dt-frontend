export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Animated spinner */}
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Command Center</h2>
        <p className="text-gray-400 animate-pulse">Initializing digital twin...</p>
      </div>
    </div>
  );
}
