import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AnswerAlts = ({ answer1, answer2, correctanswer, setAnswerchoice }) => {
  function onclick(answer) {
    setAnswerchoice(answer);
  }
  return (
    <div>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button id={1} onClick={() => onclick(answer1)}>
          {answer1}
        </Button>
        <Button
          id={2}
          value="ALT2"
          onClick={() => onclick(answer2)}
          style={{ marginTop: 3 }}
        >
          {answer2}
        </Button>
        <Button
          id={3}
          value="ALT3"
          onClick={() => onclick(correctanswer)}
          style={{ marginTop: 3 }}
        >
          {correctanswer}
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default AnswerAlts;
