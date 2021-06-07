import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

const AppNavbar = () => {
  const firebase = useFirebase();

  const auth = useSelector((state) => state.firebase.auth);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (auth && auth.uid) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [auth]);

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
            {isAuth && (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {isAuth && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/#" className="nav-link">
                  {auth.email}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/#"
                  className="nav-link"
                  onClick={() => firebase.logout()}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
