import React from 'react';
import { Avatar, Card, Grid } from '@material-ui/core';
import useStyles from './styles';
import defaultMan from '../../assets/images/defaultMan.png';

const ChatBubble = ({ chat, icon, right }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {right && <Grid item xs={3} />}
      <Grid item xs={9}>
        <div className={right ? classes.parentRight : classes.parentLeft}>
          <div className={right ? classes.floatRight : classes.floatLeft}>
            <Avatar
              className={classes.avatarLarge}
              alt="placeholder_icon"
              src={icon || defaultMan}
            />
          </div>
          <div className={right ? classes.floatRight : classes.floatLeft}>
            <Card className={right ? classes.cardRight : classes.cardLeft}>
              <p className={classes.text}>{chat}</p>
            </Card>
          </div>
        </div>
      </Grid>
      {!right && <Grid item xs={3} />}
    </Grid>
  );
};
export default ChatBubble;
