import React from 'react';
import { version } from "antd";
import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>antd version: {version}</h1>
      </header>
    </div>
  );
}

export default App;
