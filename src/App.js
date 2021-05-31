import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';

export class App extends Component {
  render() {
    return (
      <Router>
        <AppNavbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
