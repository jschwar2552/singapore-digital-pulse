import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox access token - using demo token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3cifQ.rJcFIG214AriISLbB6B5aw';

const SingaporeMap = ({ 
  weatherData = [], 
  transportFlow = [], 
  soundscapeData = [],
  showWeather = true,
  showTransport = true,
  showSoundscape = true,
  timeOfDay = 'afternoon'
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(103.8518);
  const [lat] = useState(1.2966);
  const [zoom] = useState(11);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for futuristic look
      center: [lng, lat],
      zoom: zoom,
      pitch: 45, // 3D perspective
      bearing: 0
    });

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Custom map styling for digital pulse effect
    map.current.on('load', () => {
      // Add glow effect to water bodies
      map.current.setPaintProperty('water', 'fill-color', '#0a1929');
      map.current.setPaintProperty('water', 'fill-opacity', 0.8);
    });

  }, [lng, lat, zoom]);

  // Update weather layer
  useEffect(() => {
    if (!map.current || !showWeather || !weatherData.length) return;

    const sourceId = 'weather-data';
    const layerId = 'weather-layer';

    // Remove existing layer and source
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    // Create weather heatmap data
    const features = weatherData.map(station => ({
      type: 'Feature',
      properties: {
        temperature: station.temperature,
        humidity: station.humidity,
        name: station.name
      },
      geometry: {
        type: 'Point',
        coordinates: [station.lng, station.lat]
      }
    }));

    // Add source
    map.current.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    // Add heatmap layer
    map.current.addLayer({
      id: layerId,
      type: 'heatmap',
      source: sourceId,
      maxzoom: 15,
      paint: {
        'heatmap-weight': {
          property: 'temperature',
          type: 'exponential',
          stops: [
            [20, 0],
            [35, 1]
          ]
        },
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [15, 3]
          ]
        },
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
        'heatmap-radius': {
          stops: [
            [11, 15],
            [15, 20]
          ]
        },
        'heatmap-opacity': {
          default: 0.6,
          stops: [
            [14, 0.6],
            [15, 0]
          ]
        }
      }
    });

    // Add weather station points
    map.current.addLayer({
      id: 'weather-points',
      type: 'circle',
      source: sourceId,
      minzoom: 14,
      paint: {
        'circle-radius': {
          property: 'temperature',
          stops: [
            [20, 4],
            [35, 8]
          ]
        },
        'circle-color': {
          property: 'temperature',
          stops: [
            [20, '#2196f3'],
            [30, '#ff9800'],
            [35, '#f44336']
          ]
        },
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
        'circle-opacity': 0.8
      }
    });

  }, [weatherData, showWeather]);

  // Update soundscape layer
  useEffect(() => {
    if (!map.current || !showSoundscape || !soundscapeData.length) return;

    const sourceId = 'soundscape-data';
    const layerId = 'soundscape-layer';

    // Remove existing layer and source
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    // Create soundscape features
    const features = soundscapeData.map(point => ({
      type: 'Feature',
      properties: {
        emotion: point.emotion,
        color: point.color,
        intensity: point.intensity,
        visits: point.visits,
        duration: point.duration
      },
      geometry: {
        type: 'Point',
        coordinates: [point.lng, point.lat]
      }
    }));

    // Add source
    map.current.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    // Add pulsing circles for soundscape emotions
    map.current.addLayer({
      id: layerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': {
          property: 'intensity',
          stops: [
            [0, 8],
            [1, 20]
          ]
        },
        'circle-color': {
          property: 'emotion',
          type: 'categorical',
          stops: [
            ['exciting', '#ff6b35'],
            ['chaotic', '#d32f2f'],
            ['calm', '#2196f3'],
            ['boring', '#757575']
          ]
        },
        'circle-opacity': 0.4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-opacity': 0.8
      }
    });

    // Add popup on click
    map.current.on('click', layerId, (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: [layerId]
      });

      if (!features.length) return;

      const feature = features[0];
      new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(e.lngLat)
        .setHTML(`
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: ${feature.properties.color};">
              ${feature.properties.emotion.charAt(0).toUpperCase() + feature.properties.emotion.slice(1)}
            </h3>
            <p style="margin: 0; font-size: 12px;">
              Visits: ${feature.properties.visits}<br>
              Duration: ${feature.properties.duration}min
            </p>
          </div>
        `)
        .addTo(map.current);
    });

    // Change cursor on hover
    map.current.on('mouseenter', layerId, () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', layerId, () => {
      map.current.getCanvas().style.cursor = '';
    });

  }, [soundscapeData, showSoundscape]);

  // Update transport layer
  useEffect(() => {
    if (!map.current || !showTransport || !transportFlow.length) return;

    const sourceId = 'transport-data';
    const layerId = 'transport-layer';

    // Remove existing layer and source
    if (map.current.getLayer(layerId)) {
      map.current.removeLayer(layerId);
    }
    if (map.current.getSource(sourceId)) {
      map.current.removeSource(sourceId);
    }

    // Create transport flow lines
    const features = transportFlow.map(flow => ({
      type: 'Feature',
      properties: {
        intensity: flow.intensity,
        line: flow.line,
        color: flow.color,
        direction: flow.direction
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [flow.from.lng, flow.from.lat],
          [flow.to.lng, flow.to.lat]
        ]
      }
    }));

    // Add source
    map.current.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    // Add animated transport lines
    map.current.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': {
          property: 'color',
          type: 'identity'
        },
        'line-width': {
          property: 'intensity',
          stops: [
            [0, 1],
            [100, 4]
          ]
        },
        'line-opacity': 0.6
      }
    });

    // Add pulsing effect to high-intensity routes
    const pulsingFeatures = features.filter(f => f.properties.intensity > 70);
    
    if (pulsingFeatures.length > 0) {
      map.current.addSource('transport-pulse', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: pulsingFeatures
        }
      });

      map.current.addLayer({
        id: 'transport-pulse-layer',
        type: 'line',
        source: 'transport-pulse',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': {
            property: 'color',
            type: 'identity'
          },
          'line-width': 6,
          'line-opacity': 0.3
        }
      });
    }

  }, [transportFlow, showTransport]);

  return (
    <div 
      ref={mapContainer} 
      className="map-container"
      style={{ 
        width: '100%', 
        height: '100vh',
        position: 'relative'
      }}
    />
  );
};

export default SingaporeMap;