# Entity Visualization Components

This document describes the real-time entity visualization system implemented for Task 4.

## Components Created

### 1. EntityAvatar.tsx
- **Purpose**: Renders a 3D humanoid representation of each tracked entity
- **Features**:
  - Simple humanoid mesh using cylinders (body) and sphere (head)
  - Color-coded by source type:
    - CV-only: Blue (#3b82f6)
    - UWB-only: Green (#10b981)
    - Fused: Purple (#a855f7)
  - Smooth position interpolation using `useFrame` hook
  - Emissive materials for better visibility
  - Casts shadows for realistic rendering

### 2. EntityTrajectory.tsx
- **Purpose**: Renders the movement path for each entity
- **Features**:
  - Displays last 30 seconds of movement (up to 300 points at 10 Hz)
  - Line path rendered slightly above ground (0.1m)
  - Color-coded to match entity source
  - Semi-transparent (60% opacity) for visual clarity
  - Automatically updates as entity moves

### 3. EntityLabel.tsx
- **Purpose**: Displays entity information as HTML overlay
- **Features**:
  - Shows shortened entity ID (first 6-8 characters)
  - Gender icon display (♂ for male, ♀ for female)
  - Tag ID display for UWB-tracked entities
  - Positioned above entity head (2.2m height)
  - Dark background with blur effect for readability
  - Scales with camera distance

### 4. Entities.tsx
- **Purpose**: Main container component managing all entities on a floor
- **Features**:
  - Filters entities by current floor
  - Manages smooth position interpolation state
  - Cleans up stale entity data
  - Renders all entity components (avatar, trajectory, label)
  - Optimized with useMemo for performance

## Integration

The `Entities` component is integrated into `Scene3D.tsx` and automatically:
- Receives real-time entity updates from the Zustand store
- Filters entities for the currently selected floor
- Updates at 10 Hz (100ms intervals) from the dummy data generator
- Provides smooth animations between position updates

## Color Coding System

| Source Type | Color | Hex Code | Meaning |
|-------------|-------|----------|---------|
| cv_only | Blue | #3b82f6 | Detected by computer vision only |
| uwb_only | Green | #10b981 | Tracked by UWB positioning only |
| fused | Purple | #a855f7 | Correlated data from both CV and UWB |

## Performance Considerations

- Position interpolation happens in the render loop for smooth 60 FPS animation
- Trajectory points are limited to 300 (30 seconds at 10 Hz)
- Entity filtering by floor reduces render load
- Memoization prevents unnecessary re-renders
- HTML labels use distance-based scaling

## Requirements Met

✅ **1.1**: Real-time position updates displayed within 100-200ms  
✅ **1.2**: Continuous position updates at 10 Hz refresh rate  
✅ **1.4**: Entity movement tracked and displayed continuously  
✅ **1.5**: Movement trails showing last 30 seconds of history  

## Milestone Achievement

🎯 **First viewable dashboard with animated movement** - Complete!

Users can now:
- See all entities moving in real-time on the 3D floor plan
- Distinguish between different tracking sources by color
- View entity trajectories to understand movement patterns
- Identify entities by ID and demographic information
- Navigate the 3D scene with smooth camera controls
