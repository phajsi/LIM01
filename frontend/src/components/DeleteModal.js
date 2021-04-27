import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

/**
 * Modal for confirming unreversable deletions.
 * @param {Object} param0 props
 * @property {boolean} open open or closed modal
 * @property {function} setopen function for opening or closing the modal
 * @property {function} onDelete function that runs if the user confirms the deletion
 * @returns open of closed modal component
 */
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
          variant="outlined"
          data-testid="cancelButton"
          onClick={() => setOpen(false)}
        >
          Avbryt
        </Button>
        <Button
          variant="contained"
          data-testid="deleteButton"
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
