import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../components/layout/spinner/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, profile } = useSelector((state) => state.firebase);

  if (!profile.isLoaded) {
    return <Spinner />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth && auth.uid ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
