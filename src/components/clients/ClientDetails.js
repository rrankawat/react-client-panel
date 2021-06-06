import React, { useState } from 'react';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import Spinner from '../layout/spinner/Spinner';

const ClientDetails = () => {
  const { clientId } = useParams();
  const history = useHistory();
  const firestore = useFirestore();

  useFirestoreConnect(() => [{ collection: 'clients', doc: clientId }]);

  const client = useSelector(
    (state) =>
      state.firestore.ordered.clients && state.firestore.ordered.clients[0]
  );

  const [showBalanceUpdate, setShowBalanceUpdate] = useState(false);
  const [balanceUpdateAmount, setBalanceUpdateAmount] = useState('');

  if (!client) {
    return <Spinner />;
  }

  const balanceSubmit = (e) => {
    e.preventDefault();

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    };

    firestore.update({ collection: 'clients', doc: clientId }, clientUpdate);
  };

  const onDelete = () =>
    firestore
      .delete({ collection: 'clients', doc: clientId })
      .then(history.push('/'));

  let balanceForm = '';
  // If balance form should display
  if (showBalanceUpdate) {
    balanceForm = (
      <form onSubmit={balanceSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add New Balance"
            value={balanceUpdateAmount}
            onChange={(e) => setBalanceUpdateAmount(e.target.value)}
          />
          <div className="input-group-append">
            <input
              type="submit"
              value="Update"
              className="btn btn-outline-dark"
            />
          </div>
        </div>
      </form>
    );
  } else {
    balanceForm = null;
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
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
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
            <h5>
              Client ID: <span className="text-secondary">{client.id}</span>
            </h5>

            <div className="d-flex flex-column">
              <h5>
                Balance:{' '}
                <span
                  className={
                    client.balance > 0 ? 'text-success' : 'text-danger'
                  }
                >
                  ${parseFloat(client.balance).toFixed(2)}
                </span>{' '}
                <small>
                  <a
                    href="#!"
                    onClick={() => setShowBalanceUpdate(!showBalanceUpdate)}
                  >
                    <i className="fas fa-pencil-alt" />
                  </a>
                </small>
              </h5>
              {balanceForm}
            </div>
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
