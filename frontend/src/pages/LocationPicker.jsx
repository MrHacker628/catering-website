import React, { useState } from 'react';

// Simple, dependency-free location field. No map, no address search/suggestions,
// no external API — just a plain text input. Whatever the user types is saved
// directly as the event location.
function LocationPicker({ value, onChange }) {

  const [query, setQuery] = useState(value || '');

  function handleInputChange(e) {
    const val = e.target.value;
    setQuery(val);
    onChange({ target: { name: 'event_location', value: val } });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label htmlFor="event_location_input" style={{ fontSize: '13px', fontWeight: 600, color: '#4a0080' }}>
        Event Location
      </label>
      <input
        id="event_location_input"
        type="text"
        value={query}
        placeholder="Enter the event address or venue name..."
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '12px 14px',
          border: '1.5px solid #d0b0f0',
          borderRadius: '10px',
          fontSize: '15px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export default LocationPicker;
