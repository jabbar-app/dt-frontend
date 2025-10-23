import { useEffect, useState } from 'react';
import { Scene3D } from './components/Scene3D';
import { OccupancyDashboard } from './components/OccupancyDashboard';
import { AlertBanner } from './components/AlertBanner';
import { AlertPanel } from './components/AlertPanel';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { PlaybackPanel } from './components/PlaybackPanel';
import { PlaybackControls } from './components/PlaybackControls';
import { Header } from './components/Header';
import { DemoControls } from './components/DemoControls';
import { LoadingScreen } from './components/LoadingScreen';
import { useAppStore } from './store';
import { usePlaybackManager } from './hooks/usePlaybackManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { DummyDataGenerator } from './data/dummyDataGenerator';
import type { FusedEntity } from './types';

function App() {
  const showAnalytics = useAppStore(state => state.showAnalytics);
  const setShowAnalytics = useAppStore(state => state.setShowAnalytics);
  const selectedFloorId = useAppStore(state => state.selectedFloorId);
  const setSelectedFloorId = useAppStore(state => state.setSelectedFloorId);
  const floors = useAppStore(state => state.floors);
  const {
    isPlaybackMode,
    playbackStartTime,
    playbackEndTime,
    playbackCurrentTime,
    playbackFilterFloorId,
    playbackFilterRoomId,
  } = useAppStore();

  const [historicalData, setHistoricalData] = useState<Map<number, FusedEntity[]> | null>(null);
  const [dataGenerator] = useState(() => new DummyDataGenerator());
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    isPlaying,
    playbackSpeed,
    handlePlayPause,
    handleSeek,
    handleSpeedChange,
  } = usePlaybackManager(historicalData);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Generate historical data when entering playback mode
  useEffect(() => {
    if (isPlaybackMode) {
      console.log('Generating historical data...');
      const data = dataGenerator.generateHistoricalData(
        playbackStartTime,
        playbackEndTime,
        playbackFilterFloorId,
        playbackFilterRoomId
      );
      setHistoricalData(data);
      console.log(`Generated ${data.size} time snapshots`);
    } else {
      setHistoricalData(null);
    }
  }, [isPlaybackMode, playbackStartTime, playbackEndTime, playbackFilterFloorId, playbackFilterRoomId]);

  // Restart simulation handler
  const handleRestart = () => {
    console.log('Restarting simulation...');
    window.location.reload();
  };

  // Navigate between floors
  const handleNavigateFloors = (direction: 'up' | 'down') => {
    if (floors.length === 0 || !selectedFloorId) return;
    
    const currentIndex = floors.findIndex(f => f.floor_id === selectedFloorId);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === 'up') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : floors.length - 1;
    } else {
      newIndex = currentIndex < floors.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedFloorId(floors[newIndex].floor_id);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onPlayPause: isPlaybackMode ? handlePlayPause : undefined,
    onRestart: handleRestart,
    onToggleAnalytics: () => setShowAnalytics(!showAnalytics),
    onNavigateUp: () => handleNavigateFloors('up'),
    onNavigateDown: () => handleNavigateFloors('down'),
  });

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden transition-colors duration-300">
      <Header />
      
      <PlaybackPanel />
      
      {isPlaybackMode && (
        <div className="animate-slide-down">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            currentTime={playbackCurrentTime}
            startTime={playbackStartTime}
            endTime={playbackEndTime}
            onSeek={handleSeek}
            playbackSpeed={playbackSpeed}
            onSpeedChange={handleSpeedChange}
          />
        </div>
      )}
      
      {!isPlaybackMode && (
        <div className="animate-fade-in">
          <AlertBanner />
          <AlertPanel />
        </div>
      )}
      
      <div className="animate-slide-up">
        <OccupancyDashboard />
      </div>
      
      {showAnalytics && (
        <div className="animate-scale-in">
          <AnalyticsDashboard />
        </div>
      )}
      
      <DemoControls onRestart={handleRestart} />
      
      <Scene3D />
    </div>
  );
}

export default App;
