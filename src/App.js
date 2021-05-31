import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';

export class App extends Component {
  render() {
    return (
      <Router>
        <AppNavbar />
        <div className="container">
          <h1>Hello</h1>
        </div>
      </Router>
    );
  }
}

export default App;
