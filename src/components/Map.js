import React, { useState, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ incidents, onAddIncident }) => {
  const [viewState, setViewState] = useState({
    longitude: 78,
    latitude: 22,
    zoom: 4,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  // Add incident by clicking on the map
  const handleMapClick = useCallback(
    (event) => {
      const { lngLat } = event;
      const newIncident = {
        id: Date.now(),
        lng: lngLat.lng,
        lat: lngLat.lat,
        description: `Incident at ${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`,
        timestamp: new Date().toISOString(),
      };
      onAddIncident(newIncident);
    },
    [onAddIncident]
  );

  return (
    <div style={{ flexGrow: 1, height: '100vh', position: 'relative' }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            longitude={incident.lng}
            latitude={incident.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation(); // Prevent map click event
              setPopupInfo(incident);
            }}
          >
            <div
              style={{
                color: 'red',
                cursor: 'pointer',
                fontSize: '24px',
                userSelect: 'none',
              }}
              title={incident.description}
            >
              📍
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            anchor="top"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div>
              <strong>{popupInfo.description}</strong>
              <br />
              <small>{new Date(popupInfo.timestamp).toLocaleString()}</small>
            </div>
          </Popup>
        )}
      </Map>

      {/* Instructions overlay */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
          fontSize: '14px',
        }}
      >
        Click anywhere on the map to add an incident ({incidents.length} total)
      </div>
    </div>
  );
};

export default MapComponent;
