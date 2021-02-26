/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const CreateForstaelse = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1>Create Forståelse</h1>
      <form className={classes.form}>
        <p>Skriv textmeldingen her: </p>
        <TextField
          name="chat"
          multiline
          fullWidth
          rowsMax={3}
          variant="outlined"
        />
        <p>Skriv spørsmålet her: </p>
        <TextField
          name="question"
          multiline
          fullWidth
          rowsMax={3}
          variant="outlined"
        />
        <p>Velg svaret som er riktig </p>
        <RadioGroup row>
          <FormControlLabel value="JA" control={<Radio />} label="JA" />
          <FormControlLabel value="NEI" control={<Radio />} label="NEI" />
        </RadioGroup>
        <p>Skriv forklaring her: </p>
        <TextField
          name="explanation"
          multiline
          fullWidth
          rowsMax={3}
          variant="outlined"
        />
      </form>
      <Button variant="contained">AVBRYT</Button>
      <Button variant="contained">OPPRETT</Button>
    </Paper>
  );
};
export default CreateForstaelse;
