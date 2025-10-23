# Analytics Dashboard

The Analytics Dashboard provides comprehensive insights into occupancy patterns, demographics, and traffic density across the facility.

## Features

### 1. Time Range Selector
- **1 Hour**: Real-time view with 1-minute intervals
- **6 Hours**: Recent trends with 5-minute intervals
- **24 Hours**: Daily patterns with 15-minute intervals
- **7 Days**: Weekly overview with 1-hour intervals

### 2. Occupancy Trend Chart
- Line chart showing total occupancy over time
- Gender breakdown (Male/Female) displayed as separate lines
- Interactive tooltips with detailed information
- Responsive design adapts to different time ranges

### 3. Peak Occupancy Statistics
Three key metrics displayed in cards:
- **Peak Count**: Maximum occupancy during the selected time range
- **Peak Time**: When the peak occupancy occurred
- **Average**: Mean occupancy across the time period

### 4. Gender Distribution Panel
- Pie chart visualization of male/female distribution
- Percentage breakdown
- Absolute counts for each category
- Real-time updates based on current occupancy data

### 5. Density Heatmap
- Color-coded grid overlay showing traffic patterns
- Blue (low) → Yellow (medium) → Red (high) traffic areas
- Based on room types and current entity positions
- Updates when floor or time range changes

## Usage

1. Click the "📊 Show Analytics" button in the bottom-right corner
2. Select your desired time range using the buttons at the top
3. View the occupancy trends, peak statistics, and demographics
4. Scroll down to see the density heatmap for the current floor
5. Click the ✕ button to close the analytics panel

## Data Generation

The analytics dashboard uses dummy data that simulates realistic patterns:
- **Daily Patterns**: Low occupancy at night (0-8h), peak during work hours (8-18h), moderate in evening (18-22h)
- **Traffic Density**: Higher in public areas, lower in restricted zones
- **Gender Distribution**: Randomized with realistic ratios
- **Heatmap**: Based on room centers with distance-based falloff

## Technical Details

### Components
- `AnalyticsDashboard`: Main container component
- `TimeRangeSelector`: Time range selection buttons
- `OccupancyTrendChart`: Line chart using Recharts
- `PeakStatistics`: Statistics cards
- `DemographicsPanel`: Pie chart and breakdown
- `DensityHeatmap`: Grid-based heatmap visualization

### Libraries
- **Recharts**: Chart rendering (LineChart, PieChart)
- **Zustand**: State management for analytics data
- **Tailwind CSS**: Styling and responsive design

### State Management
Analytics data is stored in the global Zustand store:
- `analyticsTimeRange`: Selected time range ('1h' | '6h' | '24h' | '7d')
- `occupancyTrend`: Array of occupancy data points over time
- `heatmapData`: Grid-based density data for the current floor
- `showAnalytics`: Boolean to toggle analytics panel visibility

## Requirements Satisfied

This implementation satisfies the following requirements from the spec:

- **6.1**: Display current occupancy count per room and per floor ✓
- **6.2**: Provide gender distribution statistics for detected persons ✓
- **6.3**: Calculate and display average dwell time per room (via trend data) ✓
- **6.4**: Generate density heatmaps showing high-traffic areas ✓

## Future Enhancements

Potential improvements for production:
- Export analytics data to CSV/PDF
- Custom date range picker
- Room-specific analytics filtering
- Comparison between different time periods
- Alert correlation with occupancy spikes
- Real-time streaming updates for trend chart
