import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Toolbar, Typography } from '@material-ui/core';
import Appbar from '@material-ui/core/AppBar';
import pickleLogo from '../../assets/images/pickleLogo.png';
import ellipse from '../../assets/images/ellipse.png';
import tree from '../../assets/images/tree.png';
import forest from '../../assets/images/forest.png';
import useStyles from './styles';
import SearchBar from '../../components/SearchBar/SearchBar';

const StartPage = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e) => setId(e.target.value);

  function playSet() {
    if (!id) {
      setError(true);
    } else {
      setRedirect(true);
    }
  }

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
          DiPICKLE
        </Typography>
      </div>
      <SearchBar onChange={onChange} playSet={playSet} error={error} />
      <img src={forest} alt="forest" className={classes.forest} />
      <img src={tree} alt="tree" className={classes.tree} />
      {redirect ? (
        <Redirect
          to={{
            pathname: '/sets',
            state: { id },
          }}
        />
      ) : (
        <> </>
      )}
    </div>
  );
};

export default StartPage;
