# Command Center BlueIOT - Demo Package

## 🎯 Executive Summary

This is a **standalone demo** of the Command Center BlueIOT Digital Twin Dashboard. It showcases real-time indoor tracking and monitoring capabilities using simulated data - **no backend required**.

### Key Features Demonstrated

✅ **3D Digital Twin Visualization** - Interactive 3D floor plan with real-time entity tracking  
✅ **Multi-Floor Navigation** - Switch between multiple building levels  
✅ **Real-Time Entity Tracking** - Animated movement of people with color-coded sources  
✅ **Occupancy Analytics** - Live room and floor occupancy with demographic breakdowns  
✅ **Alert System** - Real-time alerts with severity levels and acknowledgment  
✅ **Analytics Dashboard** - Occupancy trends, density heatmaps, and demographic insights  
✅ **Historical Playback** - Review past movements with timeline controls and variable speed  
✅ **Dark Mode UI** - Command center aesthetic optimized for large displays  

---

## 🚀 Quick Start

### Option 1: Open Locally (Recommended)

1. Extract the demo package to a folder
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. The dashboard will load automatically with simulated data

### Option 2: Deploy to Web Server

Upload the entire `dist/` folder contents to any web server or hosting service:

- **Static Hosting**: Netlify, Vercel, GitHub Pages, AWS S3, Azure Static Web Apps
- **Web Server**: Apache, Nginx, IIS
- **CDN**: Cloudflare Pages, Fastly

No server-side processing required - this is a pure client-side application.

---

## 📊 Demo Features Guide

### 1. 3D Floor Plan Visualization

**What to Look For:**
- Interactive 3D floor plan with room boundaries
- Camera positions marked with camera icons
- UWB anchor positions marked with tower icons
- Smooth camera controls (orbit, pan, zoom)

**How to Interact:**
- **Left Mouse**: Rotate view
- **Right Mouse**: Pan view
- **Scroll Wheel**: Zoom in/out
- **Floor Selector**: Switch between floors (top-right)

### 2. Real-Time Entity Tracking

**What to Look For:**
- Animated avatars representing people moving through the facility
- Color-coded by data source:
  - 🔵 **Blue**: Computer Vision only
  - 🟢 **Green**: UWB positioning only
  - 🟣 **Purple**: Fused (CV + UWB)
- Movement trails showing last 30 seconds of trajectory
- Entity labels with ID and demographic info

**Demo Behavior:**
- Entities move realistically between rooms
- Updates occur at 10 Hz (10 times per second)
- New entities appear and disappear naturally

### 3. Occupancy Dashboard

**What to Look For:**
- Current occupancy count per room (grid view)
- Floor-level occupancy summary cards
- Gender distribution pie charts
- Occupancy percentage indicators (current/capacity)
- Real-time updates as entities move

**How to Interact:**
- Click on a room card to highlight it on the 3D view
- Watch counts update in real-time

### 4. Alert System

**What to Look For:**
- Alert banner at top with color-coded severity:
  - 🔴 **Critical**: Red
  - 🟡 **Warning**: Yellow
  - 🔵 **Info**: Blue
- Alert list panel showing active, acknowledged, and resolved alerts
- Affected rooms highlighted on 3D floor plan

**How to Interact:**
- Click "Acknowledge" to mark alerts as seen
- Click on an alert to highlight the affected room
- Filter alerts by severity and status
- New alerts appear every 30-60 seconds

### 5. Analytics Dashboard

**What to Look For:**
- **Occupancy Trends**: Line chart showing occupancy over last 24 hours
- **Density Heatmap**: Color-coded grid overlay showing high-traffic areas
- **Demographics**: Pie chart with gender breakdown
- **Time Range Selector**: Switch between 1h, 6h, 24h, 7d views
- **Peak Statistics**: Peak occupancy times and counts

**Demo Data:**
- Historical data is pre-generated for the last 7 days
- Realistic patterns with peak hours and quiet periods

### 6. Historical Playback

**What to Look For:**
- Timeline scrubber with play/pause controls
- Date/time range picker
- Playback speed controls (1x, 2x, 4x, 8x, 16x)
- Timestamp indicator during playback
- Room and floor filters

**How to Interact:**
- Select a date range from the picker
- Click play to start playback
- Adjust speed with speed selector
- Use filters to focus on specific areas
- Scrub timeline to jump to specific moments

### 7. Demo Controls

**What to Look For:**
- Demo mode toggle to restart simulation
- Keyboard shortcuts panel
- Theme toggle (dark/light mode)

**Keyboard Shortcuts:**
- **Space**: Play/Pause playback
- **Arrow Keys**: Navigate timeline
- **1-3**: Switch floors
- **D**: Toggle demo controls
- **A**: Toggle alerts panel

