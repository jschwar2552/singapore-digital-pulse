// Singapore Digital Pulse - Mock Data Generator
// Creates realistic data based on actual Singapore patterns

// Singapore bounds for realistic coordinate generation (unused but kept for reference)
// const SINGAPORE_BOUNDS = {
//   north: 1.4776,
//   south: 1.1448,
//   east: 104.0445,
//   west: 103.5935
// };

// Weather stations based on NEA real locations
export const weatherStations = [
  { id: 'changi', name: 'Changi', lat: 1.3644, lng: 103.9915, zone: 'east' },
  { id: 'clementi', name: 'Clementi', lat: 1.3162, lng: 103.7649, zone: 'west' },
  { id: 'jurong_west', name: 'Jurong West', lat: 1.3399, lng: 103.7090, zone: 'west' },
  { id: 'newton', name: 'Newton', lat: 1.3133, lng: 103.8558, zone: 'central' },
  { id: 'pasir_ris', name: 'Pasir Ris', lat: 1.3721, lng: 103.9474, zone: 'east' },
  { id: 'sentosa', name: 'Sentosa', lat: 1.2494, lng: 103.8303, zone: 'south' },
  { id: 'tai_seng', name: 'Tai Seng', lat: 1.3337, lng: 103.8851, zone: 'central' },
  { id: 'tuas', name: 'Tuas', lat: 1.2966, lng: 103.6132, zone: 'west' }
];

// Major MRT lines with key stations
export const mrtLines = [
  {
    name: 'North-South Line',
    color: '#d42e12',
    stations: [
      { name: 'Jurong East', lat: 1.3330, lng: 103.7424 },
      { name: 'Buona Vista', lat: 1.3070, lng: 103.7905 },
      { name: 'City Hall', lat: 1.2932, lng: 103.8520 },
      { name: 'Dhoby Ghaut', lat: 1.2996, lng: 103.8456 },
      { name: 'Orchard', lat: 1.3040, lng: 103.8319 },
      { name: 'Ang Mo Kio', lat: 1.3699, lng: 103.8496 },
      { name: 'Yishun', lat: 1.4294, lng: 103.8350 }
    ]
  },
  {
    name: 'East-West Line',
    color: '#009639',
    stations: [
      { name: 'Pasir Ris', lat: 1.3721, lng: 103.9474 },
      { name: 'Tampines', lat: 1.3548, lng: 103.9436 },
      { name: 'Bedok', lat: 1.3240, lng: 103.9304 },
      { name: 'Paya Lebar', lat: 1.3177, lng: 103.8926 },
      { name: 'City Hall', lat: 1.2932, lng: 103.8520 },
      { name: 'Raffles Place', lat: 1.2836, lng: 103.8518 },
      { name: 'Tanjong Pagar', lat: 1.2765, lng: 103.8459 },
      { name: 'Clementi', lat: 1.3150, lng: 103.7651 },
      { name: 'Jurong East', lat: 1.3330, lng: 103.7424 }
    ]
  },
  {
    name: 'Circle Line',
    color: '#fa9e0d',
    stations: [
      { name: 'Dhoby Ghaut', lat: 1.2996, lng: 103.8456 },
      { name: 'Bras Basah', lat: 1.2967, lng: 103.8506 },
      { name: 'Esplanade', lat: 1.2936, lng: 103.8553 },
      { name: 'Promenade', lat: 1.2932, lng: 103.8610 },
      { name: 'Nicoll Highway', lat: 1.2998, lng: 103.8635 },
      { name: 'Stadium', lat: 1.3028, lng: 103.8754 },
      { name: 'Mountbatten', lat: 1.3069, lng: 103.8820 },
      { name: 'Dakota', lat: 1.3081, lng: 103.8881 }
    ]
  }
];

// Generate weather data for different times of day
export const generateWeatherData = (timeOfDay = 'afternoon') => {
  const baseTemps = {
    morning: 26,
    afternoon: 32,
    evening: 29,
    night: 25
  };
  
  const baseTemp = baseTemps[timeOfDay] || 30;
  
  return weatherStations.map(station => ({
    ...station,
    temperature: baseTemp + (Math.random() - 0.5) * 4, // ±2°C variation
    humidity: 70 + Math.random() * 25, // 70-95% humidity
    rainfall: Math.random() < 0.3 ? Math.random() * 10 : 0, // 30% chance of rain
    timestamp: new Date().toISOString()
  }));
};

// Generate transport flow data
export const generateTransportFlow = () => {
  const flows = [];
  
  mrtLines.forEach(line => {
    for (let i = 0; i < line.stations.length - 1; i++) {
      const from = line.stations[i];
      const to = line.stations[i + 1];
      
      flows.push({
        from: { lat: from.lat, lng: from.lng, name: from.name },
        to: { lat: to.lat, lng: to.lng, name: to.name },
        line: line.name,
        color: line.color,
        intensity: Math.random() * 100, // Flow intensity 0-100
        direction: 'forward'
      });
      
      // Reverse direction
      flows.push({
        from: { lat: to.lat, lng: to.lng, name: to.name },
        to: { lat: from.lat, lng: from.lng, name: from.name },
        line: line.name,
        color: line.color,
        intensity: Math.random() * 100,
        direction: 'reverse'
      });
    }
  });
  
  return flows;
};

// Parse and format soundscape data
export const processSoundscapeData = (csvData) => {
  const lines = csvData.trim().split('\n');
  // Skip header line
  const soundscapePoints = [];
  
  // Parse each row (skip header)
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    // Extract data for each emotion category
    const emotions = [
      { type: 'exciting', color: '#ff6b35', startIdx: 0 },
      { type: 'chaotic', color: '#d32f2f', startIdx: 4 },
      { type: 'calm', color: '#2196f3', startIdx: 8 },
      { type: 'boring', color: '#757575', startIdx: 12 }
    ];
    
    emotions.forEach(emotion => {
      const lat = parseFloat(values[emotion.startIdx]);
      const lng = parseFloat(values[emotion.startIdx + 1]);
      const visits = parseInt(values[emotion.startIdx + 2]);
      const duration = parseFloat(values[emotion.startIdx + 3]);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        soundscapePoints.push({
          lat,
          lng,
          emotion: emotion.type,
          color: emotion.color,
          visits,
          duration,
          intensity: Math.min(visits * duration / 100, 1) // Normalize intensity
        });
      }
    });
  }
  
  return soundscapePoints;
};

// Demo time sequences
export const timeSequences = [
  { time: '06:00', label: 'Early Morning', weather: 'morning' },
  { time: '09:00', label: 'Morning Rush', weather: 'morning' },
  { time: '12:00', label: 'Lunch Time', weather: 'afternoon' },
  { time: '18:00', label: 'Evening Rush', weather: 'evening' },
  { time: '21:00', label: 'Night Life', weather: 'evening' },
  { time: '00:00', label: 'Late Night', weather: 'night' }
];