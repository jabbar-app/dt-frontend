import type {
  FusedEntity,
  Room,
  Floor,
  Alert,
  OccupancyData,
  CameraLocation,
  AnchorLocation,
} from '../types';

// Utility functions
function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Calculate room center from boundary points (utility for future use)
// function calculateRoomCenter(boundary: Array<{ x: number; y: number }>): { x: number; y: number } {
//   const sumX = boundary.reduce((sum, point) => sum + point.x, 0);
//   const sumY = boundary.reduce((sum, point) => sum + point.y, 0);
//   return {
//     x: sumX / boundary.length,
//     y: sumY / boundary.length,
//   };
// }

// Check if point is inside polygon (room boundary)
function isPointInRoom(point: { x: number; y: number }, boundary: Array<{ x: number; y: number }>): boolean {
  let inside = false;
  for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
    const xi = boundary[i].x, yi = boundary[i].y;
    const xj = boundary[j].x, yj = boundary[j].y;
    
    const intersect = ((yi > point.y) !== (yj > point.y))
      && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Generate floor plan data
export function generateFloorPlanData(): Floor[] {
  const floors: Floor[] = [];

  // Floor 1: Ground Floor
  const floor1Rooms: Room[] = [
    {
      room_id: 'room-1-1',
      name: 'Lobby',
      floor_id: 'floor-1',
      boundary: [
        { x: 0, y: 0 },
        { x: 20, y: 0 },
        { x: 20, y: 15 },
        { x: 0, y: 15 },
      ],
      capacity: 50,
      zone_type: 'public',
      center: { x: 10, y: 7.5 },
    },
    {
      room_id: 'room-1-2',
      name: 'Conference Room A',
      floor_id: 'floor-1',
      boundary: [
        { x: 20, y: 0 },
        { x: 35, y: 0 },
        { x: 35, y: 10 },
        { x: 20, y: 10 },
      ],
      capacity: 20,
      zone_type: 'public',
      center: { x: 27.5, y: 5 },
    },
    {
      room_id: 'room-1-3',
      name: 'Cafeteria',
      floor_id: 'floor-1',
      boundary: [
        { x: 20, y: 10 },
        { x: 35, y: 10 },
        { x: 35, y: 20 },
        { x: 20, y: 20 },
      ],
      capacity: 40,
      zone_type: 'public',
      center: { x: 27.5, y: 15 },
    },
    {
      room_id: 'room-1-4',
      name: 'Security Office',
      floor_id: 'floor-1',
      boundary: [
        { x: 0, y: 15 },
        { x: 10, y: 15 },
        { x: 10, y: 20 },
        { x: 0, y: 20 },
      ],
      capacity: 5,
      zone_type: 'restricted',
      center: { x: 5, y: 17.5 },
    },
    {
      room_id: 'room-1-5',
      name: 'Storage',
      floor_id: 'floor-1',
      boundary: [
        { x: 10, y: 15 },
        { x: 20, y: 15 },
        { x: 20, y: 20 },
        { x: 10, y: 20 },
      ],
      capacity: 3,
      zone_type: 'restricted',
      center: { x: 15, y: 17.5 },
    },
  ];

  floors.push({
    floor_id: 'floor-1',
    name: 'Ground Floor',
    level: 1,
    rooms: floor1Rooms,
  });

  // Floor 2: First Floor
  const floor2Rooms: Room[] = [
    {
      room_id: 'room-2-1',
      name: 'Open Office',
      floor_id: 'floor-2',
      boundary: [
        { x: 0, y: 0 },
        { x: 25, y: 0 },
        { x: 25, y: 15 },
        { x: 0, y: 15 },
      ],
      capacity: 60,
      zone_type: 'public',
      center: { x: 12.5, y: 7.5 },
    },
    {
      room_id: 'room-2-2',
      name: 'Meeting Room B',
      floor_id: 'floor-2',
      boundary: [
        { x: 25, y: 0 },
        { x: 35, y: 0 },
        { x: 35, y: 8 },
        { x: 25, y: 8 },
      ],
      capacity: 12,
      zone_type: 'public',
      center: { x: 30, y: 4 },
    },
    {
      room_id: 'room-2-3',
      name: 'Meeting Room C',
      floor_id: 'floor-2',
      boundary: [
        { x: 25, y: 8 },
        { x: 35, y: 8 },
        { x: 35, y: 16 },
        { x: 25, y: 16 },
      ],
      capacity: 12,
      zone_type: 'public',
      center: { x: 30, y: 12 },
    },
    {
      room_id: 'room-2-4',
      name: 'Executive Suite',
      floor_id: 'floor-2',
      boundary: [
        { x: 0, y: 15 },
        { x: 15, y: 15 },
        { x: 15, y: 20 },
        { x: 0, y: 20 },
      ],
      capacity: 8,
      zone_type: 'private',
      center: { x: 7.5, y: 17.5 },
    },
    {
      room_id: 'room-2-5',
      name: 'Server Room',
      floor_id: 'floor-2',
      boundary: [
        { x: 15, y: 15 },
        { x: 25, y: 15 },
        { x: 25, y: 20 },
        { x: 15, y: 20 },
      ],
      capacity: 2,
      zone_type: 'restricted',
      center: { x: 20, y: 17.5 },
    },
  ];

  floors.push({
    floor_id: 'floor-2',
    name: 'First Floor',
    level: 2,
    rooms: floor2Rooms,
  });

  // Floor 3: Second Floor
  const floor3Rooms: Room[] = [
    {
      room_id: 'room-3-1',
      name: 'Training Room',
      floor_id: 'floor-3',
      boundary: [
        { x: 0, y: 0 },
        { x: 20, y: 0 },
        { x: 20, y: 12 },
        { x: 0, y: 12 },
      ],
      capacity: 30,
      zone_type: 'public',
      center: { x: 10, y: 6 },
    },
    {
      room_id: 'room-3-2',
      name: 'Lab A',
      floor_id: 'floor-3',
      boundary: [
        { x: 20, y: 0 },
        { x: 35, y: 0 },
        { x: 35, y: 12 },
        { x: 20, y: 12 },
      ],
      capacity: 15,
      zone_type: 'restricted',
      center: { x: 27.5, y: 6 },
    },
    {
      room_id: 'room-3-3',
      name: 'Break Room',
      floor_id: 'floor-3',
      boundary: [
        { x: 0, y: 12 },
        { x: 15, y: 12 },
        { x: 15, y: 20 },
        { x: 0, y: 20 },
      ],
      capacity: 20,
      zone_type: 'public',
      center: { x: 7.5, y: 16 },
    },
    {
      room_id: 'room-3-4',
      name: 'Lab B',
      floor_id: 'floor-3',
      boundary: [
        { x: 15, y: 12 },
        { x: 35, y: 12 },
        { x: 35, y: 20 },
        { x: 15, y: 20 },
      ],
      capacity: 15,
      zone_type: 'restricted',
      center: { x: 25, y: 16 },
    },
  ];

  floors.push({
    floor_id: 'floor-3',
    name: 'Second Floor',
    level: 3,
    rooms: floor3Rooms,
  });

  return floors;
}

// Generate camera locations
export function generateCameraLocations(floors: Floor[]): CameraLocation[] {
  const cameras: CameraLocation[] = [];
  
  floors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      // Place 1-2 cameras per room depending on size
      const numCameras = room.capacity > 30 ? 2 : 1;
      
      for (let i = 0; i < numCameras; i++) {
        cameras.push({
          camera_id: generateId('cam'),
          name: `${room.name} Camera ${i + 1}`,
          position: {
            x: room.center.x + (i === 0 ? -2 : 2),
            y: room.center.y,
            z: 2.5, // Ceiling height
          },
          floor_id: floor.floor_id,
          room_id: room.room_id,
        });
      }
    });
  });
  
  return cameras;
}

