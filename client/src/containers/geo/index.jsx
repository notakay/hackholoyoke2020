import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import school_covid from '../../../src/data/school_covid.json';
import movement_data from '../../../src/data/movement_data.json';
import amherst_data from '../../../src/data/amherst_data.json';

const Geo = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 11,
    minZoom: 8,
    maxZoom: 12
  });

  const [movementLayer, setMovementLayer] = useState('visible');
  const [covidLayer, setCovidLayer] = useState('none');

  const minTimeString = "2020-02-01";
  const maxTimeString = "2020-02-28";


  const minTime = (new Date(minTimeString)).getTime();
  const maxTime = (new Date(maxTimeString)).getTime();

  const [date, setDate] = useState(minTime)
  const [dateString, setDateString] = useState(minTimeString);

  const handleInput = (e) => {
    let d = new Date();
    d.setTime(e.target.value);
    setDateString(d.toISOString().substring(0, 10));
    return setDate(e.target.value);
  }

  const info = (e) => {
    if (e === undefined) { return; }
    let index = 0;
    while (true) {
      if (e[index] && e[index].source === 'markers-data') {
        break;
      } else if (index >= e.length) {
        return;
      }
      index++;
    }
    const description = e[index].properties;
    let string = description.Cases + " covid cases at " + description.SchoolName;
    alert(string);
  }

  const toggleCovidLayer = () => {
    if (covidLayer === "none") {
      setCovidLayer("visible");
    } else {
      setCovidLayer("none");
    }
  }

  const geoJSON = movement_data;
  const schoolJSON = school_covid;
  const geoJSON2 = amherst_data;

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoibm90YWtheSIsImEiOiJja2g2a24yamkwZmFwMzB1aWw3OG90NDZmIn0.1IYxmhdVDKYXnQBQZx6vPw"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={e => info(e.features)}
      >

        <Source id="markers-data" type="geojson" data={schoolJSON}>
          <Layer
            id="markers"
            type="symbol"
            paint={{
              'icon-color': '#ff0000',
              "icon-halo-color": "#fff",
              "icon-halo-width": 2
            }}
            layout={{
              'icon-image': 'marker-15',
              'icon-allow-overlap': true,
              'visibility': covidLayer
            }}
          />
          <Layer
            id="s-heatmap"
            type="heatmap"
            paint={{
              "heatmap-opacity": 0.7,
              "heatmap-intensity": 0.8,
              // "heatmap-radius": 15
            }}
            layout={{
              // 'icon-image': 'marker-15',
              // 'icon-allow-overlap': true,
              'visibility': covidLayer
            }}
          />
        </Source>

        <Source id="movement-data" type="geojson" data={geoJSON}>
          <Layer
            id="movement"
            type="circle"
            paint={{
              'circle-radius': {
                'base': 1.75,
                stops: [[8, 1], [12, 3], [16, 10]]
              },
              'circle-opacity': 0.8,
              'circle-color': {
                property: 'ActivityIndex',
                stops: [
                  [0, '#2CC990'],
                  [0.07, '#f1f075'],
                  [0.2, '#ea7527'],
                  [0.5, '#e55e5e']
                ]
              }
            }}
            filter={['==', 'DayPeriod', dateString]}
            layout={{ 'visibility': movementLayer }}
          />
        </Source>

        <Source id="amherst-data" type="geojson" data={geoJSON2}>
          <Layer
            id="amherst"
            type="circle"
            paint={{
              'circle-radius': {
                'base': 1.75,
                stops: [[8, 1], [12, 3], [16, 10]]
              },
              'circle-opacity': 0.8,
              'circle-color': {
                property: 'ActivityIndex',
                stops: [
                  [0, '#2CC990'],
                  [0.07, '#f1f075'],
                  [0.2, '#ea7527'],
                  [0.5, '#e55e5e']
                ]
              }
            }}
            filter={['==', 'DayPeriod', dateString]}
            layout={{ 'visibility': movementLayer }}
          />
        </Source>
      </ReactMapGL>

      <div id="console">
        <h2>Date:</h2>
        <h1>{dateString}</h1>
        <input type="range" min={minTime} max={maxTime} value={date} onChange={handleInput} step="86400000" />
        <div>
          <button className="flat-utton" onClick={toggleCovidLayer}> Toggle School Layer </button>
        </div>
      </div>
    </div>
  );
}

export default Geo;
