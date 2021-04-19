import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const DeleteModal = ({ open, setOpen, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Bekreft Sletting</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bekreft sletting. Det kan ikke omgjøres.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Avbryt
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDelete()}
          autoFocus
        >
          Slett
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
