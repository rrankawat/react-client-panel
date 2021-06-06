import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';

const Login = () => {
  const firebase = useFirebase();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = inputs;

    firebase
      .login({ email, password })
      .catch((err) => alert('Invalid Login Credentials'));
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-lock" /> Login
              </span>
            </h1>

            <form onSubmit={onSubmit}>
              <div className="mb-1">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={inputs.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={inputs.password}
                  onChange={onChange}
                  required
                />
              </div>

              <input
                type="submit"
                value="Login"
                className="btn btn-primary w-100"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
