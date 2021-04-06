import React from 'react';
import { LinearProgress } from '@material-ui/core';

const ProgressBar = ({ progress, possible }) => {
  const MIN = 0;
  const MAX = possible;

  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

  return <LinearProgress value={normalise(progress)} variant="determinate" />;
};
export default ProgressBar;
