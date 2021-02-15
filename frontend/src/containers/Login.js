import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign into your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account?
        <Link to="/signup">Sign Up</Link>
      </p>
      <p>
        Forgot your Password?
        <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

export default connect(null, { login })(Login);
