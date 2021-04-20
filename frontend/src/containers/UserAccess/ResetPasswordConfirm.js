import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper, TextField } from '@material-ui/core';
import { reset_password_confirm } from '../../actions/auth';
import useStyles from './styles';
import ErrorMessage from '../../components/ErrorMessage';

const ResetPasswordConfirm = ({
  match,
  reset_password_confirm,
  passwordReset,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });
  const [submit, setSubmit] = useState(false);

  const { new_password, re_new_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmit(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    reset_password_confirm(uid, token, new_password, re_new_password);
    setSubmit(true);
  };

  const message = () => {
    return (
      <div className={classes.message}>
        <p>Passordet ble ikke godkjent! </p>
        <p>Pass på at passordet møter kravene: </p>
        <div className={classes.messageList}>
          <p>minst 8 tegn</p>
          <p>minst en stor og liten bokstav</p>
          <p>minst et tall</p>
          <p>passordet kan ikke være for vanlig</p>
          <p>passordet kan ikke være for likt brukernavnet</p>
        </div>
      </div>
    );
  };

  function errorHandling() {
    if (passwordReset === true && submit) {
      return <Redirect to="/login" />;
    }
    if (passwordReset === 400 && submit) {
      return <ErrorMessage message={() => message()} />;
    }
    if (typeof passwordReset === 'number' && passwordReset !== 400 && submit) {
      return <ErrorMessage message="Noe gikk galt! Prøv igjen senere." />;
    }
    return <></>;
  }

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
          {errorHandling()}
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

const mapStateToProps = (state) => ({
  passwordReset: state.auth.passwordReset,
});

export default connect(mapStateToProps, { reset_password_confirm })(
  ResetPasswordConfirm
);
