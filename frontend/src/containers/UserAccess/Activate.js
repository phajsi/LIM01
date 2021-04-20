import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper } from '@material-ui/core';
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
