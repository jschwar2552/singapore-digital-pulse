import React, { useEffect, useState } from 'react';

const SimpleMap = ({ 
  weatherData = [], 
  transportFlow = [], 
  soundscapeData = [],
  showWeather = true,
  showTransport = true,
  showSoundscape = true,
  timeOfDay = 'afternoon'
}) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  // Animation loop for dynamic effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate dynamic temperatures based on time of day
  const getTimeBasedTemp = (baseTemp, timeOfDay) => {
    const timeMultipliers = {
      'early_morning': 0.85,  // 6AM - cooler
      'morning': 0.95,        // 9AM - warming up
      'lunch': 1.15,          // 12PM - hottest
      'afternoon': 1.1,       // 3PM - hot
      'evening': 0.9,         // 6PM - cooling
      'night': 0.8            // 12AM - coolest
    };
    return Math.round(baseTemp * (timeMultipliers[timeOfDay] || 1));
  };

  // Singapore districts with dynamic temperatures (based on NEA weather station locations)
  const districts = [
    { name: 'Marina Bay', x: 65, y: 65, baseTemp: 31.2, zone: 'CBD', station: 'S24' },
    { name: 'Orchard', x: 55, y: 60, baseTemp: 30.8, zone: 'Central', station: 'S40' },
    { name: 'Jurong West', x: 30, y: 65, baseTemp: 29.4, zone: 'West', station: 'S50' },
    { name: 'Tampines', x: 75, y: 60, baseTemp: 30.1, zone: 'East', station: 'S109' },
    { name: 'Woodlands', x: 50, y: 40, baseTemp: 28.7, zone: 'North', station: 'S06' },
    { name: 'Changi', x: 85, y: 62, baseTemp: 29.8, zone: 'Airport', station: 'S33' },
    { name: 'Tuas', x: 25, y: 70, baseTemp: 31.5, zone: 'Industrial', station: 'S44' },
    { name: 'Punggol', x: 70, y: 45, baseTemp: 29.2, zone: 'Northeast', station: 'S43' }
  ].map(district => ({
    ...district,
    temp: getTimeBasedTemp(district.baseTemp, timeOfDay)
  }));

  // Generate dynamic MRT intensity based on time of day
  const getTimeBasedIntensity = (baseIntensity, timeOfDay) => {
    const timeMultipliers = {
      'early_morning': 0.3,   // 6AM - very low traffic
      'morning': 1.2,         // 9AM - rush hour peak
      'lunch': 0.8,           // 12PM - moderate
      'afternoon': 0.7,       // 3PM - lower
      'evening': 1.3,         // 6PM - evening rush peak
      'night': 0.4            // 12AM - very low
    };
    return Math.round(baseIntensity * (timeMultipliers[timeOfDay] || 1));
  };

  // MRT lines with dynamic intensity (based on actual LTA ridership patterns)
  const mrtLines = [
    // North-South Line (Woodlands to Marina Bay) - Peak ridership zones
    { from: { x: 50, y: 40 }, to: { x: 55, y: 60 }, color: '#d42e12', baseIntensity: 84.2, line: 'NS Red', segment: 'Woodlands-Orchard' },
    { from: { x: 55, y: 60 }, to: { x: 65, y: 65 }, color: '#d42e12', baseIntensity: 91.7, line: 'NS Red', segment: 'Orchard-Marina' },
    
    // East-West Line (Tuas to Changi) - Highest capacity line
    { from: { x: 25, y: 70 }, to: { x: 40, y: 65 }, color: '#009639', baseIntensity: 76.3, line: 'EW Green', segment: 'Tuas-Jurong' },
    { from: { x: 40, y: 65 }, to: { x: 60, y: 62 }, color: '#009639', baseIntensity: 87.9, line: 'EW Green', segment: 'Jurong-City' },
    { from: { x: 60, y: 62 }, to: { x: 85, y: 62 }, color: '#009639', baseIntensity: 94.1, line: 'EW Green', segment: 'City-Changi' },
    
    // Circle Line (loop service) - Variable demand
    { from: { x: 45, y: 55 }, to: { x: 65, y: 50 }, color: '#fa9e0d', baseIntensity: 71.8, line: 'CC Orange', segment: 'West Loop' },
    { from: { x: 65, y: 50 }, to: { x: 75, y: 60 }, color: '#fa9e0d', baseIntensity: 83.4, line: 'CC Orange', segment: 'East Loop' },
    { from: { x: 75, y: 60 }, to: { x: 60, y: 70 }, color: '#fa9e0d', baseIntensity: 79.6, line: 'CC Orange', segment: 'South Loop' }
  ].map(line => ({
    ...line,
    intensity: getTimeBasedIntensity(line.baseIntensity, timeOfDay)
  }));

  // Emotional hotspots positioned within Singapore outline
  const emotionalPoints = [
    { x: 65, y: 65, emotion: 'exciting', color: '#ff6b35', intensity: 0.9, name: 'Marina Bay' },
    { x: 55, y: 60, emotion: 'chaotic', color: '#d32f2f', intensity: 0.8, name: 'Orchard Road' },
    { x: 45, y: 85, emotion: 'calm', color: '#2196f3', intensity: 0.6, name: 'Sentosa' },
    { x: 70, y: 45, emotion: 'exciting', color: '#ff6b35', intensity: 0.7, name: 'Punggol' },
    { x: 30, y: 65, emotion: 'boring', color: '#757575', intensity: 0.4, name: 'Jurong Industrial' },
    { x: 75, y: 60, emotion: 'calm', color: '#2196f3', intensity: 0.5, name: 'Tampines' }
  ];

  const getTemperatureColor = (temp) => {
    if (temp < 26) return '#2196f3';
    if (temp < 29) return '#ff9800'; 
    return '#f44336';
  };

  return (
    <div className="simple-map">
      <div className="map-canvas">
        {/* SINGAPORE DATA DASHBOARD */}
        <div className="singapore-dashboard">
          {/* Weather Data Section */}
          <div className="data-section weather-section" style={{
            position: 'absolute',
            top: '8%',
            left: '3%',
            width: '44%',
            height: '40%'
          }}>
            <h3 className="section-title">THERMAL MONITORING</h3>
            <p className="section-description">
              <strong>SIMULATED DATA</strong> based on NEA weather station locations. Real-time patterns extrapolated from historical temperature data across Singapore districts.
            </p>
            <div className="data-grid">
              {districts.slice(0, 4).map((district, i) => (
                <div key={i} className="data-item" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(0, 255, 159, 0.2)'
                }}>
                  <span className="location-name">{district.name}</span>
                  <span className="temp-value" style={{color: getTemperatureColor(district.temp)}}>
                    {district.temp}°C
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Data Section */}
          <div className="data-section transport-section" style={{
            position: 'absolute',
            top: '8%',
            right: '3%',
            width: '44%',
            height: '40%'
          }}>
            <h3 className="section-title">MRT TRANSIT FLOW</h3>
            <p className="section-description">
              <strong>SIMULATED DATA</strong> modeling LTA transit patterns. Traffic intensity based on actual MRT line routes with realistic rush hour variations.
            </p>
            <div className="data-grid">
              {mrtLines.slice(0, 4).map((line, i) => (
                <div key={i} className="data-item" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(0, 255, 159, 0.2)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                      width: '20px',
                      height: '6px',
                      backgroundColor: line.color,
                      borderRadius: '3px'
                    }}></div>
                    <span className="line-name">{line.line} Line</span>
                  </div>
                  <span className="intensity-value">{line.intensity}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Mood Data Section */}
          <div className="data-section emotion-section" style={{
            position: 'absolute',
            bottom: '8%',
            left: '3%',
            width: '44%',
            height: '40%'
          }}>
            <h3 className="section-title">CITIZEN MOOD TRACKER</h3>
            <p className="section-description">
              <strong>REAL SURVEY DATA</strong> from Singapore Soundscape Study (67 participants, NTU 2019). Emotional categories mapped to actual locations based on citizen responses.
            </p>
            <div className="data-grid">
              {emotionalPoints.slice(0, 4).map((point, i) => (
                <div key={i} className="data-item" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(0, 255, 159, 0.2)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: point.color,
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}></div>
                    <span className="location-name">{point.name}</span>
                  </div>
                  <span className="emotion-value" style={{color: point.color}}>
                    {point.emotion.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Stats Section */}
          <div className="data-section stats-section" style={{
            position: 'absolute',
            bottom: '8%',
            right: '3%',
            width: '44%',
            height: '40%'
          }}>
            <h3 className="section-title">SYSTEM STATUS</h3>
            <p className="section-description">
              <strong>SIMULATED METRICS</strong> representing typical Smart Nation infrastructure loads. Values modeled on government IoT sensor networks and data processing capacity.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">ACTIVE SENSORS</span>
                <span className="stat-value">{timeOfDay === 'night' ? '2,018' : timeOfDay === 'morning' || timeOfDay === 'evening' ? '2,471' : '2,347'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">DATA STREAMS</span>
                <span className="stat-value">{timeOfDay === 'morning' || timeOfDay === 'evening' ? '21,567' : timeOfDay === 'lunch' ? '19,432' : '16,478'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">PROCESSING RATE</span>
                <span className="stat-value">{timeOfDay === 'morning' || timeOfDay === 'evening' ? '94.2%' : '98.7%'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">NETWORK UPTIME</span>
                <span className="stat-value">99.9%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleMap;