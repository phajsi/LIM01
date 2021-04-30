import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper } from '@material-ui/core';
import { verify } from '../../actions/auth';
import useStyles from './styles';

/**
 * This code is based on a youtube tutorial:
 * Django & React JWT Authentication by Bryan Dunn
 * https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM
 * It has been modified and changed to fit our project.
 */

/**
 * Link to this page is sent to the user's email address after successfully registering
 * an account. The user can activate the registered account on this page.
 * @author Simen, Phajsi
 * @param {object} props
 * @property {function} verify redux action for verifying an account.
 * @property {object} match react router to match url.
 * @returns container for activating account.
 */

const Activate = ({ verify, match }) => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);

  const verify_account = () => {
    // User id and token needed for verification.
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
      <Paper className={classes.infoBox} style={{ padding: '24px' }}>
        <div style={{ margin: 'auto' }}>
          <h2 className={classes.headline}>Verify your Account</h2>
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={verify_account}
          >
            Verify
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default connect(null, { verify })(Activate);
