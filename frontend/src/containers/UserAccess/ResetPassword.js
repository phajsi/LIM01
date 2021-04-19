import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { reset_password } from '../../actions/auth';
import useStyles from './styles';

const ResetPassword = ({ reset_password }) => {
  const classes = useStyles();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <h1>Request Password Reset:</h1>
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
        <Button variant="contained" color="primary" type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
