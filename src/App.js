import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store, rrfProps } from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import UpdateClient from './components/clients/UpdateClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/client/add" component={UpdateClient} />
              <Route exact path="/client/:clientId" component={ClientDetails} />
              <Route
                exact
                path="/client/edit/:clientId"
                component={UpdateClient}
              />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
