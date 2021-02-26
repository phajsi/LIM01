import React, { useState } from 'react';
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    maxWidth: theme.spacing(80),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  form: {
    width: '70%',
    margin: theme.spacing(3),
  },
}));

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

const CreateForstaelse = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    chat: '',
    question: '',
    answer: null,
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

  return (
    <Paper className={classes.root}>
      <h1>Create Forståelse</h1>
      <form className={classes.form}>
        <p>Skriv tekstmeldingen her: </p>
        <TextField
          name="chat"
          multiline
          fullWidth
          rowsMax={3}
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
        <p>Skriv spørsmålet her: </p>
        <TextField
          name="question"
          multiline
          fullWidth
          rowsMax={3}
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
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
      </form>
      <Button onClick={(e) => onClick(e)} variant="contained">
        OPPRETT
      </Button>
      <Button variant="contained">AVBRYT</Button>
      <Button variant="contained">PREVIEW</Button>
    </Paper>
  );
};
export default CreateForstaelse;
