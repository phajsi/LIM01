import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AnswerAlts = ({ answers }) => {
  const alt1 = answers.answ1;
  const alt2 = answers.answ2;
  const alt3 = answers.correctAnsw;

  function activateAnswer(e) {
    if (e.currentTarget.innerText === answers.correctAnsw) {
      return true;
    }
    return false;
  }
  return (
    <div>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button id={1} onClick={activateAnswer}>
          {alt1}
        </Button>
        <Button
          id={2}
          value="ALT2"
          onClick={activateAnswer}
          style={{ marginTop: 3 }}
        >
          {alt2}
        </Button>
        <Button
          id={3}
          value="ALT3"
          onClick={activateAnswer}
          style={{ marginTop: 3 }}
        >
          {alt3}
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default AnswerAlts;
