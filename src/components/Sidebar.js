import React, { useState } from 'react';

const Sidebar = ({ onAddIncident }) => {
  const [incident, setIncident] = useState({
    lat: '',
    lng: '',
    description: '',
    image_url: '',
  });

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate lat/lng are proper numbers
    const lat = parseFloat(incident.lat);
    const lng = parseFloat(incident.lng);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      alert('Latitude must be a number between -90 and 90');
      return;
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      alert('Longitude must be a number between -180 and 180');
      return;
    }

    if (!incident.description.trim()) {
      alert('Description is required');
      return;
    }

    // Build the incident object with ID and timestamp
    onAddIncident({
      id: Date.now(),
      lat,
      lng,
      description: incident.description,
      image_url: incident.image_url.trim() || null,
      timestamp: new Date().toISOString(),
    });
    // Reset form
    setIncident({
      lat: '',
      lng: '',
      description: '',
      image_url: '',
    });
  };

  return (
    <div
      style={{
        width: 320,
        padding: 16,
        background: '#f9f9f9',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <h2>Report Incident</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="number"
            name="lat"
            value={incident.lat}
            onChange={handleChange}
            step="any"
            required
            placeholder="e.g. 22.5726"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="lng"
            value={incident.lng}
            onChange={handleChange}
            step="any"
            required
            placeholder="e.g. 88.3639"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={incident.description}
            onChange={handleChange}
            required
            placeholder="Describe the incident"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </label>
        <label>
          Image URL (optional):
          <input
            type="text"
            name="image_url"
            value={incident.image_url}
            onChange={handleChange}
            placeholder="Enter image URL"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </label>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#0074D9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Incident
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
