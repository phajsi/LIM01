import React, { useState, useEffect } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { axiosInstance, axiosInstanceDelete } from '../helpers/ApiFunctions';

const useStyles = makeStyles(() => ({
  card: {
    border: '3px solid lightcoral',
    textAlign: 'left',
  },
}));

/**
 * An icon component for saving/unsaving exercise sets.
 * @property {integer} id for the set
 * @returns clickable icon component
 */

function SaveIcon({ id }) {
  const classes = useStyles();
  const [saved, setSaved] = useState(false);

  function getSaved() {
    axiosInstance()
      .get(`/usersaved/${id}`)
      .then((res) => {
        setSaved(res.data.saved);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getSaved();
  }, []);

  // backend requests for saving/unsaving exercise set
  function onClickSave() {
    if (!saved) {
      axiosInstance()
        .post('/saved/', { sets: id })
        .then(() => {
          getSaved();
        })
        .catch((e) => {
          return e;
        });
    } else if (saved) {
      axiosInstanceDelete()
        .delete(`/saved/${id}`)
        .then(() => {
          getSaved();
        })
        .catch((e) => {
          return e;
        });
    }
  }

  return (
    <IconButton
      className={saved ? classes.saved : classes.notSaved}
      onClick={() => onClickSave()}
    >
      {saved ? (
        <FavoriteIcon style={{ color: 'red' }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}

export default SaveIcon;