---

## 🎬 Presentation Tips

### For Executive Board Meetings

1. **Start with Overview** (2 min)
   - Open the dashboard and show the 3D floor plan
   - Explain the color-coding system
   - Demonstrate camera controls

2. **Show Real-Time Tracking** (3 min)
   - Point out entities moving through rooms
   - Show movement trails
   - Highlight the fusion of CV and UWB data

3. **Demonstrate Occupancy Analytics** (2 min)
   - Show room occupancy counts updating in real-time
   - Display demographic breakdowns
   - Explain capacity management benefits

4. **Showcase Alert System** (2 min)
   - Wait for an alert to appear (or trigger one)
   - Show acknowledgment workflow
   - Explain safety and security applications

5. **Present Analytics** (3 min)
   - Show occupancy trends over time
   - Display density heatmap
   - Explain operational insights

6. **Demo Historical Playback** (2 min)
   - Select a past time range
   - Play back movements at 4x speed
   - Explain incident investigation use case

### Key Talking Points

- **No Backend Required**: This demo runs entirely in the browser with simulated data
- **Real-Time Performance**: Updates at 10 Hz with smooth animations
- **Scalable Architecture**: Designed to handle 100+ cameras and 1000+ tags
- **Privacy-First**: No facial recognition, optional anonymization
- **Multi-Source Fusion**: Combines CV and UWB for comprehensive tracking
- **Actionable Insights**: From safety alerts to space optimization

---

## 🔧 Technical Details

### System Requirements

- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Display**: 1920x1080 minimum (optimized for large displays)
- **Internet**: Not required (all assets embedded)

### Technologies Used

- **Frontend**: React 19 with TypeScript
- **3D Rendering**: Three.js with React Three Fiber
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite

### Performance Characteristics

- **Initial Load**: < 3 seconds on modern hardware
- **Frame Rate**: 60 FPS on dedicated GPU, 30+ FPS on integrated graphics
- **Memory Usage**: ~200-300 MB
- **Entity Capacity**: Simulates up to 100 concurrent entities smoothly

### Data Simulation

The demo includes:
- **2 Floors** with 8 rooms each
- **10 Cameras** distributed across floors
- **12 UWB Anchors** for positioning
- **20-40 Active Entities** at any given time
- **7 Days** of historical data for analytics
- **Realistic Movement Patterns** based on typical facility usage

---

## 📁 Package Contents

```
demo-package/
├── index.html              # Main entry point
├── assets/
│   ├── index-*.js         # Application bundle
│   └── index-*.css        # Styles
├── DEMO_README.md         # This file
└── FEATURES.md            # Detailed feature list
```

---

## 🐛 Troubleshooting

### Dashboard Not Loading

- **Check Browser Console**: Press F12 and look for errors
- **Try Different Browser**: Use Chrome or Firefox for best compatibility
- **Disable Extensions**: Ad blockers may interfere with rendering
- **Clear Cache**: Hard refresh with Ctrl+F5 (Cmd+Shift+R on Mac)

### Poor Performance

- **Close Other Tabs**: Free up system resources
- **Update Graphics Drivers**: Ensure GPU drivers are current
- **Reduce Entity Count**: Demo controls allow adjusting simulation density
- **Lower Quality Settings**: Disable shadows or reduce resolution

### 3D View Not Rendering

- **Enable WebGL**: Ensure WebGL is enabled in browser settings
- **Check GPU Support**: Visit https://get.webgl.org/ to verify WebGL support
- **Update Browser**: Use the latest browser version

---

## 📞 Next Steps

### Interested in the Full System?

This demo showcases the frontend dashboard. The complete Command Center BlueIOT system includes:

- **Backend Infrastructure**: API Gateway, Authentication, Real-time Processing
- **Computer Vision Pipeline**: YOLOv8 person detection, tracking, gender classification
- **BlueIOT Integration**: MQTT ingestion, UWB positioning, tag management
- **Fusion Engine**: Spatial-temporal correlation, entity identity management
- **Data Storage**: PostgreSQL, TimescaleDB, Redis for production-scale data
- **Analytics Service**: Historical queries, heatmap generation, data export
- **Configuration UI**: Camera setup, floor plan management, alert rules
- **Monitoring**: Prometheus metrics, Grafana dashboards, structured logging

### Contact Information

For more information about deploying the full system:
- Review the technical specification document
- Contact your BlueIOT representative
- Schedule a technical deep-dive session

---

## 📄 License

This demo is provided for evaluation purposes only.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Demo Type**: Standalone Frontend with Simulated Data
