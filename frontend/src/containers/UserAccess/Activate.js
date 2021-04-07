import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
      <div>
        <h1>Verify your Account:</h1>
        <button onClick={verify_account} type="button">
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
