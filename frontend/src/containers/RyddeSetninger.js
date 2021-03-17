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
  wordBtn: {
    textTransform: 'lowercase',
  },
}));

const RyddeSetninger = () => {
  const classes = useStyles();
  const [words, setWords] = useState(['I', 'am', 'a', 'cute', 'doggo']);
  const [chosenWords, setChosenWords] = useState([]);
  // const [disableBtn, setDisableBtn] = useState(false);

  const clicked = (e) => {
    setChosenWords((chosenWords) => [...chosenWords, e.currentTarget.value]);
    const temp = [...words];
    temp.splice(e.currentTarget.id, 1);
    setWords(temp);
  };

  const removeWord = (e) => {
    setWords((words) => [...words, e.currentTarget.value]);
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
          <Grid item xs={12}>
            <div>
              {words.map((el, index) => (
                <Button
                  id={index}
                  className="wordBtn"
                  color="secondary"
                  variant="contained"
                  value={el}
                  onClick={(e) => clicked(e)}
                >
                  {el}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} className={classes.stnField}>
            <div>
              {chosenWords.map((el, index) => (
                <Button
                  id={index}
                  color="secondary"
                  variant="contained"
                  value={el}
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
