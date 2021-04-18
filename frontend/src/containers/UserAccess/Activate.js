import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { verify } from '../../actions/auth';
import useStyles from './styles';

const Activate = ({ verify, match }) => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);

  const verify_account = () => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <h1>Verify your Account:</h1>
      <Button variant="contained" color="primary" onClick={verify_account}>
        Verify
      </Button>
    </div>
  );
};

export default connect(null, { verify })(Activate);
