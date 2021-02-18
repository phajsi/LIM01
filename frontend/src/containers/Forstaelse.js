import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardHeader } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubble from '../components/ChatBubble';

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
  text: {
    margin: theme.spacing(0),
  },
  gridText: {
    paddingBottom: theme.spacing(0),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
}));

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    'accept': 'application/json',
  },
});

const Forstaelse = () => {
  function test() {
    axiosInstance
      .post('/forstaelse/', {
        chat: 'sdfgbfhbfhb',
        question: 'dfhbaefhbn',
        answer: 'true',
        explanation: 'adhgtaeth',
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  const classes = useStyles();
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
                title="Les hva Sarmi sier. Svar på spørsmålet"
              />
            </Card>
          </Grid>
          <ChatBubble />
          <Grid className={classes.gridText} item xs={12}>
            <hr />
            <p className={classes.text}> gas wasdga sadfgsadf asdfgs</p>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={test}
              variant="contained"
              color="primary"
              fullWidth
            >
              button 1
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth>
              button 2
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Forstaelse;
