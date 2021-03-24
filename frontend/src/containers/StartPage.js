import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Appbar from '@material-ui/core/AppBar';
import pickleLogo from '../assets/images/pickleLogo.png';
import ellipse from '../assets/images/ellipse.png';
import tree from '../assets/images/tree.png';
import forest from '../assets/images/forest.png';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, #53A77A 1.46%, #80D197 100%)',
  },
  navbar: {
    backgroundColor: 'transparent',
    elevation: 'none',
  },
  title: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    float: 'right',
    margin: theme.spacing(1),
    textDecoration: 'none',
  },
  right: {
    flex: 1,
  },
  logoBox: {
    lineHeight: '200px',
    justifyContent: 'center',
  },
  logoImg: {
    verticalAlign: 'middle',
  },
  logoText: {
    display: 'inline-block',
    border: '3px solid #0F6D5F',
    boxSizing: 'border-box',
    fontFamily: 'Roboto',
    fontWeight: '200',
    color: '#0F6D5F',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  searchBox: {
    margin: 'auto',
    width: '40vw',
  },
  search: {
    backgroundColor: 'white',
    border: '2px solid #0F6D5F',
    boxSizing: 'border-box',
    borderRadius: '5px',
    margin: theme.spacing(4),
  },
  btn: {
    backgroundColor: '#F7B733',
    color: 'black',
    fontWeight: 'bold',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15))',
  },
  ellipse: {
    width: '20vw',
    display: 'block',
    position: 'absolute',
    top: '0',
  },
  tree: {
    width: '16vw',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    right: '10vw',
  },
  forest: {
    width: '28vw',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '12vw',
  },
}));

const StartPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Appbar position="relative" className={classes.navbar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.right}>
            <Link to="/login" className={classes.title}>
              Log inn
            </Link>
            <Link to="/signup" className={classes.title}>
              Registrer deg
            </Link>
          </Typography>
        </Toolbar>
      </Appbar>
      <img src={ellipse} alt="ellipse" className={classes.ellipse} />
      <div className={classes.logoBox}>
        <img src={pickleLogo} alt="pickle logo" className={classes.logoImg} />
        <Typography variant="h3" className={classes.logoText}>
          DiPLICKLE
        </Typography>
      </div>
      <div className={classes.searchBox}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={9}>
            <TextField
              className={classes.search}
              type="text"
              placeholder="Finn oppgavesett"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Button fullWidth variant="contained" className={classes.btn}>
              Søk
            </Button>
          </Grid>
        </Grid>
      </div>
      <img src={forest} alt="forest" className={classes.forest} />
      <img src={tree} alt="tree" className={classes.tree} />
    </div>
  );
};

export default StartPage;
