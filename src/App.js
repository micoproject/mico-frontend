import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import MicoManager from "./MicoManager/MicoManager";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projectid: "0x12345"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mico Manager</h1>
        </header>
          <MicoManager project={this.state.projectid} />
      </div>
    );
  }
}

export default App;
