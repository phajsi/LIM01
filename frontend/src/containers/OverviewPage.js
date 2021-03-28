import React from 'react';
import { Grid } from '@material-ui/core';

const OverviewPage = ({ title, description }) => {
  return (
    <Grid>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </Grid>
  );
};

export default OverviewPage;
