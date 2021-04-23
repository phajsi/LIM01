import React from 'react';
import { Card, CardHeader, makeStyles } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(() => ({
  card: {
    border: '3px solid lightcoral',
    textAlign: 'left',
  },
  cardHeader: {
    padding: '3px',
    textAlign: 'left',
  },
}));

/**
 * Reusable errorMessage
 * @property {String} message content of the error message
 * @returns a card component with an error message, or nothing if no message was passed
 */

function ErrorMessage({ message }) {
  const classes = useStyles();
  if (!message) {
    return <></>;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<InfoOutlinedIcon style={{ color: 'lightcoral' }} />}
        title={message}
      />
    </Card>
  );
}

export default ErrorMessage;
