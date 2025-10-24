import { create } from 'zustand';
import type { Floor, FusedEntity, Alert, OccupancyData, CameraLocation, AnchorLocation, OccupancyTrendData, HeatmapData } from '../types';

export type TimeRange = '1h' | '6h' | '24h' | '7d';

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Simulation-only view
  isSimulationOnly: boolean;
  setIsSimulationOnly: (enabled: boolean) => void;
  
  // Floor data
  floors: Floor[];
  selectedFloorId: string | null;
  setFloors: (floors: Floor[]) => void;
  setSelectedFloorId: (floorId: string) => void;
  
  // Camera and anchor data
  cameras: CameraLocation[];
  anchors: AnchorLocation[];
  setCameras: (cameras: CameraLocation[]) => void;
  setAnchors: (anchors: AnchorLocation[]) => void;
  
  // Real-time data
  entities: FusedEntity[];
  alerts: Alert[];
  occupancy: OccupancyData[];
  setEntities: (entities: FusedEntity[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setOccupancy: (occupancy: OccupancyData[]) => void;
  
  // Alert management
  selectedAlert: string | null;
  setSelectedAlert: (alertId: string | null) => void;
  acknowledgeAlert: (alertId: string) => void;
  
  // Room highlighting
  highlightedRoomId: string | null;
  setHighlightedRoomId: (roomId: string | null) => void;
  
  // Analytics
  analyticsTimeRange: TimeRange;
  setAnalyticsTimeRange: (range: TimeRange) => void;
  occupancyTrend: OccupancyTrendData[];
  setOccupancyTrend: (data: OccupancyTrendData[]) => void;
  heatmapData: HeatmapData | null;
  setHeatmapData: (data: HeatmapData | null) => void;
  showAnalytics: boolean;
  setShowAnalytics: (show: boolean) => void;
  
  // Playback mode
  isPlaybackMode: boolean;
  setIsPlaybackMode: (mode: boolean) => void;
  playbackStartTime: number;
  playbackEndTime: number;
  playbackCurrentTime: number;
  setPlaybackTimeRange: (start: number, end: number) => void;
  setPlaybackCurrentTime: (time: number) => void;
  playbackFilterFloorId: string | null;
  playbackFilterRoomId: string | null;
  setPlaybackFilterFloorId: (floorId: string | null) => void;
  setPlaybackFilterRoomId: (roomId: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  
  // Simulation-only view
  isSimulationOnly: false,
  setIsSimulationOnly: (enabled: boolean) => set({ isSimulationOnly: enabled }),
  
  floors: [],
  selectedFloorId: null,
  setFloors: (floors: Floor[]) => set({ 
    floors,
    selectedFloorId: floors.length > 0 ? floors[0].floor_id : null 
  }),
  setSelectedFloorId: (floorId: string) => set({ selectedFloorId: floorId }),
  
  cameras: [],
  anchors: [],
  setCameras: (cameras: CameraLocation[]) => set({ cameras }),
  setAnchors: (anchors: AnchorLocation[]) => set({ anchors }),
  
  entities: [],
  alerts: [],
  occupancy: [],
  setEntities: (entities: FusedEntity[]) => set({ entities }),
  setAlerts: (alerts: Alert[]) => set({ alerts }),
  setOccupancy: (occupancy: OccupancyData[]) => set({ occupancy }),
  
  selectedAlert: null,
  setSelectedAlert: (alertId: string | null) => {
    set({ selectedAlert: alertId });
    // Highlight the room associated with the alert
    if (alertId) {
      const alert = get().alerts.find(a => a.alert_id === alertId);
      if (alert?.context.room_id) {
        set({ highlightedRoomId: alert.context.room_id });
      }
    } else {
      set({ highlightedRoomId: null });
    }
  },
  acknowledgeAlert: (alertId: string) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.alert_id === alertId
          ? { ...alert, status: 'acknowledged' as const }
          : alert
      ),
    }));
  },
  
  highlightedRoomId: null,
  setHighlightedRoomId: (roomId: string | null) => set({ highlightedRoomId: roomId }),
  
  // Analytics
  analyticsTimeRange: '24h',
  setAnalyticsTimeRange: (range: TimeRange) => set({ analyticsTimeRange: range }),
  occupancyTrend: [],
  setOccupancyTrend: (data: OccupancyTrendData[]) => set({ occupancyTrend: data }),
  heatmapData: null,
  setHeatmapData: (data: HeatmapData | null) => set({ heatmapData: data }),
  showAnalytics: false,
  setShowAnalytics: (show: boolean) => set({ showAnalytics: show }),
  
  // Playback mode
  isPlaybackMode: false,
  setIsPlaybackMode: (mode: boolean) => set({ isPlaybackMode: mode }),
  playbackStartTime: Date.now() - 3600000, // Default: 1 hour ago
  playbackEndTime: Date.now(),
  playbackCurrentTime: Date.now() - 3600000,
  setPlaybackTimeRange: (start: number, end: number) => set({ 
    playbackStartTime: start, 
    playbackEndTime: end,
    playbackCurrentTime: start 
  }),
  setPlaybackCurrentTime: (time: number) => set({ playbackCurrentTime: time }),
  playbackFilterFloorId: null,
  playbackFilterRoomId: null,
  setPlaybackFilterFloorId: (floorId: string | null) => set({ playbackFilterFloorId: floorId }),
  setPlaybackFilterRoomId: (roomId: string | null) => set({ playbackFilterRoomId: roomId }),
}));
