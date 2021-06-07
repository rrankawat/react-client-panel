import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

const AppNavbar = () => {
  const firebase = useFirebase();

  const auth = useSelector((state) => state.firebase.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth && auth.uid) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  const onLogout = (e) => {
    e.preventDefault();

    firebase.logout();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ClientPanel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav">
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {isAuthenticated && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="/#!" className="nav-link">
                  {auth.email}
                </a>
              </li>
              <li className="nav-item">
                <a href="/#!" className="nav-link" onClick={onLogout}>
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