// Generate anchor locations
export function generateAnchorLocations(floors: Floor[]): AnchorLocation[] {
  const anchors: AnchorLocation[] = [];
  
  floors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      // Place 4 anchors at room corners for UWB triangulation
      const boundary = room.boundary;
      boundary.slice(0, 4).forEach((point, index) => {
        anchors.push({
          anchor_id: generateId('anchor'),
          name: `${room.name} Anchor ${index + 1}`,
          position: {
            x: point.x,
            y: point.y,
            z: 2.5,
          },
          floor_id: floor.floor_id,
        });
      });
    });
  });
  
  return anchors;
}

// Entity movement state
interface EntityMovementState {
  entity: FusedEntity;
  targetRoom: Room;
  velocity: { x: number; y: number };
  nextRoomChangeTime: number;
}

// Dummy data generator class
export class DummyDataGenerator {
  private floors: Floor[];
  private entities: Map<string, EntityMovementState> = new Map();
  private alerts: Alert[] = [];
  private updateInterval: number | null = null;
  private alertInterval: number | null = null;
  private cameras: CameraLocation[];
  private anchors: AnchorLocation[];

  constructor() {
    this.floors = generateFloorPlanData();
    this.cameras = generateCameraLocations(this.floors);
    this.anchors = generateAnchorLocations(this.floors);
    this.initializeEntities();
  }

