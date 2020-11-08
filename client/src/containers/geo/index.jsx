import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

const Geo = () => {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 600,
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 8
  });

  const minTimeString = "2020-01-01";
  const maxTimeString = "2020-01-31";

  const minTime = (new Date(minTimeString)).getTime();
  const maxTime = (new Date(maxTimeString)).getTime();
  
  const [date, setDate] = useState(minTime)
  const [dateString, setDateString] = useState( minTimeString  );

  const handleInput = (e) => {
    let d = new Date();
    d.setTime(e.target.value);
    setDateString(d.toISOString().substring(0, 10));
    return setDate(e.target.value);
  }

  const geoJSON = {
    "type": "FeatureCollection", 
    "features": [
      {"type": "Feature", "geometry": {"type": "Point", "coordinates": [-71.47636413574219, 42.298135270693116]}, "properties": {"ActivityIndex": 0.16583399999999998, "DayPeriod": "2020-01-01", "Geography": "30233212032332022"}},
      {"type": "Feature", "geometry": {"type": "Point", "coordinates": [-71.39396667480469, 42.315400802951714]}, "properties": {"ActivityIndex": 0.027041000000000003, "DayPeriod": "2020-01-02", "Geography": "30233212033303120"}},
      {"type": "Feature", "geometry": {"type": "Point", "coordinates": [-71.45439147949219, 42.08344551677251]}, "properties": {"ActivityIndex": 0.03126, "DayPeriod": "2020-01-03", "Geography": "30233212233002220"}},
      {"type": "Feature", "geometry": {"type": "Point", "coordinates": [-71.22367858886719, 42.219873273583865]}, "properties": {"ActivityIndex": 0.041421, "DayPeriod": "2020-01-04", "Geography": "30233212303103000"}}
    ]
  };


  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoibm90YWtheSIsImEiOiJja2g2a24yamkwZmFwMzB1aWw3OG90NDZmIn0.1IYxmhdVDKYXnQBQZx6vPw"
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer
            id="point"
            type="circle"
            paint={{
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }}
            filter ={['==', 'DayPeriod', dateString]}
          />
        </Source>
      </ReactMapGL>

      <div id='console'>
        <p>Day: {dateString}</p>
        <input type="range" min={minTime} max={maxTime} value={date} onChange={handleInput} step="86400000" />

      </div>
    </div>
  );
}

export default Geo;