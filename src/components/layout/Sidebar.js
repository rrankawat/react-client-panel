import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Link to="/client/add" className="btn btn-success w-100">
      <i className="fas fa-plus" /> New
    </Link>
  );
}

export default Sidebar;
