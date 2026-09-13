import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet's default marker icon paths break under bundlers like CRA/webpack
// because it tries to resolve them relative to the built JS file. Point them
// at the CDN copies instead — simplest fix, no asset-pipeline config needed.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DEFAULT_CENTER = { lat: 19.0760, lng: 72.8777 }; // Mumbai
const SEARCH_DEBOUNCE_MS = 400;

// Free, no-API-key address search via OpenStreetMap's Nominatim service.
// See https://operations.osmfoundation.org/policies/nominatim/ — light,
// non-commercial-scale usage like a single catering booking form is fine.
//
// Note: OSM's data is crowd-sourced, so small local venues (a specific hall,
// a specific shop) in smaller towns are sometimes just not mapped, unlike
// Google's much larger business database. When a search finds nothing, the
// user can still type the venue name/address by hand — see LocationPicker
// below, which always saves whatever is typed, suggestion or not — or drop
// a pin on the map directly if they know roughly where it is.
async function searchAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&countrycodes=in&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Nominatim search failed: ${res.status}`);
  return res.json();
}

async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Nominatim reverse geocode failed: ${res.status}`);
  const data = await res.json();
  return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function LocationPicker({ value, onChange }) {

  const inputRef    = useRef(null);
  const mapRef      = useRef(null);
  const mapObjRef   = useRef(null);
  const markerRef   = useRef(null);
  const blurTimerRef = useRef(null);
  const onChangeRef = useRef(onChange); // kept fresh for the map-click handler below, which is registered once on mount

  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(function() { onChangeRef.current = onChange; }, [onChange]);

  function placeMarker(lat, lng) {
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = L.marker([lat, lng]).addTo(mapObjRef.current);
  }

  // ── Init map once, including click-to-drop-a-pin for venues the free
  //    address search doesn't know about (see note on searchAddress above) ──
  useEffect(function() {
    mapObjRef.current = L.map(mapRef.current).setView(
      [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapObjRef.current);

    mapObjRef.current.on('click', function(e) {
      const { lat, lng } = e.latlng;
      placeMarker(lat, lng);
      setLocating(true);
      reverseGeocode(lat, lng)
        .then(function(label) {
          setQuery(label);
          onChangeRef.current({ target: { name: 'event_location', value: label } });
        })
        .catch(function(err) {
          console.error('Reverse geocode failed:', err);
          const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          setQuery(fallback);
          onChangeRef.current({ target: { name: 'event_location', value: fallback } });
        })
        .finally(function() { setLocating(false); });
    });

    return function() {
      mapObjRef.current.remove();
      mapObjRef.current = null;
    };
  }, []);

  // ── Debounced address search as the user types ──
  useEffect(function() {
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(function() {
      setSearching(true);
      searchAddress(query)
        .then(function(results) { setSuggestions(results); })
        .catch(function(err) { console.error('Address search failed:', err); setSuggestions([]); })
        .finally(function() { setSearching(false); });
    }, SEARCH_DEBOUNCE_MS);

    return function() { clearTimeout(timer); };
  }, [query]);

  // Whatever is typed is always saved as the location — picking a suggestion
  // (or tapping the map) just refines it with an exact match + pin. This way
  // someone can always type a venue name/address by hand (e.g. "GM Hall,
  // Ponda, Goa") even if the free search above has never heard of it.
  function handleInputChange(e) {
    const val = e.target.value;
    setQuery(val);
    setShowSuggestions(true);
    onChange({ target: { name: 'event_location', value: val } });
  }

  function selectPlace(place) {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);
    const label = place.display_name;

    setQuery(label);
    setSuggestions([]);
    setShowSuggestions(false);

    onChange({ target: { name: 'event_location', value: label } });

    mapObjRef.current.setView([lat, lng], 16);
    placeMarker(lat, lng);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search venue or address..."
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // small delay so a click on a suggestion registers before it's hidden
            blurTimerRef.current = setTimeout(() => setShowSuggestions(false), 150);
          }}
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
        <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'16px' }}>📍</span>

        {/* Suggestions dropdown */}
        {showSuggestions && (searching || suggestions.length > 0) && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1.5px solid #d0b0f0',
            borderRadius: '10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            zIndex: 1000,
            maxHeight: '220px',
            overflowY: 'auto',
          }}>
            {searching && (
              <div style={{ padding: '10px 14px', fontSize: '13px', color: '#999' }}>Searching…</div>
            )}
            {!searching && suggestions.map(function(place, i) {
              return (
                <div
                  key={place.place_id || i}
                  onMouseDown={() => selectPlace(place)}
                  style={{
                    padding: '10px 14px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    borderBottom: i < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  {place.display_name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live confirmation of what will be saved — updates as you type, so
          it's clear a manually typed address is being saved too, not just
          ones picked from the dropdown */}
      {query.trim() && (
        <div style={{ background:'#e8f5e9', color:'#2e7d32', borderRadius:'8px', padding:'8px 12px', fontSize:'13px' }}>
          {locating ? '📍 Locating…' : <>✅ Will be saved as: <strong>{query}</strong></>}
        </div>
      )}

      {/* Map — always visible. Tap/click anywhere to drop a pin — handy when
          the search above can't find a specific small venue. */}
      <div
        ref={mapRef}
        style={{
          width:        '100%',
          height:       '250px',
          borderRadius: '12px',
          border:       '2px solid #d0b0f0',
          background:   '#f5f0ff',
          overflow:     'hidden',
          cursor:       'crosshair',
        }}
      />

      <p style={{ fontSize: '11px', color: '#999', margin: 0 }}>
        Can't find your venue in search? Tap the map to drop a pin at the exact spot. · Map data © OpenStreetMap contributors
      </p>

    </div>
  );
}

export default LocationPicker;
