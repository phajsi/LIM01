import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import useStyles from './styles';

const SearchBar = ({ onChange, playSet, error }) => {
  const classes = useStyles();
  return (
    <div className={classes.searchBox}>
      <h3 className={classes.searchTitle}> Søk med sett ID </h3>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={10}>
          <TextField
            className={classes.search}
            type="text"
            variant="outlined"
            placeholder="Finn oppgavesett"
            margin="dense"
            fullWidth
            error={error}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            onClick={() => playSet()}
          >
            Søk
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default SearchBar;
