# Alert Notification System

## Overview
The alert notification system provides real-time monitoring and alerting capabilities for the Command Center dashboard. It displays alerts with severity-based color coding, supports filtering, acknowledgment, and highlights affected rooms on the 3D floor plan.

## Components

### AlertBanner
**Location:** Top center of the screen
**Purpose:** Displays the most critical active alert as a prominent banner

**Features:**
- Shows the highest priority active alert (critical > warning > info)
- Animated pulse effect to draw attention
- Color-coded by severity:
  - 🚨 Critical: Red background
  - ⚠️ Warning: Yellow background
  - ℹ️ Info: Blue background
- Shows count of additional active alerts
- Clicking the banner opens the alert details in the AlertPanel

### AlertPanel
**Location:** Bottom left of the screen
**Purpose:** Comprehensive alert management interface

**Features:**
- Collapsible panel with expand/collapse toggle
- **Status Filtering:**
  - All: Shows all alerts
  - Active: Unacknowledged alerts requiring attention
  - Acknowledged: Alerts that have been seen but not resolved
  - Resolved: Completed alerts
- **Severity Filtering:**
  - All Severity: Shows all alert types
  - Critical: High-priority alerts (e.g., overcrowding, unauthorized access)
  - Warning: Medium-priority alerts (e.g., approaching capacity)
  - Info: Low-priority informational alerts
- **Alert Details:**
  - Severity icon and label
  - Status badge (Active/Acknowledged/Resolved)
  - Alert message
  - Location (room and floor)
  - Timestamp
  - Entity count (when applicable)
- **Actions:**
  - Click alert to highlight affected room on 3D floor plan
  - Acknowledge button for active alerts (changes status to acknowledged)

## Room Highlighting

When an alert is selected (by clicking in AlertBanner or AlertPanel):
- The affected room is highlighted on the 3D floor plan with:
  - Yellow/gold color scheme
  - Increased opacity and emissive glow
  - Brighter boundary lines
  - Larger room label text
- The highlight persists until another alert is selected or the selection is cleared

## Dummy Data Generation

The system simulates realistic alert scenarios:
- **Alert Generation:** New alerts appear every 30-60 seconds (70% probability)
- **Alert Types:**
  - Info: Normal occupancy, activity detection
  - Warning: High occupancy, approaching capacity
  - Critical: Threshold exceeded, unauthorized access, overcrowding
- **Auto-Resolution:** Some alerts automatically resolve after 5-20 seconds
- **Context Data:** Each alert includes room, floor, and occupancy count information

## State Management

### Store Actions
- `setSelectedAlert(alertId)`: Selects an alert and highlights its room
- `acknowledgeAlert(alertId)`: Changes alert status from active to acknowledged
- `setHighlightedRoomId(roomId)`: Manually highlights a room on the floor plan

### Store State
- `alerts`: Array of all alerts (active, acknowledged, resolved)
- `selectedAlert`: Currently selected alert ID
- `highlightedRoomId`: Currently highlighted room ID

## Usage Example

```typescript
// Get alerts from store
const alerts = useAppStore(state => state.alerts);

// Acknowledge an alert
const acknowledgeAlert = useAppStore(state => state.acknowledgeAlert);
acknowledgeAlert('alert-abc123');

// Select an alert (highlights room)
const setSelectedAlert = useAppStore(state => state.setSelectedAlert);
setSelectedAlert('alert-abc123');

// Clear selection
setSelectedAlert(null);
```

## Integration with Requirements

This implementation satisfies **Requirement 5.5**:
- ✅ Delivers alerts via visual notifications (banner and panel)
- ✅ Provides severity-based color coding
- ✅ Supports alert acknowledgment
- ✅ Highlights affected rooms on 3D floor plan
- ✅ Filters alerts by severity and status
- ✅ Simulates real-time alert generation

## Future Enhancements

Potential improvements for production:
- Audio notifications for critical alerts
- Alert history with pagination
- Export alert logs to CSV
- Custom alert rules configuration UI
- WebSocket integration for real-time backend alerts
- Alert escalation workflows
- Multi-user alert assignment
