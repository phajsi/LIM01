/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import {
  AppBar,
  Card,
  CardHeader,
  Grid,
  Toolbar,
  Paper,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    maxWidth: theme.spacing(40),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  layout: {
    backgroundColor: '#f5f5f5',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  stnField: {
    minHeight: '3em',
    backgroundColor: 'white',
    outline: 'solid 1px black',
    borderRadius: '25px',
  },
  wordBtn: {},
}));

const RyddeSetninger = () => {
  const classes = useStyles();
  const [chosenWords, setChosenWords] = useState([]);
  // const [disableBtn, setDisableBtn] = useState(false);

  const clicked = (e) => {
    console.log(e.currentTarget);
    console.log(chosenWords);
    setChosenWords((chosenWords) => [...chosenWords, e.target.innerHTML]);
  };

  const removeWord = (e) => {
    console.log(e.currentTarget.id);
    const temp = [...chosenWords];
    temp.splice(e.currentTarget.id, 1);
    setChosenWords(temp);
  };

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className={classes.layout} elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.header}>
              <CardHeader
                avatar={<VolumeUpIcon />}
                title="Trykk på ordene sånn at de kommer i
                 riktig rekkefølge. Husk å se på tegnsetting!"
              />
            </Card>
          </Grid>
          <Button
            className="wordBtn"
            color="secondary"
            variant="contained"
            onClick={(e) => clicked(e)}
          >
            Test
          </Button>
          <Button
            className="wordBtn"
            color="secondary"
            variant="contained"
            onClick={(e) => clicked(e)}
          >
            Word
          </Button>
          <Grid item xs={12} className={classes.stnField}>
            <div>
              {chosenWords.map((el, index) => (
                <Button
                  id={index}
                  color="secondary"
                  variant="contained"
                  onClick={(e) => removeWord(e)}
                >
                  {el}
                </Button>
              ))}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default RyddeSetninger;
