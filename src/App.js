import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <div className="App">
        <p className="heading">Hello there !! watch your favorite movies !!</p>
        <Dashboard {...this.props} />
      </div>
    );
  }
}

export default App;
