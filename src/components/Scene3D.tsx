import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloorPlan } from './FloorPlan';
import { CameraMarkers } from './CameraMarkers';
import { AnchorMarkers } from './AnchorMarkers';
import { FloorSelector } from './FloorSelector';
import { Entities } from './Entities';
import { useAppStore } from '../store';
import { DummyDataGenerator } from '../data/dummyDataGenerator';

// Initialize dummy data generator
const dataGenerator = new DummyDataGenerator();

export function Scene3D() {
  const floors = useAppStore(state => state.floors);
  const selectedFloorId = useAppStore(state => state.selectedFloorId);
  const isPlaybackMode = useAppStore(state => state.isPlaybackMode);
  const setFloors = useAppStore(state => state.setFloors);
  const setCameras = useAppStore(state => state.setCameras);
  const setAnchors = useAppStore(state => state.setAnchors);
  const setEntities = useAppStore(state => state.setEntities);
  const setAlerts = useAppStore(state => state.setAlerts);
  const setOccupancy = useAppStore(state => state.setOccupancy);
  const analyticsTimeRange = useAppStore(state => state.analyticsTimeRange);
  const setOccupancyTrend = useAppStore(state => state.setOccupancyTrend);
  const setHeatmapData = useAppStore(state => state.setHeatmapData);

  // Initialize data on mount
  useEffect(() => {
    // Load floor plan data
    const floorData = dataGenerator.getFloors();
    setFloors(floorData);
    
    // Load camera and anchor locations
    setCameras(dataGenerator.getCameras());
    setAnchors(dataGenerator.getAnchors());

    // Start real-time updates only if not in playback mode
    if (!isPlaybackMode) {
      dataGenerator.start((data) => {
        setEntities(data.entities);
        setAlerts(data.alerts);
        setOccupancy(data.occupancy);
      });
    }

    // Cleanup on unmount
    return () => {
      dataGenerator.stop();
    };
  }, [setFloors, setCameras, setAnchors, setEntities, setAlerts, setOccupancy, isPlaybackMode]);

  // Stop/start real-time updates when playback mode changes
  useEffect(() => {
    if (isPlaybackMode) {
      dataGenerator.stop();
    } else {
      dataGenerator.start((data) => {
        setEntities(data.entities);
        setAlerts(data.alerts);
        setOccupancy(data.occupancy);
      });
    }

    return () => {
      if (!isPlaybackMode) {
        dataGenerator.stop();
      }
    };
  }, [isPlaybackMode, setEntities, setAlerts, setOccupancy]);

  // Update analytics data when time range changes
  useEffect(() => {
    const timeRangeHours = analyticsTimeRange === '1h' ? 1 :
                           analyticsTimeRange === '6h' ? 6 :
                           analyticsTimeRange === '24h' ? 24 : 168; // 7 days
    
    // Generate occupancy trend data
    const trendData = dataGenerator.generateOccupancyTrend(timeRangeHours);
    setOccupancyTrend(trendData);

    // Generate heatmap data for selected floor
    if (selectedFloorId) {
      const heatmap = dataGenerator.generateHeatmap(selectedFloorId);
      setHeatmapData(heatmap);
    }
  }, [analyticsTimeRange, selectedFloorId, setOccupancyTrend, setHeatmapData]);

  // Get selected floor or default to first floor
  const selectedFloor = floors.find(f => f.floor_id === selectedFloorId) || floors[0];

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows>
        {/* Camera setup */}
        <PerspectiveCamera 
          makeDefault 
          position={[20, 30, 20]} 
          fov={60}
        />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[20, 40, 20]} 
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <hemisphereLight 
          color="#ffffff"
          groundColor="#444444"
          intensity={0.3}
        />

        {/* Floor plan */}
        {selectedFloor && <FloorPlan floor={selectedFloor} />}

        {/* Camera markers */}
        {selectedFloor && <CameraMarkers floorId={selectedFloor.floor_id} />}

        {/* Anchor markers */}
        {selectedFloor && <AnchorMarkers floorId={selectedFloor.floor_id} />}

        {/* Real-time entities with trajectories and labels */}
        {selectedFloor && <Entities floorId={selectedFloor.floor_id} />}

        {/* Orbit controls for camera navigation */}
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.1}
        />

        {/* Grid helper for reference */}
        <gridHelper args={[100, 100, '#444444', '#222222']} />
      </Canvas>

      {/* Floor selector UI */}
      <FloorSelector />
    </div>
  );
}
