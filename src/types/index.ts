// Core data types for the Command Center application

export interface FusedEntity {
  entity_id: string;
  timestamp: number;
  source: 'cv_only' | 'uwb_only' | 'fused';
  position: { x: number; y: number; z: number };
  floor_id: string;
  room_id: string;
  track_id?: string;
  tag_id?: string;
  gender?: 'male' | 'female' | 'unknown';
  confidence: number;
  trajectory: Array<{ x: number; y: number; z: number; timestamp: number }>;
  last_seen: number;
}

export interface Room {
  room_id: string;
  name: string;
  floor_id: string;
  boundary: Array<{ x: number; y: number }>;
  capacity: number;
  zone_type: 'public' | 'restricted' | 'private';
  center: { x: number; y: number }; // Calculated center point for entity spawning
}

export interface Floor {
  floor_id: string;
  name: string;
  level: number;
  rooms: Room[];
}

export interface Alert {
  alert_id: string;
  rule_id: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  context: {
    room_id?: string;
    floor_id?: string;
    entity_ids?: string[];
    count?: number;
  };
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface OccupancyData {
  room_id: string;
  floor_id: string;
  current_count: number;
  capacity: number;
  male_count: number;
  female_count: number;
  percentage: number;
}

export interface CameraLocation {
  camera_id: string;
  name: string;
  position: { x: number; y: number; z: number };
  floor_id: string;
  room_id: string;
}

export interface AnchorLocation {
  anchor_id: string;
  name: string;
  position: { x: number; y: number; z: number };
  floor_id: string;
}

export interface OccupancyTrendData {
  timestamp: number;
  count: number;
  male_count: number;
  female_count: number;
}

export interface HeatmapData {
  floor_id: string;
  grid: number[][];
  cell_size: number;
  max_value: number;
  bounds: {
    min_x: number;
    max_x: number;
    min_y: number;
    max_y: number;
  };
}
