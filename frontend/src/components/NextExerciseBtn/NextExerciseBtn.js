import React from 'react';
import { Button, Card, Grid, CardHeader } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useStyles from './styles';

function NextExerciseBtn({ handleNextTask, answerState }) {
  const classes = useStyles();
  switch (answerState) {
    case 'incorrect':
      return (
        <Grid item xs={12}>
          <Card className={classes.answerElementWrong}>
            <CardHeader
              avatar={<CancelIcon style={{ color: 'white' }} />}
              title=" Feil! "
            />
            <div className={classes.btnParent}>
              <Button
                onClick={handleNextTask}
                className={classes.answerBtn}
                fullWidth
                size="small"
              >
                <TrendingFlatIcon fontSize="large" />
              </Button>
            </div>
          </Card>
        </Grid>
      );
    case 'correct':
      return (
        <Grid item xs={12}>
          <Card className={classes.answerElement}>
            <CardHeader
              avatar={<CheckCircleIcon style={{ color: 'white' }} />}
              title="Riktig!"
            />
            <div className={classes.btnParent}>
              <Button
                onClick={handleNextTask}
                className={classes.answerBtn}
                fullWidth
                size="small"
              >
                <TrendingFlatIcon fontSize="large" />
              </Button>
            </div>
          </Card>
        </Grid>
      );
    default:
      return <></>;
  }
}

export default NextExerciseBtn;
