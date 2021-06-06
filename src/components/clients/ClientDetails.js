import React from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../layout/spinner/Spinner';

const ClientDetails = () => {
  const { clientId } = useParams();
  useFirestoreConnect(() => [{ collection: 'clients', doc: clientId }]);

  const client = useSelector(
    (state) =>
      state.firestore.ordered.clients && state.firestore.ordered.clients[0]
  );

  if (!client) {
    return <Spinner />;
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <Link to="/" className="btn btn-link">
          <i className="fas fa-arrow-circle-left" /> Back
        </Link>

        <div className="btn-group">
          <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
            Edit
          </Link>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      <hr />

      <div className="card mt-4">
        <div className="card-header">
          <h3>
            {client.firstName} {client.lastName}
          </h3>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4>
              Client ID: <span className="text-secondary">{client.id}</span>
            </h4>
            <h4>
              Balance:{' '}
              <span
                className={client.balance > 0 ? 'text-success' : 'text-danger'}
              >
                ${parseFloat(client.balance).toFixed(2)}
              </span>
            </h4>
          </div>

          <hr />

          <ul className="list-group mt-4">
            <li className="list-group-item">Contact Email: {client.email}</li>
            <li className="list-group-item">Contact Phone: {client.phone}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