  private initializeEntities(): void {
    // Create 20-40 entities across all floors
    const entityCount = Math.floor(randomBetween(20, 40));
    
    for (let i = 0; i < entityCount; i++) {
      const floor = randomChoice(this.floors);
      const room = randomChoice(floor.rooms);
      const source = randomChoice(['cv_only', 'uwb_only', 'fused'] as const);
      const gender = randomChoice(['male', 'female', 'unknown'] as const);
      
      const entity: FusedEntity = {
        entity_id: generateId('entity'),
        timestamp: Date.now(),
        source,
        position: {
          x: room.center.x + randomBetween(-3, 3),
          y: room.center.y + randomBetween(-3, 3),
          z: floor.level * 3, // 3 meters per floor
        },
        floor_id: floor.floor_id,
        room_id: room.room_id,
        track_id: source !== 'uwb_only' ? generateId('track') : undefined,
        tag_id: source !== 'cv_only' ? generateId('tag') : undefined,
        gender: source !== 'uwb_only' ? gender : undefined,
        confidence: randomBetween(0.7, 0.99),
        trajectory: [],
        last_seen: Date.now(),
      };

      this.entities.set(entity.entity_id, {
        entity,
        targetRoom: room,
        velocity: { x: 0, y: 0 },
        nextRoomChangeTime: Date.now() + randomBetween(5000, 15000),
      });
    }
  }

  private updateEntityPosition(state: EntityMovementState): void {
    const now = Date.now();
    const entity = state.entity;
    const room = state.targetRoom;

    // Check if it's time to change rooms
    if (now >= state.nextRoomChangeTime) {
      // Pick a new random room on the same or adjacent floor
      const currentFloor = this.floors.find(f => f.floor_id === entity.floor_id);
      if (currentFloor) {
        const possibleFloors = this.floors.filter(f => 
          Math.abs(f.level - currentFloor.level) <= 1
        );
        const newFloor = randomChoice(possibleFloors);
        const newRoom = randomChoice(newFloor.rooms);
        
        state.targetRoom = newRoom;
        state.nextRoomChangeTime = now + randomBetween(10000, 30000);
      }
    }

    // Calculate direction to target room center
    const dx = room.center.x - entity.position.x;
    const dy = room.center.y - entity.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If far from target, move towards it
    if (distance > 1) {
      const speed = 0.05; // meters per update (0.5 m/s at 10 Hz)
      state.velocity.x = (dx / distance) * speed;
      state.velocity.y = (dy / distance) * speed;
    } else {
      // Random walk within room
      state.velocity.x += randomBetween(-0.02, 0.02);
      state.velocity.y += randomBetween(-0.02, 0.02);
      
      // Limit velocity
      const speed = Math.sqrt(state.velocity.x ** 2 + state.velocity.y ** 2);
      if (speed > 0.1) {
        state.velocity.x = (state.velocity.x / speed) * 0.1;
        state.velocity.y = (state.velocity.y / speed) * 0.1;
      }
    }

    // Update position
    entity.position.x += state.velocity.x;
    entity.position.y += state.velocity.y;
    entity.position.z = state.targetRoom.floor_id === 'floor-1' ? 0 :
                        state.targetRoom.floor_id === 'floor-2' ? 3 : 6;

    // Update room if crossed boundary
    const currentFloor = this.floors.find(f => f.floor_id === entity.floor_id);
    if (currentFloor) {
      for (const r of currentFloor.rooms) {
        if (isPointInRoom({ x: entity.position.x, y: entity.position.y }, r.boundary)) {
          entity.room_id = r.room_id;
          break;
        }
      }
    }

    // Update floor if changed
    entity.floor_id = state.targetRoom.floor_id;

    // Update trajectory (keep last 30 seconds at 10 Hz = 300 points)
    entity.trajectory.push({
      x: entity.position.x,
      y: entity.position.y,
      z: entity.position.z,
      timestamp: now,
    });

    if (entity.trajectory.length > 300) {
      entity.trajectory.shift();
    }

    entity.timestamp = now;
    entity.last_seen = now;
  }

