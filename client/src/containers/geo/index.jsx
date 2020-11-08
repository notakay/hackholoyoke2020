import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Source, Layer, Popup } from 'react-map-gl';
// import amherst_june from '../../../src/data/3023320213-06.json'
import boston_feb from '../../../src/data/0302332-02.json'
import boston_june from '../../../src/data/0302332-06.json'
import amherst_feb from '../../../src/data/amherst-0302332-02.json'


const Geo = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 11,
    minZoom: 10,
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
    if (!e) {return;}
    let index = 0;
    while (true) {
      if (e[index].source === 'markers-data') {
        break;
      } else if (index >= e.length) {
        return;
      }
      index++;
    }
    const coordinates = e[index].geometry.coordinates.slice();
    const description = e[index].properties.Description;
    alert(description);
  }

  const toggleCovidLayer = () => {
    if (covidLayer === "none") {
      setCovidLayer("visible");
    } else {
      setCovidLayer("none");
    }
  }

  const geoJSON2 = {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.47636413574219, 42.298135270693116] }, "properties": { "ActivityIndex": 0.16583399999999998, "DayPeriod": "2020-02-01", "Geography": "30233212032332022" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.39396667480469, 42.315400802951714] }, "properties": { "ActivityIndex": 0.027041000000000003, "DayPeriod": "2020-02-01", "Geography": "30233212033303120" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.45439147949219, 42.08344551677251] }, "properties": { "ActivityIndex": 0.03126, "DayPeriod": "2020-02-01", "Geography": "30233212233002220" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.22367858886719, 42.219873273583865] }, "properties": { "ActivityIndex": 0.041421, "DayPeriod": "2020-02-01", "Geography": "30233212303103000" } }
    ]
  };

  const geoJSON3 = {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.47636413574219, 42.298135270693116] }, "properties": { "ActivityIndex": 0.16583399999999998, "Description": "Covid Case count here", "DayPeriod": "2020-02-01", "Geography": "30233212032332022" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.39396667480469, 42.315400802951714] }, "properties": { "ActivityIndex": 0.027041000000000003, "Description": "Covid Case count here", "DayPeriod": "2020-02-01", "Geography": "30233212033303120" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.45439147949219, 42.08344551677251] }, "properties": { "ActivityIndex": 0.03126, "Description": "Covid Case count here", "DayPeriod": "2020-02-01", "Geography": "30233212233002220" } },
      { "type": "Feature", "geometry": { "type": "Point", "coordinates": [-71.22367858886719, 42.219873273583865] }, "properties": { "ActivityIndex": 0.041421, "Description": "Covid Case count here", "DayPeriod": "2020-02-01", "Geography": "30233212303103000" } }
    ]
  };

  const geoJSON = amherst_feb



  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoibm90YWtheSIsImEiOiJja2g2a24yamkwZmFwMzB1aWw3OG90NDZmIn0.1IYxmhdVDKYXnQBQZx6vPw"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={e => info(e.features)}
      >

        <Source id="markers-data" type="geojson" data={geoJSON3}>
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
            }}
          />
        </Source>


        <Source id="movement-data" type="geojson" data={geoJSON}>
          <Layer
            id="movement"
            type="circle"
            // paint={{
            //   'heatmap-intensity': 0.7,
            //   'heatmap-opacity': 0.8,
            //   'heatmap-radius': 10,
            // }}
            paint={{
              'circle-radius': {
                'base':1.75,
                stops: [[7, 1], [9, 2], [12, 3]]
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

        <Source id="covid-data" type="geojson" data={geoJSON2}>
          <Layer
            id="covid"
            type="circle"
            filter={['==', 'DayPeriod', dateString]}
            layout={{ 'visibility': covidLayer }}
          />
        </Source>
      </ReactMapGL>

      <div id="console">
        <h2>Date:</h2>
        <h1>{dateString}</h1>
        <input type="range" min={minTime} max={maxTime} value={date} onChange={handleInput} step="86400000" />
        <div>
          <button className="flat-utton" onClick={toggleCovidLayer}> Toggle Covid Layer </button>
        </div>
      </div>
    </div>
  );
}

export default Geo;