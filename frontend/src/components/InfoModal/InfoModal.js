import React from 'react';
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import useStyles from './styles';

const InfoModal = ({ showModal, setShowModal }) => {
  const classes = useStyles();

  const chatText = 'halla dette er en test';
  const forstaelseText = 'test dette er test 2';
  const rydde_setningerText = 'popcorn er test 3';

  function setInfoText() {
    if (showModal === 'chat') {
      return <p>{chatText}</p>;
    }
    if (showModal === 'forstaelse') {
      return <p>{forstaelseText}</p>;
    }
    if (showModal === 'rydde_setninger') {
      return <p>{rydde_setningerText}</p>;
    }
    return <></>;
  }

  return (
    <Paper className={classes.root}>
      <Dialog
        open={!!showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bekreft Sletting</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {setInfoText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Lukk
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InfoModal;
