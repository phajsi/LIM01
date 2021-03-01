import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AnswerAlts = ({ answers }) => {
  console.log(answers[2]);

  function activateAnswer(e) {
    if (e.currentTarget.innerText === answers[2]) {
      console.log('Dette er sant');
      return true;
    }
    console.log('Dette er usant');
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
          {answers[0]}
        </Button>
        <Button
          id={2}
          value="ALT2"
          onClick={activateAnswer}
          style={{ marginTop: 3 }}
        >
          {answers[1]}
        </Button>
        <Button
          id={3}
          value="ALT3"
          onClick={activateAnswer}
          style={{ marginTop: 3 }}
        >
          {answers[2]}
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default AnswerAlts;
