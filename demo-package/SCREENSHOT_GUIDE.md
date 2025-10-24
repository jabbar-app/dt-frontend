# Screenshot and Video Capture Guide

## Overview

This guide helps you capture high-quality screenshots and videos of the Command Center BlueIOT demo for presentations, documentation, and marketing materials.

## Recommended Tools

### For Screenshots
- **Windows**: Snipping Tool, Snip & Sketch (Win + Shift + S)
- **Mac**: Screenshot utility (Cmd + Shift + 4)
- **Browser Extensions**: Awesome Screenshot, Nimbus Screenshot
- **Professional**: ShareX (Windows), Skitch (Mac)

### For Video Recording
- **OBS Studio** (Free, cross-platform) - Recommended
- **Loom** (Easy screen recording with narration)
- **Camtasia** (Professional editing)
- **Browser Built-in**: Chrome/Edge screen recording

## Key Screenshots to Capture

### 1. Dashboard Overview (Full Screen)
**Purpose**: Show complete interface  
**Setup**:
- Fullscreen mode (F11)
- Multiple entities visible
- All panels open
- Floor 1 selected

**What to Capture**: Entire browser window showing 3D view, occupancy panel, and alerts

### 2. 3D Floor Plan Close-Up
**Purpose**: Highlight 3D visualization quality  
**Setup**:
- Zoom into a specific room
- Multiple entities with trails visible
- Good camera angle showing depth
**What to Capture**: Detailed view of entities, room boundaries, and markers

### 3. Entity Tracking Detail
**Purpose**: Show color-coded entities and trails  
**Setup**:
- Mix of blue, green, and purple entities
- Clear movement trails
- Entity labels visible
**What to Capture**: Close-up of entities with different colors and trails

### 4. Occupancy Dashboard
**Purpose**: Demonstrate analytics capabilities  
**Setup**:
- Occupancy panel fully visible
- Multiple rooms with different occupancy levels
- Gender distribution chart visible
**What to Capture**: Full occupancy panel with room cards and charts

### 5. Alert System
**Purpose**: Show alert management  
**Setup**:
- Active alert banner visible
- Alert panel open with multiple alerts
- Different severity levels shown
**What to Capture**: Alert banner and alert list panel

### 6. Analytics Dashboard
**Purpose**: Highlight analytics features  
**Setup**:
- Analytics panel open
- Occupancy trend chart with data
- Heatmap overlay visible
**What to Capture**: Full analytics panel with charts and heatmap


### 7. Historical Playback
**Purpose**: Show playback interface  
**Setup**:
- Playback panel open
- Timeline scrubber visible
- Playback controls shown
**What to Capture**: Playback interface with timeline and controls

### 8. Multi-Floor View
**Purpose**: Demonstrate floor switching  
**Setup**:
- Floor selector visible
- Different floor selected
- Entities on that floor
**What to Capture**: Floor selector and different floor layout

## Video Recording Scenarios

### Scenario 1: Quick Demo (30 seconds)
**Script**:
1. Start with dashboard overview (5s)
2. Rotate 3D view to show depth (5s)
3. Show entities moving in real-time (10s)
4. Switch floors (5s)
5. Show alert appearing (5s)

### Scenario 2: Feature Walkthrough (2 minutes)
**Script**:
1. Dashboard overview (10s)
2. 3D navigation and controls (20s)
3. Entity tracking with color coding (20s)
4. Occupancy dashboard (20s)
5. Alert system (20s)
6. Analytics dashboard (20s)
7. Historical playback (10s)

### Scenario 3: Full Presentation (5 minutes)
Follow the PRESENTATION_GUIDE.md script with screen recording


## Recording Settings

### For Screenshots
- **Resolution**: 1920x1080 minimum (4K if available)
- **Format**: PNG for quality, JPG for smaller file size
- **Browser Zoom**: 100% (no zoom in/out)
- **Hide Cursor**: Optional, depends on use case

### For Videos
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30 FPS minimum, 60 FPS preferred
- **Format**: MP4 (H.264 codec)
- **Audio**: Optional narration, no system sounds
- **Length**: 30s-5min depending on scenario

## OBS Studio Setup (Recommended)

### Installation
1. Download from https://obsproject.com/
2. Install and launch OBS Studio
3. Skip auto-configuration wizard

### Configuration
1. **Settings → Video**:
   - Base Resolution: 1920x1080
   - Output Resolution: 1920x1080
   - FPS: 60

2. **Settings → Output**:
   - Output Mode: Simple
   - Recording Quality: High Quality
   - Recording Format: MP4

3. **Add Browser Source**:
   - Click + in Sources
   - Select "Window Capture"
   - Choose your browser window
   - Fit to screen

### Recording
1. Click "Start Recording"
2. Perform demo actions
3. Click "Stop Recording"
4. Find video in default folder (Videos/OBS)


## Post-Processing Tips

### For Screenshots
- Crop to remove browser chrome if needed
- Add annotations or callouts for key features
- Compress for web use (TinyPNG, ImageOptim)
- Maintain aspect ratio when resizing

### For Videos
- Trim beginning/end for clean start/stop
- Add title slide and end card
- Include captions for accessibility
- Compress for web (HandBrake, FFmpeg)
- Add background music (optional, low volume)

## File Naming Convention

### Screenshots
```
commandcenter_[feature]_[date].png

Examples:
- commandcenter_dashboard_overview_2025-10-24.png
- commandcenter_3d_floorplan_2025-10-24.png
- commandcenter_alerts_2025-10-24.png
```

### Videos
```
commandcenter_[scenario]_[duration]_[date].mp4

Examples:
- commandcenter_quick_demo_30s_2025-10-24.mp4
- commandcenter_feature_walkthrough_2min_2025-10-24.mp4
- commandcenter_full_presentation_5min_2025-10-24.mp4
```

## Storage and Organization

### Folder Structure
```
media/
├── screenshots/
│   ├── dashboard/
│   ├── 3d-view/
│   ├── alerts/
│   ├── analytics/
│   └── playback/
├── videos/
│   ├── demos/
│   ├── tutorials/
│   └── presentations/
└── edited/
    ├── screenshots/
    └── videos/
```

## Best Practices

1. **Capture at highest quality** - Can always compress later
2. **Use consistent browser window size** - Maintains visual consistency
3. **Clear browser cache** - Ensures clean, fast loading
4. **Disable browser extensions** - Prevents UI clutter
5. **Use dark mode** - Professional command center aesthetic
6. **Capture during active simulation** - Shows real-time capabilities
7. **Include variety** - Different floors, rooms, scenarios
8. **Test playback** - Verify videos play correctly before sharing
