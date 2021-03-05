import React from 'react';
import { Button, Card, Grid, CardHeader } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  answerElement: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  answerElementWrong: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightcoral',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  answerBtn: {
    backgroundColor: 'white',
    marginRight: theme.spacing(1),
  },
  btnParent: {
    flex: '1',
    margin: 'auto',
    width: '50%',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
  },
}));

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
            <Button
              onClick={handleNextTask}
              className={classes.answerBtn}
              fullWidth
              size="small"
            >
              <TrendingFlatIcon fontSize="large" />
            </Button>
          </Card>
        </Grid>
      );
    default:
      return <></>;
  }
}

export default NextExerciseBtn;
