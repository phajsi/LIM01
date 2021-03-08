import React, { useState } from 'react';
import { Button, Fab, Paper, Grid } from '@material-ui/core';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import useStyles from './styles';
import Forstaelse from '../../containers/Forstaelse/Forstaelse';
import FormForstaelse from '../FormForstaelse';

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
  const [taskAmount, setTaskAmount] = useState(1);

  const [formData, setFormData] = useState({
    chat1: '',
    question1: '',
    answer1: 'true',
    explanation1: '',
    chat2: '',
    question2: '',
    answer2: 'true',
    explanation2: '',
    chat3: '',
    question3: '',
    answer3: 'true',
    explanation3: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/forstaelse/', {
        chat1: formData.chat1,
        question1: formData.question1,
        answer1: formData.answer1,
        explanation1: formData.explanation1,
        chat2: formData.chat2,
        question2: formData.question2,
        answer2: formData.answer2,
        explanation2: formData.explanation2,
        chat3: formData.chat3,
        question3: formData.question3,
        answer3: formData.answer3,
        explanation3: formData.explanation3,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  };
  const removeTask = () => {
    if (taskAmount === 2) {
      setFormData({
        ...formData,
        chat2: '',
        question2: '',
        answer2: '',
        explanation2: '',
      });
    }
    if (taskAmount === 3) {
      setFormData({
        ...formData,
        chat3: '',
        question3: '',
        answer3: '',
        explanation3: '',
      });
    }
    setTaskAmount(taskAmount - 1);
  };

  const handleRadio = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <h1>Forståelse</h1>
      <form onSubmit={(e) => onClick(e)} className={classes.form}>
        <h2> Oppgave 1 </h2>
        <FormForstaelse
          chat="chat1"
          question="question1"
          answer="answer1"
          explanation="explanation1"
          onChange={onChange}
          handleRadio={handleRadio}
        />
        {taskAmount > 1 && (
          <>
            <hr />
            <h2> Oppgave 2 </h2>
            <FormForstaelse
              chat="chat2"
              question="question2"
              answer="answer2"
              explanation="explanation2"
              onChange={onChange}
              handleRadio={handleRadio}
            />
          </>
        )}
        {taskAmount > 2 && (
          <>
            <hr />
            <h2> Oppgave 3 </h2>
            <FormForstaelse
              chat="chat3"
              question="question3"
              answer="answer3"
              explanation="explanation3"
              onChange={onChange}
              handleRadio={handleRadio}
            />
          </>
        )}
        <div className={classes.addIcon}>
          {taskAmount > 1 && (
            <Fab
              className={classes.innerMargin}
              size="small"
              onClick={() => removeTask()}
              variant="contained"
            >
              <RemoveIcon />
            </Fab>
          )}
          {taskAmount < 3 && (
            <Fab
              className={classes.innerMargin}
              size="small"
              onClick={() => setTaskAmount(taskAmount + 1)}
              variant="contained"
            >
              <AddIcon />
            </Fab>
          )}
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
            <Forstaelse preview createFormData={formData} />
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