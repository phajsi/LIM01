import React from 'react';

import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

const FormForstaelse = ({
  chat,
  question,
  answer,
  explanation,
  onChange,
  handleRadio,
}) => {
  return (
    <>
      <p>Skriv tekstmeldingen her: </p>
      <TextField
        name={chat}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Skriv spørsmålet her: </p>
      <TextField
        name={question}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Velg svaret som er riktig </p>
      <RadioGroup row onChange={handleRadio}>
        <FormControlLabel
          name={answer}
          value="true"
          control={<Radio />}
          label="JA"
        />
        <FormControlLabel
          name="answer1"
          value="false"
          control={<Radio />}
          label="NEI"
        />
      </RadioGroup>
      <p>Skriv forklaring her: </p>
      <TextField
        name={explanation}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

export default FormForstaelse;
