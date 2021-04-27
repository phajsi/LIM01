import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { axiosInstance, axiosInstanceDelete } from '../helpers/ApiFunctions';

/**
 * An icon component for saving/unsaving exercise sets.
 * @property {integer} id for the set
 * @returns clickable icon component
 */

function SaveIcon({ id }) {
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
    <IconButton onClick={() => onClickSave()}>
      {saved ? (
        <FavoriteIcon style={{ color: 'red' }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
}

export default SaveIcon;
