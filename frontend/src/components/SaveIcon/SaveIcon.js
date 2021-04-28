import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

/**
 * An icon component for saving/unsaving exercise sets.
 * @property {integer} id for the set
 * @returns clickable icon component
 */

function SaveIcon({ id }) {
  const [saved, setSaved] = useState(false);

  function getSaved() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/usersaved/${id}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
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
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/saved/`,
          { sets: id },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('access')}`,
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          }
        )
        .then(() => {
          getSaved();
        })
        .catch((e) => {
          return e;
        });
    } else if (saved) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/saved/${id}`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
            accept: 'application/json',
          },
        })
        .then(() => {
          getSaved();
        })
        .catch((e) => {
          return e;
        });
    }
  }

  return (
    <IconButton data-testid="favoriteButton" onClick={() => onClickSave()}>
      {saved ? (
        <FavoriteIcon data-testid="favorite" style={{ color: 'red' }} />
      ) : (
        <FavoriteBorderIcon data-testid="notFavorite" />
      )}
    </IconButton>
  );
}

export default SaveIcon;
