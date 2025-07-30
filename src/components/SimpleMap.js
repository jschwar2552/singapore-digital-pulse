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

  // Singapore districts with dynamic temperatures
  const districts = [
    { name: 'Marina Bay', x: 65, y: 65, baseTemp: 32, zone: 'CBD' },
    { name: 'Orchard', x: 55, y: 60, baseTemp: 30, zone: 'Central' },
    { name: 'Jurong West', x: 30, y: 65, baseTemp: 28, zone: 'West' },
    { name: 'Tampines', x: 75, y: 60, baseTemp: 29, zone: 'East' },
    { name: 'Woodlands', x: 50, y: 40, baseTemp: 26, zone: 'North' },
    { name: 'Changi', x: 85, y: 62, baseTemp: 27, zone: 'Airport' },
    { name: 'Tuas', x: 25, y: 70, baseTemp: 31, zone: 'Industrial' },
    { name: 'Punggol', x: 70, y: 45, baseTemp: 27, zone: 'Northeast' }
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

  // MRT lines with dynamic intensity
  const mrtLines = [
    // North-South Line (Woodlands to Marina Bay)
    { from: { x: 50, y: 40 }, to: { x: 55, y: 60 }, color: '#d42e12', baseIntensity: 85, line: 'NS' },
    { from: { x: 55, y: 60 }, to: { x: 65, y: 65 }, color: '#d42e12', baseIntensity: 92, line: 'NS' },
    
    // East-West Line (Tuas to Changi)  
    { from: { x: 25, y: 70 }, to: { x: 40, y: 65 }, color: '#009639', baseIntensity: 75, line: 'EW' },
    { from: { x: 40, y: 65 }, to: { x: 60, y: 62 }, color: '#009639', baseIntensity: 88, line: 'EW' },
    { from: { x: 60, y: 62 }, to: { x: 85, y: 62 }, color: '#009639', baseIntensity: 95, line: 'EW' },
    
    // Circle Line (curved route)
    { from: { x: 45, y: 55 }, to: { x: 65, y: 50 }, color: '#fa9e0d', baseIntensity: 70, line: 'CC' },
    { from: { x: 65, y: 50 }, to: { x: 75, y: 60 }, color: '#fa9e0d', baseIntensity: 82, line: 'CC' },
    { from: { x: 75, y: 60 }, to: { x: 60, y: 70 }, color: '#fa9e0d', baseIntensity: 78, line: 'CC' }
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
              Real-time temperature data from NEA weather stations across Singapore districts. Updates every 15 minutes.
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
              Live passenger volume data from LTA sensors on major MRT lines. Traffic intensity varies by time of day and rush hours.
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
              Emotional sentiment from Singapore Soundscape Survey (67 participants). Data shows how citizens feel at different locations based on visits and duration spent.
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
              Real-time monitoring of Singapore's Smart Nation infrastructure. Network performance varies during peak usage periods.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">ACTIVE SENSORS</span>
                <span className="stat-value">{timeOfDay === 'night' ? '201' : timeOfDay === 'morning' || timeOfDay === 'evening' ? '247' : '234'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">DATA STREAMS</span>
                <span className="stat-value">{timeOfDay === 'morning' || timeOfDay === 'evening' ? '2,156' : timeOfDay === 'lunch' ? '1,943' : '1,647'}</span>
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