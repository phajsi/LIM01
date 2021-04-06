import React from 'react';
import { Avatar, Card, Grid } from '@material-ui/core';
import useStyles from './styles';
import defaultMan from '../../assets/images/defaultMan.png';

const ChatBubble = ({ chat, icon }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Avatar
          className={classes.avatarLarge}
          alt="placeholder_icon"
          src={icon || defaultMan}
        />
      </Grid>
      <Grid item xs={9}>
        <Card className={classes.cardLeft}>
          <p>{chat}</p>
        </Card>
      </Grid>
    </Grid>
  );
};
export default ChatBubble;
