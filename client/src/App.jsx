import React, { useState } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Geo from './containers/geo';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Geo />
        {/* <Map/> */}
      </header>
    </div>
  );
}

export default App;
