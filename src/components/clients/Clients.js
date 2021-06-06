import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/spinner/Spinner';

const Clients = () => {
  useFirestoreConnect(['clients']);

  const clients = useSelector((state) => state.firestore.ordered.clients);

  const [totalOwed, setTotalOwed] = useState(null);

  useEffect(() => {
    if (clients) {
      // Add balance
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      setTotalOwed(total);
    }
  }, [clients]);

  if (clients) {
    return (
      <>
        <div className="d-flex justify-content-between">
          <h2>
            <i className="fas fa-users" /> Clients
          </h2>

          <h5 className="text-right text-secondary">
            Total Owed{' '}
            <span className="text-primary">
              ${parseFloat(totalOwed).toFixed(2)}
            </span>
          </h5>
        </div>

        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td>{client.email}</td>
                <td>${parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    to={`/client/${client.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right" /> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    return <Spinner />;
  }
};

export default Clients;
