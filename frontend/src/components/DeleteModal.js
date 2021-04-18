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
        <Button
          onClick={() => setOpen(false)}
          color="secondary"
          variant="outlined"
        >
          Avbryt
        </Button>
        <Button onClick={() => onDelete()} color="primary" autoFocus>
          Slett
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
