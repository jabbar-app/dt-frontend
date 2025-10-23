import { create } from 'zustand';
import type { Floor, FusedEntity, Alert, OccupancyData, CameraLocation, AnchorLocation } from '../types';

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
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
}

export const useAppStore = create<AppState>((set, get) => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  
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
}));
