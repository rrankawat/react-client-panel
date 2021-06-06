import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Spinner from '../layout/spinner/Spinner';

const UpdateClient = () => {
  const history = useHistory();
  const { clientId } = useParams();
  const firestore = useFirestore();

  useFirestoreConnect([{ collection: 'clients', doc: clientId }]);

  const client = useSelector(
    (state) =>
      state.firestore.ordered.clients && state.firestore.ordered.clients[0]
  );

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  });

  useEffect(() => {
    if (client && clientId) {
      setInputs({
        firstName: client.firstName || '',
        lastName: client.lastName || '',
        email: client.email || '',
        phone: client.phone || '',
        balance: client.balance || '',
      });
    } else {
      onReset();
    }
  }, [client, clientId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = inputs;

    // If no balance
    if (payload.balance === '') {
      payload.balance = 0;
    }

    if (client && clientId) {
      firestore
        .update({ collection: 'clients', doc: clientId }, payload)
        .then(history.push('/'));
    } else {
      firestore.add({ collection: 'clients' }, payload).then(history.push('/'));
    }

    // Reset Inputs
    onReset();
  };

  const onReset = () =>
    setInputs({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: '',
    });

  if (!client && clientId) {
    return <Spinner />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back
          </Link>
        </div>
      </div>

      <div className="card mt-2">
        <div className="card-header">
          {clientId ? 'Edit Client' : 'Add Client'}
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-1">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                minLength="2"
                required
                value={inputs.firstName}
                onChange={onChange}
              />
            </div>

            <div className="mb-1">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                minLength="2"
                required
                value={inputs.lastName}
                onChange={onChange}
              />
            </div>

            <div className="mb-1">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={inputs.email}
                onChange={onChange}
              />
            </div>

            <div className="mb-1">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                minLength="10"
                required
                value={inputs.phone}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label>Balance</label>
              <input
                type="text"
                className="form-control"
                name="balance"
                value={inputs.balance}
                onChange={onChange}
              />
            </div>

            <input
              type="submit"
              value={clientId ? 'Update Client' : 'Add Client'}
              className="btn btn-primary w-100"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateClient;
