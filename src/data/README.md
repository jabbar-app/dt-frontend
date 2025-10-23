# Dummy Data Generator

This module provides a complete dummy data generator for the Command Center demo dashboard.

## Features

- **3 Floors** with 4-5 rooms each (total 14 rooms)
- **20-40 Entities** with realistic movement patterns
- **Real-time Updates** at 10 Hz (100ms intervals)
- **Automatic Alerts** generated every 30-60 seconds
- **Occupancy Tracking** with gender demographics
- **Camera and Anchor Locations** for visualization

## Usage

```typescript
import { DummyDataGenerator } from './dummyDataGenerator';

// Create generator instance
const generator = new DummyDataGenerator();

// Get static data
const floors = generator.getFloors();
const cameras = generator.getCameras();
const anchors = generator.getAnchors();

// Start real-time updates
generator.start((data) => {
  console.log('Entities:', data.entities.length);
  console.log('Occupancy:', data.occupancy);
  console.log('Active Alerts:', data.alerts.length);
  
  // Update your UI with the data
  // updateDashboard(data);
});

// Stop updates when done
// generator.stop();

// Interact with alerts
generator.acknowledgeAlert('alert-id');
generator.resolveAlert('alert-id');
```

## Data Structures

### FusedEntity
Represents a tracked person with position, trajectory, and metadata.

### Room
Defines room boundaries, capacity, and zone type.

### Floor
Contains multiple rooms and floor metadata.

### Alert
System alerts with severity levels and context.

### OccupancyData
Real-time occupancy counts with demographics.

## Movement Simulation

Entities move realistically:
- Random walk within current room
- Periodic room changes (every 10-30 seconds)
- Can move between adjacent floors
- Maintains 30-second trajectory history (300 points at 10 Hz)
- Respects room boundaries

## Alert Generation

Alerts are generated randomly with:
- **Info**: Normal activity notifications
- **Warning**: High occupancy warnings
- **Critical**: Threshold violations and unauthorized access
- Auto-resolution for some alerts after 5-20 seconds
