import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/Map';

function App() {
  // The shared state for incidents
  const [incidents, setIncidents] = useState([]);

  // Function to add a new incident with a unique ID and timestamp
  const addIncident = (incident) => {
    // Add a unique id and timestamp if missing
    const incidentWithMetadata = {
      id: incident.id || Date.now(),
      timestamp: incident.timestamp || new Date().toISOString(),
      ...incident,
    };
    setIncidents((prev) => [...prev, incidentWithMetadata]);
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar to add incidents */}
      <Sidebar onAddIncident={addIncident} />

      {/* Map shows incidents and allows adding by map click */}
      <MapComponent incidents={incidents} onAddIncident={addIncident} />
    </div>
  );
}

export default App;
