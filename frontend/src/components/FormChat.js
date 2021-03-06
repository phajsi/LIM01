import React from 'react';

import { TextField } from '@material-ui/core';

const FormChat = ({
  chatquestion,
  answer1,
  answer2,
  correctanswer,
  defaultreply,
  onChange,
}) => {
  return (
    <>
      <p>Skriv spørsmålet her: </p>
      <TextField
        name={chatquestion}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
      <TextField
        name={answer1}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
      <TextField
        name={answer2}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
      <TextField
        name={correctanswer}
        multiline
        fullWidth
        rowsMax={3}
        required
        variant="outlined"
        onChange={(e) => onChange(e)}
      />
      <p>Skriv inn respons på feil svar her: </p>
      <TextField
        name={defaultreply}
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

export default FormChat;
