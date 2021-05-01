import React from 'react';
import { LinearProgress } from '@material-ui/core';

/**
 * This is the progress bar displayed at the top of every exercise,
 * keeping track of the overall progress in a set.
 * @author Julie
 * @param {object} props
 * @property {integer} progress Counts how many exercises the user has played.
 * @property {integer} possible Total exercises in the set.
 * @returns A progress bar.
 */
const ProgressBar = ({ progress, possible }) => {
  const MIN = 0;
  const MAX = possible;
  // Takes the users progress and fills the progress bar as a percentage of the total number of exercises.
  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <LinearProgress
      color="secondary"
      value={normalise(progress)}
      variant="determinate"
    />
  );
};
export default ProgressBar;
