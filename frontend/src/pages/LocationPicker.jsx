import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_KEY = "AIzaSyBVMVM9hFtJrpwJC7H9zsLzcAt4sqAW-qY"; // ← your real key here

function LocationPicker({ value, onChange }) {

  const inputRef  = useRef(null);
  const mapRef    = useRef(null);
  const mapObjRef = useRef(null);
  const markerRef = useRef(null);
  const [selected, setSelected] = useState('');

  useEffect(function() {

    window.__mapsReady = function() {
      console.log("✅ Maps ready!");

      mapObjRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 19.0760, lng: 72.8777 },
      });

      const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'in' }
      });

      ac.addListener('place_changed', function() {
        const place = ac.getPlace();
        if (!place.geometry) return;
        setSelected(place.name);
        onChange({ target: { name: 'event_location', value: place.name + ', ' + place.formatted_address } });
        mapObjRef.current.setCenter(place.geometry.location);
        mapObjRef.current.setZoom(16);
        if (markerRef.current) markerRef.current.setMap(null);
        markerRef.current = new window.google.maps.Marker({
          map: mapObjRef.current,
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
        });
      });
    };

    const existing = document.getElementById('gmaps');
    if (!existing) {
      const s = document.createElement('script');
      s.id  = 'gmaps';
      s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places&callback=__mapsReady`;
      s.async = true;
      s.defer = true;
      s.onerror = () => console.error("❌ Maps failed to load");
      document.head.appendChild(s);
    } else if (window.google) {
      window.__mapsReady();
    }

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'16px' }}></span>
        <input
          ref={inputRef}
          type="text"
          defaultValue={value}
          placeholder="Search venue or address..."
          style={{
            width: '100%',
            padding: '12px 12px 12px 38px',
            border: '1.5px solid #d0b0f0',
            borderRadius: '10px',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Selected badge */}
      {selected && (
        <div style={{ background:'#e8f5e9', color:'#2e7d32', borderRadius:'8px', padding:'8px 12px', fontSize:'13px' }}>
          ✅ <strong>{selected}</strong> selected
        </div>
      )}

      {/* Map — always visible */}
      <div
        ref={mapRef}
        style={{
          width:        '100%',
          height:       '250px',
          borderRadius: '12px',
          border:       '2px solid #d0b0f0',
          background:   '#f5f0ff',
          overflow:     'hidden',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#999', fontSize:'14px' }}>
          🗺️ Loading map...
        </div>
      </div>

    </div>
  );
}

export default LocationPicker;