import React, { useState, useEffect } from 'react';
import SimpleMap from './components/SimpleMap';
import { 
  generateWeatherData, 
  generateTransportFlow,
  processSoundscapeData,
  timeSequences
} from './data/mockData';
import './App.css';

function App() {
  const [currentTimeIndex, setCurrentTimeIndex] = useState(2); // Start with lunch time
  const [weatherData, setWeatherData] = useState([]);
  const [transportFlow, setTransportFlow] = useState([]);
  const [soundscapeData, setSoundscapeData] = useState([]);
  const [showWeather, setShowWeather] = useState(true);
  const [showTransport, setShowTransport] = useState(true);
  const [showSoundscape, setShowSoundscape] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  // Load soundscape data on mount
  useEffect(() => {
    const loadSoundscapeData = async () => {
      try {
        const response = await fetch('/soundscape_data.csv');
        const csvText = await response.text();
        const processedData = processSoundscapeData(csvText);
        setSoundscapeData(processedData);
      } catch (error) {
        console.error('Failed to load soundscape data:', error);
        // Use empty array as fallback
        setSoundscapeData([]);
      }
    };

    loadSoundscapeData();
  }, []);

  // Update data when time changes
  useEffect(() => {
    const currentTime = timeSequences[currentTimeIndex];
    setWeatherData(generateWeatherData(currentTime.weather));
    setTransportFlow(generateTransportFlow());
  }, [currentTimeIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentTimeIndex(prev => (prev + 1) % timeSequences.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const currentTime = timeSequences[currentTimeIndex];

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>SINGAPORE CONTROL MK-VI</h1>
        <p>REG-SG1162 • CORE v2.74.51</p>
      </div>

      {/* Time Controls */}
      <div className="time-controls">
        <div className="time-display">
          <span className="time">{currentTime.time}</span>
          <span className="label">{currentTime.label}</span>
        </div>
        
        <div className="time-slider">
          {timeSequences.map((time, index) => (
            <button
              key={index}
              className={`time-button ${index === currentTimeIndex ? 'active' : ''}`}
              onClick={() => setCurrentTimeIndex(index)}
            >
              {time.time}
            </button>
          ))}
        </div>

        <button 
          className={`auto-play-button ${autoPlay ? 'active' : ''}`}
          onClick={() => setAutoPlay(!autoPlay)}
        >
          {autoPlay ? '■ PAUSE' : '▶ AUTO PLAY'}
        </button>
      </div>

      {/* Layer Controls */}
      <div className="layer-controls">
        <h3>SENSOR STATUS: ACTIVE</h3>
        <div className="layer-toggles">
          <label className="layer-toggle">
            <input
              type="checkbox"
              checked={showWeather}
              onChange={(e) => setShowWeather(e.target.checked)}
            />
            <span className="weather-indicator"></span>
            Weather Patterns
          </label>
          
          <label className="layer-toggle">
            <input
              type="checkbox"
              checked={showTransport}
              onChange={(e) => setShowTransport(e.target.checked)}
            />
            <span className="transport-indicator"></span>
            Transport Flow
          </label>
          
          <label className="layer-toggle">
            <input
              type="checkbox"
              checked={showSoundscape}
              onChange={(e) => setShowSoundscape(e.target.checked)}
            />
            <span className="soundscape-indicator"></span>
            Soundscape Emotions
          </label>
        </div>
      </div>

      {/* Map */}
      <SimpleMap
        weatherData={weatherData}
        transportFlow={transportFlow}
        soundscapeData={soundscapeData}
        showWeather={showWeather}
        showTransport={showTransport}
        showSoundscape={showSoundscape}
        timeOfDay={currentTime.weather}
      />

      {/* Legend */}
      <div className="legend">
        <div className="legend-section">
          <h4>THERMAL</h4>
          <div className="legend-item">
            <div className="color-box" style={{background: 'linear-gradient(to right, #2196f3, #ff9800, #f44336)'}}></div>
            <span>20°C → 35°C</span>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>TRANSIT</h4>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#d42e12'}}></div>
            <span>North-South Line</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#009639'}}></div>
            <span>East-West Line</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#fa9e0d'}}></div>
            <span>Circle Line</span>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>EMOTIONAL</h4>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#ff6b35'}}></div>
            <span>Exciting</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#d32f2f'}}></div>
            <span>Chaotic</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#2196f3'}}></div>
            <span>Calm</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{backgroundColor: '#757575'}}></div>
            <span>Boring</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
