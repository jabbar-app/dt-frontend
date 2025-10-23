import { Scene3D } from './components/Scene3D';
import { OccupancyDashboard } from './components/OccupancyDashboard';
import { AlertBanner } from './components/AlertBanner';
import { AlertPanel } from './components/AlertPanel';
import { useAppStore } from './store';

function App() {
  const isLoading = useAppStore(state => state.isLoading);

  return (
    <div className="w-full h-screen bg-gray-900">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white">Command Center - BlueIOT</h1>
        <p className="text-gray-400 text-sm">Digital Twin Dashboard</p>
        {isLoading && <p className="text-yellow-400 text-xs mt-2">Loading...</p>}
      </div>
      <AlertBanner />
      <AlertPanel />
      <OccupancyDashboard />
      <Scene3D />
    </div>
  );
}

export default App;
