import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import useStyles from './CreateForstaelse/styles';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    Authorization: `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const CreateRyddeSetninger = ({ setStep, updateFormDataRyddeSetninger }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    word1: '',
    wordClass1: '',
    word2: '',
    wordClass2: '',
    word3: '',
    wordClass3: '',
    word4: '',
    wordClass4: '',
    word5: '',
    wordClass5: '',
    word6: '',
    wordClass6: '',
    word7: '',
    wordClass7: '',
    word8: '',
    wordClass8: '',
    word9: '',
    wordClass9: '',
    word10: '',
    wordClass10: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/create_rydde_setninger/', formData)
      .then((response) => {
        setStep('Menu');
        updateFormDataRyddeSetninger(response.data.id);
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  return (
    <Paper className={classes.root}>
      <h1>Rydde Setninger</h1>
      <form onSubmit={(e) => onClick(e)} className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              name="word1"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="wordClass1"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="word2"
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="wordClass2"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="word3"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="wordClass3"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button
              onClick={() => setStep('Menu')}
              className={classes.buttonRight}
              variant="contained"
              color="secondary"
            >
              AVBRYT
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Button type="Submit" variant="contained" color="primary">
              OPPRETT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateRyddeSetninger;
