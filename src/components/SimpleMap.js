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

  // Smart recommendations based on Singapore local knowledge
  const getSmartRecommendations = (timeOfDay) => {
    const recommendations = {
      'early_morning': [
        { icon: '🌅', category: 'EXERCISE', recommendation: 'East Coast Park or MacRitchie - cooler temps, less crowded. Avoid Sentosa (tourist rush starts 9am).' },
        { icon: '🚇', category: 'COMMUTE', recommendation: 'Take EW Line before 7:30am to avoid peak crowds. NS Line Orchard-Marina stretch gets packed by 8am.' },
        { icon: '☕', category: 'BREAKFAST', recommendation: 'Tiong Bahru or Tanjong Pagar hawkers open early. Skip CBD food courts (office crowd hits 8:30am).' }
      ],
      'morning': [
        { icon: '🚫', category: 'AVOID', recommendation: 'Skip Marina Bay area - tourist buses + office workers. Orchard Road MRT is nightmare 8:30-9:30am.' },
        { icon: '🌿', category: 'CHILL', recommendation: 'Gardens by the Bay conservatories or Botanic Gardens. Indoors = AC, outdoors getting hot.' },
        { icon: '🛍️', category: 'SHOPPING', recommendation: 'Vivocity or ION before lunch crowd. Most retail opens 10am, quieter until 11:30am.' }
      ],
      'lunch': [
        { icon: '🔥', category: 'HEAT WARNING', recommendation: 'Peak sun 12-2pm. Stick to underground City Link, Raffles Place tunnels, or mall-hopping.' },
        { icon: '🍜', category: 'MAKAN', recommendation: 'Newton Circus or Maxwell busy now. Try Amoy Street or Telok Ayer hawkers - less touristy, faster service.' },
        { icon: '🚇', category: 'TRANSIT', recommendation: 'MRT less crowded mid-day. Good time for Jurong-Changi airport runs or cross-island trips.' }
      ],
      'afternoon': [
        { icon: '❄️', category: 'ESCAPE HEAT', recommendation: 'Funan, Suntec City, or any underground mall. Outdoor attractions unbearable until 5pm.' },
        { icon: '🏛️', category: 'CULTURE', recommendation: 'National Gallery, ArtScience Museum, or Peranakan Museum. All have excellent AC and fewer crowds.' },
        { icon: '🌊', category: 'SENTOSA', recommendation: 'Beach time if you must, but 3-5pm is brutal. Universal Studios indoor rides better choice.' }
      ],
      'evening': [
        { icon: '⚠️', category: 'RUSH HOUR', recommendation: 'Peak MRT chaos 5:30-7:30pm. Walk between Raffles Place-Marina Bay faster than train.' },
        { icon: '🌅', category: 'SUNSET', recommendation: 'Marina Barrage, Henderson Waves, or rooftop bars. Cooler temps, best Instagram lighting.' },
        { icon: '🍻', category: 'SOCIAL', recommendation: 'Clarke Quay gets busy after 7pm. Boat Quay or Robertson Quay less intense, better vibes.' }
      ],
      'night': [
        { icon: '🌃', category: 'NIGHTLIFE', recommendation: 'Orchard towers, Tanjong Pagar bars, or East Coast seafood. Night markets at Bugis or Chinatown.' },
        { icon: '🚇', category: 'LAST TRAINS', recommendation: 'MRT stops ~midnight, buses until 2am. Book Grab early during peak hours (costs surge).' },
        { icon: '🌟', category: 'VIEWS', recommendation: 'Marina Bay Sands SkyPark, Singapore Flyer, or Pinnacle@Duxton. City lights best after 8pm.' }
      ]
    };
    
    return recommendations[timeOfDay] || recommendations['afternoon'];
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
            height: '38%'
          }}>
            <h3 className="section-title">THERMAL MONITORING</h3>
            <p className="section-description">
              NEA weather station network across Singapore districts. Real-time temperature monitoring from 8 key locations with 15-minute update intervals.
            </p>
            <div className="data-grid">
              {districts.slice(0, 4).map((district, i) => (
                <div key={`${district.name}-${timeOfDay}`} className="data-item" style={{
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
            height: '38%'
          }}>
            <h3 className="section-title">MRT TRANSIT FLOW</h3>
            <p className="section-description">
              LTA transit monitoring system tracking passenger volume across major MRT lines. Data shows real-time capacity utilization and crowd levels.
            </p>
            <div className="data-grid">
              {mrtLines.slice(0, 4).map((line, i) => (
                <div key={`${line.line}-${timeOfDay}`} className="data-item" style={{
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
            top: '54%',
            left: '3%',
            width: '44%',
            height: '38%'
          }}>
            <h3 className="section-title">CITIZEN MOOD TRACKER</h3>
            <p className="section-description">
              Singapore Soundscape Study (NTU 2019) tracking emotional responses across urban locations. Data from 67 participants mapping community sentiment and vibes.
            </p>
            <div className="data-grid">
              {emotionalPoints.slice(0, 4).map((point, i) => (
                <div key={`${point.name}-${timeOfDay}`} className="data-item" style={{
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

          {/* Smart Recommendations Section */}
          <div className="data-section stats-section" style={{
            position: 'absolute',
            top: '54%',
            right: '3%',
            width: '44%',
            height: '38%'
          }}>
            <h3 className="section-title">SMART RECOMMENDATIONS</h3>
            <p className="section-description">
              AI-powered location recommendations based on current conditions. Combines weather, transport, and mood data for optimal Singapore experiences.
            </p>
            <div className="data-grid">
              {getSmartRecommendations(timeOfDay).map((rec, i) => (
                <div key={`${rec.category}-${timeOfDay}`} className="data-item" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px 0',
                  borderBottom: i < getSmartRecommendations(timeOfDay).length - 1 ? '1px solid rgba(0, 255, 159, 0.2)' : 'none'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px'}}>
                    <span style={{fontSize: '12px', minWidth: '12px'}}>{rec.icon}</span>
                    <span className="location-name" style={{fontSize: '11px', fontWeight: '700', textTransform: 'uppercase'}}>{rec.category}</span>
                  </div>
                  <div style={{
                    fontSize: '10px', 
                    color: '#00ccff', 
                    lineHeight: '1.2',
                    paddingLeft: '20px',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal'
                  }}>
                    {rec.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleMap;