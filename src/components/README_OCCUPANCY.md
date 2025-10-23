# Occupancy Dashboard Component

## Overview
The `OccupancyDashboard` component provides real-time occupancy monitoring and analytics for the Command Center application. It displays occupancy data at both floor and room levels, along with gender distribution statistics.

## Features

### 1. Floor Occupancy Summary Cards
- Displays occupancy for all floors in the facility
- Shows current count, capacity, and percentage
- Color-coded indicators:
  - Green: < 70% capacity
  - Yellow: 70-89% capacity
  - Red: ≥ 90% capacity
- Visual progress bars for quick assessment
- Mini gender distribution (male/female counts)

### 2. Gender Distribution Analytics
- Horizontal bar chart showing gender breakdown
- Displays counts and percentages for:
  - Male (blue)
  - Female (pink)
  - Unknown (gray)
- Automatically filters by selected floor
- Shows total count across all categories

### 3. Room Occupancy List
- Detailed view of individual room occupancy
- Shows current count vs. capacity (e.g., "5/20")
- Color-coded percentage indicators
- Progress bars for visual representation
- Gender breakdown per room
- Click to select/highlight room (prepared for 3D integration)

## Real-time Updates
The dashboard automatically updates at 10 Hz (every 100ms) using data from the `DummyDataGenerator`. All metrics are calculated in real-time based on entity positions.

## Data Flow
1. `DummyDataGenerator` calculates occupancy from entity positions
2. Occupancy data is stored in Zustand store (`useAppStore`)
3. `OccupancyDashboard` subscribes to store updates
4. UI re-renders automatically when data changes

## Usage
The component is integrated into the main `App.tsx` and appears as a fixed panel on the right side of the screen.

```tsx
import { OccupancyDashboard } from './components/OccupancyDashboard';

function App() {
  return (
    <div>
      <OccupancyDashboard />
      {/* Other components */}
    </div>
  );
}
```

## Future Enhancements
- Room highlighting on 3D view when selected
- Historical occupancy trends
- Alert integration for threshold violations
- Export occupancy reports
