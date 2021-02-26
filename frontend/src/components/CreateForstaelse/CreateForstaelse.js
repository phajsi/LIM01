import React, { useState } from 'react';
import {
  Button,
  Fab,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Card,
  CardHeader,
  Grid,
} from '@material-ui/core';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import useStyles from './styles';
import ChatBubble from '../ChatBubble';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    'accept': 'application/json',
  },
});

const CreateForstaelse = ({ setStep }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    chat: '',
    question: '',
    answer: 'true',
    explanation: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/forstaelse/', {
        chat: formData.chat,
        question: formData.question,
        answer: formData.answer,
        explanation: formData.explanation,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  };
  const handleRadio = (event) =>
    setFormData({ ...formData, answer: event.target.value });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <h1>Create Forståelse</h1>
      <form onSubmit={(e) => onClick(e)} className={classes.form}>
        <p>Skriv tekstmeldingen her: </p>
        <TextField
          name="chat"
          multiline
          fullWidth
          rowsMax={3}
          required
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
        <p>Skriv spørsmålet her: </p>
        <TextField
          name="question"
          multiline
          fullWidth
          rowsMax={3}
          required
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
        <p>Velg svaret som er riktig </p>
        <RadioGroup row onChange={handleRadio}>
          <FormControlLabel value="true" control={<Radio />} label="JA" />
          <FormControlLabel value="false" control={<Radio />} label="NEI" />
        </RadioGroup>
        <p>Skriv forklaring her: </p>
        <TextField
          name="explanation"
          multiline
          fullWidth
          rowsMax={3}
          required
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
        <div className={classes.addIcon}>
          <Fab
            className={classes.innerMargin}
            size="small"
            onClick={() => setStep('Menu')}
            variant="contained"
          >
            <AddIcon />
          </Fab>
          <Fab
            className={classes.innerMargin}
            size="small"
            onClick={handleClickOpen}
            variant="contained"
          >
            <FindInPageOutlinedIcon />
          </Fab>
        </div>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button
              onClick={() => setStep('Menu')}
              variant="contained"
              color="secondary"
            >
              AVBRYT
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Button
              type="Submit"
              className={classes.buttonRight}
              variant="contained"
              color="primary"
            >
              OPPRETT
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Preview</DialogTitle>
          <DialogContent>
            <Paper className={classes.paper}>
              <Paper className={classes.layout} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card className={classes.header}>
                      <CardHeader
                        avatar={<VolumeUpIcon />}
                        title="Les hva Sarmi sier. Svar på spørsmålet"
                      />
                    </Card>
                  </Grid>
                  <ChatBubble chat={formData.chat} />
                  <Grid className={classes.gridText} item xs={12}>
                    <hr />
                    <p className={classes.text}>{formData.question}</p>
                  </Grid>
                  <>
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" fullWidth>
                        JA
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" color="primary" fullWidth>
                        NEI
                      </Button>
                    </Grid>
                  </>
                </Grid>
              </Paper>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
};
export default CreateForstaelse;
