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

  function errorHandling() {
    if (passwordReset === 400) {
      return (
        <ErrorMessage message="Noe gikk galt! Pass på at passordet har 8 tegn, en stor og liten bokstav samt et tall. Passordfeltene må være lik hverandre og du kan ikke velge et passord som er for vanlig eller ligner på brukernavnet ditt." />
      );
    }
    if (typeof passwordReset === 'number' && passwordReset === 400) {
      return <ErrorMessage message="Noe gikk galt! Prøv igjen senere." />;
    }
    return <></>;
  }

  if (passwordReset === true && submit) {
    return <Redirect to="/login" />;
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
