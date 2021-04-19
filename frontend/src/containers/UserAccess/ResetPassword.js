import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, TextField, Card, CardHeader } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
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

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <h2>Request Password Reset:</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            variant="outlined"
            value={email}
            onChange={(e) => onChange(e)}
            fullWidth
            required
          />
          {requestSent && (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                avatar={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <CheckCircleOutlinedIcon style={{ color: 'lightgreen' }} />
                }
                title={`En Epost har blitt sendt til ${formData.email}. Trykk på linken i e-posten for å endre passordet ditt.`}
              />
            </Card>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.button}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
