import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';

const AddClient = () => {
  const firestore = useFirestore();
  const history = useHistory();

  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setClient((client) => ({ ...client, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newClient = client;

    // If no balance
    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore.collection('clients').add(newClient).then(history.push('/'));
  };

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
        <div className="card-header">Add Client</div>
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
                value={client.firstName}
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
                value={client.lastName}
                onChange={onChange}
              />
            </div>

            <div className="mb-1">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={client.email}
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
                value={client.phone}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label>Balance</label>
              <input
                type="text"
                className="form-control"
                name="balance"
                value={client.balance}
                onChange={onChange}
              />
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-primary w-100"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClient;
