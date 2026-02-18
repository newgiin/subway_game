import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Train } from 'lucide-react';

// ============================================================
// PASTE YOUR LINES DATA HERE
// ============================================================
const lines = [
  { "id": "1", "color": "#EE352E", "stations": [
    { "id": 1, "name": "Times Sq-42 St", "lat": 40.75529, "lng": -73.987495 }
  ]},
  { "id": "2", "color": "#EE352E", "stations": [
    { "id": 2, "name": "Grand Central-42 St", "lat": 40.751776, "lng": -73.976848 }
  ]}
];
// ============================================================

const ALL_STATIONS = Array.from(
  new Map(lines.flatMap(l => l.stations).map(s => [`${s.id}|${s.name}`, s])).values()
);
const ALL_LINES = lines.map(l => l.id);
const LINE_COLORS = Object.fromEntries(lines.map(l => [l.id, l.color]));
const LIGHT_TEXT_LINES = new Set(['N','Q','R','W','S','L','7','G']);

export default function SubwayGame() {
  const [leafletReady, setLeafletReady] = useState(false);
  const [mode, setMode] = useState('menu');
  const [guesses, setGuesses] = useState({});
  const [score, setScore] = useState(0);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lineStations, setLineStations] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [lineResult, setLineResult] = useState(null);
  const [wrongGuess, setWrongGuess] = useState('');

  const mapRef = useRef(null);       // Leaflet map instance
  const markersRef = useRef({});     // station key -> Leaflet marker
  const containerRef = useRef(null); // div ref for map container
  const selectRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Load Leaflet scripts once
  useEffect(() => {
    if (window.L) { setLeafletReady(true); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.body.appendChild(script);
  }, []);

  // Callback ref — fires as soon as the map div is mounted
  const mapDivRef = useCallback((node) => {
    containerRef.current = node;
    if (!node || !leafletReady || mapRef.current) return;
    initMap(node);
  }, [leafletReady]); // re-runs if leaflet loads after div mounts

  const initMap = (container) => {
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    const L = window.L;
    const m = L.map(container, { center: [40.758896, -73.985130], zoom: 12 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 19
    }).addTo(m);

    // Draw lines
    lines.forEach(line => {
      const coords = line.stations.map(s => [s.lat, s.lng]);
      L.polyline(coords, { color: line.color, weight: 4, opacity: 0.7 }).addTo(m);
    });

    // Add markers
    markersRef.current = {};
    ALL_STATIONS.forEach(station => {
      const key = `${station.id}|${station.name}`;
      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 6, fillColor: 'white', color: '#333', weight: 2, fillOpacity: 1
      }).addTo(m);
      marker.on('click', () => {
        if (modeRef.current === 'free') handleFreeClick(station);
      });
      markersRef.current[key] = marker;
    });

    mapRef.current = m;
    setTimeout(() => m.invalidateSize(), 100);
  };

  // Re-init map when switching into a game mode
  useEffect(() => {
    if (mode === 'menu' || mode === 'line-complete') return;
    if (!leafletReady) return;
    if (containerRef.current) initMap(containerRef.current);
  }, [mode, leafletReady]);

  // Update marker styles whenever state changes
  useEffect(() => {
    if (!mapRef.current) return;
    const activeId = mode === 'line' && lineStations[lineIndex]
      ? `${lineStations[lineIndex].id}|${lineStations[lineIndex].name}` : null;

    ALL_STATIONS.forEach(station => {
      const key = `${station.id}|${station.name}`;
      const marker = markersRef.current[key];
      if (!marker) return;
      const guess = guesses[key];
      const isActive = key === activeId;
      marker.setStyle({
        fillColor: isActive ? '#FFD700' : 'white',
        color: isActive ? '#FFD700' : guess?.correct ? '#228B22' : guess?.temporary ? '#DC143C' : '#333',
        weight: isActive ? 4 : 2,
        radius: isActive ? 10 : 6,
        fillOpacity: 1
      });
      if (guess?.correct) {
        marker.bindPopup(`<div style="color:#228B22;font-weight:bold;font-size:14px">✓ ${station.name}</div>`);
      } else {
        marker.unbindPopup();
      }
    });
  }, [guesses, mode, lineIndex, lineStations]);

  // Fly to station in line mode
  useEffect(() => {
    if (mode === 'line' && mapRef.current && lineStations[lineIndex]) {
      const s = lineStations[lineIndex];
      mapRef.current.flyTo([s.lat, s.lng], 15, { duration: 1 });
    }
  }, [lineIndex, lineStations, mode]);

  const startFreeMode = () => {
    setGuesses({}); setScore(0); setSelectedStation(null);
    setMode('free');
  };

  const startLineMode = (lineId) => {
    const line = lines.find(l => l.id === lineId);
    if (!line) return;
    setSelectedLine(lineId);
    setLineStations(line.stations);
    setLineIndex(0);
    setGuesses({}); setScore(0);
    setLineResult(null); setWrongGuess('');
    setMode('line');
  };

  const handleFreeClick = (station) => {
    const key = `${station.id}|${station.name}`;
    if (guesses[key]?.correct) return;
    setSelectedStation(station);
    setTimeout(() => selectRef.current?.focus(), 150);
  };

  const handleFreeGuess = (name) => {
    if (!selectedStation) return;
    const key = `${selectedStation.id}|${selectedStation.name}`;
    if (name === selectedStation.name) {
      setGuesses(p => ({ ...p, [key]: { correct: true } }));
      setScore(s => s + 1);
      setSelectedStation(null);
    } else {
      setGuesses(p => ({ ...p, [key]: { correct: false, temporary: true } }));
      setTimeout(() => setGuesses(p => {
        const n = { ...p }; if (n[key]?.temporary) delete n[key]; return n;
      }), 1500);
    }
  };

  const handleLineGuess = (name) => {
    if (lineResult) return;
    const cur = lineStations[lineIndex];
    const key = `${cur.id}|${cur.name}`;
    const ok = name === cur.name;
    setLineResult(ok ? 'correct' : 'wrong');
    if (!ok) setWrongGuess(name);
    if (ok) { setGuesses(p => ({ ...p, [key]: { correct: true } })); setScore(s => s + 1); }
  };

  const advanceLine = () => {
    setLineResult(null); setWrongGuess('');
    if (selectRef.current) selectRef.current.value = '';
    if (lineIndex + 1 >= lineStations.length) setMode('line-complete');
    else setLineIndex(i => i + 1);
  };

  const goMenu = () => {
    setMode('menu');
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    markersRef.current = {};
  };

  const cur = mode === 'line' ? lineStations[lineIndex] : null;
  const remainingFree = ALL_STATIONS.filter(s => !guesses[`${s.id}|${s.name}`]?.correct);
  const gameComplete = mode === 'free' && remainingFree.length === 0;

  // MENU
  if (mode === 'menu') return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-2">NYC Subway Quiz</h1>
      <p className="text-gray-400 mb-10">{ALL_STATIONS.length} unique stations · {ALL_LINES.length} lines</p>
      <div className="grid grid-cols-1 gap-6 w-full max-w-xl">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">🗺 Free Roam Mode</h2>
          <p className="text-gray-400 text-sm mb-4">Click any station on the map and identify it.</p>
          <button onClick={startFreeMode} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Start Free Roam</button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2"><Train size={22}/> Line Mode</h2>
          <p className="text-gray-400 text-sm mb-4">Pick a line and be quizzed on each stop sequentially.</p>
          <div className="flex flex-wrap gap-2">
            {ALL_LINES.map(id => (
              <button key={id} onClick={() => startLineMode(id)}
                style={{ backgroundColor: LINE_COLORS[id], color: LIGHT_TEXT_LINES.has(id) ? '#000' : '#fff' }}
                className="w-10 h-10 rounded-full font-bold text-sm hover:opacity-80">
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // LINE COMPLETE
  if (mode === 'line-complete') return (
    <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Line {selectedLine} Complete!</h1>
      <p className="text-2xl text-gray-300 mb-8">Score: {score} / {lineStations.length}</p>
      <div className="flex gap-4">
        <button onClick={() => startLineMode(selectedLine)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Retry</button>
        <button onClick={goMenu} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg">Menu</button>
      </div>
    </div>
  );

  // GAME
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="bg-white shadow-md p-3 flex items-center justify-between" style={{ zIndex: 1000 }}>
        <div className="flex items-center gap-3">
          <button onClick={goMenu} className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold">
            <RotateCcw size={16}/> Menu
          </button>
          {mode === 'line' && (
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: LINE_COLORS[selectedLine], color: LIGHT_TEXT_LINES.has(selectedLine) ? '#000' : '#fff' }}>
                {selectedLine}
              </span>
              <span className="font-semibold text-gray-700">Stop {lineIndex + 1} of {lineStations.length}</span>
            </div>
          )}
          {mode === 'free' && <span className="font-semibold text-gray-700">Free Roam — {ALL_STATIONS.length} stations</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">{score} / {mode === 'line' ? lineStations.length : ALL_STATIONS.length}</span>
          {gameComplete && <span className="text-green-600 font-bold">🎉 Complete!</span>}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <div ref={mapDivRef} style={{ width: '100%', height: '100%' }} />
        <style>{`.leaflet-container { font-size: 0 !important; } .leaflet-tile-pane { filter: brightness(1.05) grayscale(0.3); }`}</style>

        {/* Line mode panel */}
        {mode === 'line' && cur && (
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 420, padding: '0 16px', zIndex: 1000 }}>
            <div className="bg-white rounded-xl shadow-2xl p-4">
              {!lineResult ? (
                <>
                  <p className="text-sm text-gray-500 mb-2 font-medium">What is this station?</p>
                  <select ref={selectRef} size="6" defaultValue=""
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-500"
                    onChange={e => { if (e.target.value) handleLineGuess(e.target.value); }} autoFocus>
                    <option value="" disabled>Select a station...</option>
                    {lineStations.map(s => s.name).sort().map((n, i) => <option key={i} value={n}>{n}</option>)}
                  </select>
                </>
              ) : (
                <div className={`rounded-lg p-3 ${lineResult === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {lineResult === 'correct'
                    ? <p className="font-bold text-green-800">✓ Correct! {cur.name}</p>
                    : <p className="font-bold text-red-800">✗ Wrong. You said "{wrongGuess}". It was <strong>{cur.name}</strong>.</p>}
                  <button onClick={advanceLine} className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm">
                    {lineIndex + 1 >= lineStations.length ? 'See Results' : 'Next Stop →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Free mode popup */}
      {mode === 'free' && selectedStation && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col" style={{ maxHeight: '80vh' }}>
            <h2 className="text-2xl font-bold mb-4">Name this station:</h2>
            <select ref={selectRef} size="10" defaultValue="" autoFocus
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 mb-4"
              onChange={e => { if (e.target.value) { handleFreeGuess(e.target.value); e.target.value = ''; } }}>
              <option value="" disabled>Select a station...</option>
              {remainingFree.map(s => s.name).sort().map((n, i) => <option key={i} value={n}>{n}</option>)}
            </select>
            <button onClick={() => setSelectedStation(null)} className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}