  private generateRandomAlert(): void {
    const floor = randomChoice(this.floors);
    const room = randomChoice(floor.rooms);
    const severity = randomChoice(['info', 'warning', 'critical'] as const);
    
    const alertMessages = {
      info: [
        `Normal occupancy in ${room.name}`,
        `Activity detected in ${room.name}`,
      ],
      warning: [
        `High occupancy in ${room.name}`,
        `Approaching capacity limit in ${room.name}`,
      ],
      critical: [
        `Occupancy threshold exceeded in ${room.name}`,
        `Unauthorized access detected in ${room.name}`,
        `Emergency: Overcrowding in ${room.name}`,
      ],
    };

    const alert: Alert = {
      alert_id: generateId('alert'),
      rule_id: generateId('rule'),
      timestamp: Date.now(),
      severity,
      message: randomChoice(alertMessages[severity]),
      context: {
        room_id: room.room_id,
        floor_id: floor.floor_id,
        count: Math.floor(randomBetween(room.capacity * 0.8, room.capacity * 1.2)),
      },
      status: 'active',
    };

    this.alerts.push(alert);

    // Auto-resolve some alerts after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        alert.status = 'resolved';
      }, randomBetween(5000, 20000));
    }
  }

  // Start real-time updates at 10 Hz
  start(onUpdate: (data: {
    entities: FusedEntity[];
    occupancy: OccupancyData[];
    alerts: Alert[];
  }) => void): void {
    // Update entities at 10 Hz (every 100ms)
    this.updateInterval = window.setInterval(() => {
      this.entities.forEach(state => {
        this.updateEntityPosition(state);
      });

      const entities = Array.from(this.entities.values()).map(s => s.entity);
      const occupancy = this.calculateOccupancy();
      
      onUpdate({
        entities,
        occupancy,
        alerts: this.alerts, // Pass all alerts, not just active ones
      });
    }, 100);

    // Generate new alerts every 30-60 seconds
    const generateAlert = () => {
      if (Math.random() > 0.3) { // 70% chance to generate alert
        this.generateRandomAlert();
      }
      // Schedule next alert generation
      this.alertInterval = window.setTimeout(generateAlert, randomBetween(30000, 60000));
    };
    
    // Start alert generation
    generateAlert();
  }

  stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.alertInterval) {
      clearTimeout(this.alertInterval);
      this.alertInterval = null;
    }
  }

  private calculateOccupancy(): OccupancyData[] {
    const occupancyMap = new Map<string, OccupancyData>();

    // Initialize all rooms
    this.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        occupancyMap.set(room.room_id, {
          room_id: room.room_id,
          floor_id: floor.floor_id,
          current_count: 0,
          capacity: room.capacity,
          male_count: 0,
          female_count: 0,
          percentage: 0,
        });
      });
    });

    // Count entities per room
    this.entities.forEach(state => {
      const entity = state.entity;
      const occupancy = occupancyMap.get(entity.room_id);
      if (occupancy) {
        occupancy.current_count++;
        if (entity.gender === 'male') occupancy.male_count++;
        if (entity.gender === 'female') occupancy.female_count++;
        occupancy.percentage = (occupancy.current_count / occupancy.capacity) * 100;
      }
    });

    return Array.from(occupancyMap.values());
  }

  getFloors(): Floor[] {
    return this.floors;
  }

  getCameras(): CameraLocation[] {
    return this.cameras;
  }

  getAnchors(): AnchorLocation[] {
    return this.anchors;
  }

  getEntities(): FusedEntity[] {
    return Array.from(this.entities.values()).map(s => s.entity);
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.alert_id === alertId);
    if (alert) {
      alert.status = 'acknowledged';
    }
  }

  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.alert_id === alertId);
    if (alert) {
      alert.status = 'resolved';
    }
  }
}
