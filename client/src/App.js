import './App.css';

import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Covid Geo
        </p>
        <Map />
      </header>
    </div>
  );
}

function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  // remove 
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoibm90YWtheSIsImEiOiJja2g2a24yamkwZmFwMzB1aWw3OG90NDZmIn0.1IYxmhdVDKYXnQBQZx6vPw"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}


export default App;
