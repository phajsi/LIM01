import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, TextField, Card, CardHeader } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { reset_password } from '../../actions/auth';
import useStyles from './styles';

/**
 * This code is based on a youtube tutorial:
 * Django & React JWT Authentication by Bryan Dunn
 * https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM
 * It has been modified and changed to fit our project.
 */

/**
 * Users can enter email and request a password reset. An email will be sent with
 * a link for resetting password.
 * @author Simen, Phajsi
 * @param {object} props
 * @property {function} reset_password redux action for resetting password.
 * @returns container for resetting password.
 */

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
        <h2 className={classes.headline}>Request Password Reset</h2>
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
                avatar={<CheckCircleOutlinedIcon className={classes.icon} />}
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
