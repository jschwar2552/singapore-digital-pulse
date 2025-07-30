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

## Data Sources

### 🌡️ Weather Monitoring
- **NEA Weather Station Network**: Real-time temperature data from 8 key monitoring stations
- **Stations**: S24 (Marina Bay), S40 (Orchard), S50 (Jurong West), S109 (Tampines), S06 (Woodlands), S33 (Changi), S44 (Tuas), S43 (Punggol)
- **Update Frequency**: 15-minute intervals

### 🚇 Transit Flow
- **LTA MRT Monitoring System**: Passenger volume tracking across major lines
- **Coverage**: NS Red Line, EW Green Line, CC Orange Line with route segment analysis
- **Data**: Real-time capacity utilization and crowd level indicators

### 😊 Citizen Sentiment
- **Singapore Soundscape Study (NTU, 2019)**: Urban emotional mapping
- **Participants**: 67 citizen responses across key Singapore locations
- **Categories**: Emotional sentiment analysis (exciting, chaotic, calm, boring)

### 🧠 Smart Recommendations
- **AI-Powered Location Intelligence**: Combines weather, transport, and mood data
- **Local Knowledge**: Singapore-specific insights for optimal timing and location choices
- **Real-time Updates**: Recommendations adapt based on current conditions

Built with Claude Code 🤖