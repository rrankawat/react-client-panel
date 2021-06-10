import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store, rrfProps } from './store';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import UpdateClient from './components/clients/UpdateClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
// import Register from './components/auth/Register';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AppNavbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/client/add" component={UpdateClient} />
              <PrivateRoute
                exact
                path="/client/:clientId"
                component={ClientDetails}
              />
              <PrivateRoute
                exact
                path="/client/edit/:clientId"
                component={UpdateClient}
              />
              <PublicRoute
                restricted={true}
                exact
                path="/login"
                component={Login}
              />
              {/* <PublicRoute
                restricted={true}
                exact
                path="/register"
                component={Register}
              /> */}
              <PublicRoute restricted={false} exact component={NotFound} />
            </Switch>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
