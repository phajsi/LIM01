import React from 'react';
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import chatimage from '../../assets/images/chatModal.png';
import forstaelseimage from '../../assets/images/forstaelseModal.png';
import ryddesetningerimage from '../../assets/images/ryddeModal.png';
import useStyles from './styles';

const InfoModal = ({ showModal, setShowModal }) => {
  const classes = useStyles();

  const chatText =
    'For å opprette en Chat-øvelse må man fylle inn de forpliktede feltene. Det er valgfritt om man vil velge bilder for sender og mottager. Øvelsen består av et spørsmål, med tre svaralternativ hvor kun ett er riktig.';
  const forstaelseText =
    'For å opprette en Forståelse-øvelse må man fylle inn alle feltene. Først en melding, gjerne med en påstand. Deretter et ja/nei spørsmål basert på meldingen. Om brukeren skulle velge feil svar, må en forklaring på hvorfor det er feil vises.';
  const rydde_setningerText =
    'For å opprette en Rydde Setninger-øvelse må man formulere en setning på minst tre ord. For å legge til flere ord, trykker man på "+"-tegnet, setningen kan være på maks ti ord. Å velge ordklasser for ordene er valgfritt, om man ikke gjør det blir fargekoden grå. Hver ordklasse har en tilhørende fargekode, for å bedre visuell læring.';
  function setInfoText() {
    if (showModal === 'chat') {
      return (
        <div>
          <p>{chatText}</p>
          <img
            className={classes.image}
            src={chatimage}
            alt="Preview of chat"
          />
        </div>
      );
    }
    if (showModal === 'forstaelse') {
      return (
        <div>
          <p>{forstaelseText}</p>
          <img
            className={classes.image}
            src={forstaelseimage}
            alt="Preview of forstaelse"
          />
        </div>
      );
    }
    if (showModal === 'rydde_setninger') {
      return (
        <div>
          <p>{rydde_setningerText}</p>
          <img
            className={classes.image}
            src={ryddesetningerimage}
            alt="Preview of ryddesetninger"
          />
        </div>
      );
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {setInfoText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowModal(false)}
            color="primary"
            variant="contained"
          >
            Lukk
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InfoModal;
