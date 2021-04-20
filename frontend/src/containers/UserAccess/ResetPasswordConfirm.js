import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper, TextField } from '@material-ui/core';
import { reset_password_confirm } from '../../actions/auth';
import useStyles from './styles';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const classes = useStyles();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    reset_password_confirm(uid, token, new_password, re_new_password);

    setSubmit(true);
  };

  function errorHandling() {
    if (passwordReset === true && submit) {
      return <Redirect to="/login" />;
    }
    if (passwordReset === 400 && submit) {
      return (
        <ErrorMessage message="Passordet ble ikke godkjent! Pass på at passordet møter kravene: minst 8 tegn, minst en stor og liten bokstav, minst et tall, passordet kan ikke være for vanlig eller for likt brukernavnet ditt." />
      );
    }
    if (typeof passwordReset === 'number' && passwordReset !== 400 && submit) {
      return <ErrorMessage message="Noe gikk galt! Prøv igjen senere." />;
    }
    return <></>;

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            type="password"
            placeholder="New Password"
            name="new_password"
            variant="outlined"
            value={new_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            fullWidth
            required
          />
          <TextField
            type="password"
            placeholder="Confirm New Password"
            name="re_new_password"
            variant="outlined"
            value={re_new_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};
export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
