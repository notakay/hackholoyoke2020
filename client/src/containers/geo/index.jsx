import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import './geo.css';

const Geo = () => {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 600,
    latitude: 40.7331,
    longitude: -73.9712,
    zoom: 12
  });

  const [date, setDate] = useState(0)


  const EMPTY_STYLE = {
    version: 8,
    sources: {},
    layers: []
  };

  const geoJSON = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
      { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] } },
      { "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-150.4048, 63.1224, 105.5] } },
      { "type": "Feature", "properties": { "id": "ak16994517", "mag": 1.6, "time": 1507424832518, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.3597, 63.0781, 0.0] } },
      { "type": "Feature", "properties": { "id": "ci38021336", "mag": 1.42, "time": 1507423898710, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-118.497, 34.299667, 7.64] } },
      { "type": "Feature", "properties": { "id": "us2000b2nn", "mag": 4.2, "time": 1507422626990, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-87.6901, 12.0623, 46.41] } },
      { "type": "Feature", "properties": { "id": "ak16994510", "mag": 1.6, "time": 1507422449194, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.5053, 63.0719, 0.0] } },
      { "type": "Feature", "properties": { "id": "us2000b2nb", "mag": 4.6, "time": 1507420784440, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-178.4576, -20.2873, 614.26] } }
    ]
  }

  const handleChange = function (event) {
    setDate( event.target.value );
  }

  return (
    <div>
      <p>Day: {date}</p>
      <input type="range" min="0" max="31" value={date} onChange={e => setDate(e.target.value)} step="1" />

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
            }} />
        </Source>
      </ReactMapGL>
    </div>
  );
}

export default Geo;