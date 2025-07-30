# Singapore Digital Pulse

A futuristic visualization of Singapore's living data ecosystem, built for the GovTech Singapore Ministry of Communication and Information leadership team demo.

## Overview

Singapore Digital Pulse presents a real-time, cyberpunk-themed control panel displaying:
- **Weather Patterns**: Temperature heatmaps across Singapore's districts
- **Transport Flow**: MRT line traffic visualization
- **Soundscape Emotions**: Citizen emotional data from various locations

## Features

- **Temporal Control**: Navigate through different times of day
- **Auto-Play Mode**: Automated time progression
- **Layer Toggle**: Control visibility of different data layers
- **Interactive Map**: Click on data points for detailed information
- **Cyberpunk UI**: Inspired by sci-fi control panels

## Tech Stack

- React.js
- Mapbox GL JS
- D3.js
- Framer Motion

## Quick Start

```bash
npm install
npm start
```

## Demo Narrative

1. **Morning Rush (09:00)**: Show peak transport flow
2. **Lunch Time (12:00)**: Balanced activity across all systems
3. **Evening Rush (18:00)**: High transport + emotional intensity
4. **Night Life (21:00)**: Soundscape emotions in entertainment districts

## Data Sources & Methodology

**This is a demonstration dashboard using simulated and real data sources:**

### 🌡️ Weather Data
- **Source**: NEA (National Environment Agency) weather station locations
- **Method**: Historical temperature patterns extrapolated with realistic time-of-day variations
- **Stations**: S24 (Marina Bay), S40 (Orchard), S50 (Jurong West), S109 (Tampines), S06 (Woodlands), S33 (Changi), S44 (Tuas), S43 (Punggol)
- **Status**: ⚠️ **SIMULATED** - Based on real station locations with modeled temperature patterns

### 🚇 Transit Data  
- **Source**: LTA (Land Transport Authority) MRT network topology
- **Method**: Realistic ridership patterns modeled on actual rush hour behaviors
- **Lines**: NS Red Line, EW Green Line, CC Orange Line with accurate route segments
- **Status**: ⚠️ **SIMULATED** - Based on real MRT infrastructure with modeled passenger flows

### 😊 Citizen Mood Data
- **Source**: Singapore Soundscape Study (NTU, 2019)
- **Method**: Real survey responses from 67 participants mapped to actual locations
- **Data**: Authentic emotional categories (exciting, chaotic, calm, boring) from citizen responses
- **Status**: ✅ **REAL** - Actual research data from academic study

### 📊 System Metrics
- **Source**: Smart Nation infrastructure estimates
- **Method**: Representative values for IoT sensor networks and data processing systems
- **Metrics**: Active sensors (2,000+), data streams (16,000+), processing rates, network uptime
- **Status**: ⚠️ **SIMULATED** - Modeled on typical government infrastructure capacity

---

**Disclaimer**: This dashboard demonstrates potential real-time monitoring capabilities for Smart Nation initiatives. While based on real infrastructure and research data, the real-time values are simulated for demonstration purposes.

Built with Claude Code 🤖