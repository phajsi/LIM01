import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useStyles from './styles';

/**
 * Reusable errorMessage.
 * @author Simen
 * @param {object} props
 * @property {string} message Content of the error message.
 * @returns A card component with an error message, or nothing if no message was passed.
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
        avatar={<InfoOutlinedIcon className={classes.icon} />}
        title={message}
      />
    </Card>
  );
}

export default ErrorMessage;
