import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

const ChatBubble = ({ chat, senderIcon }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Avatar
          className={classes.avatarLarge}
          alt="placeholder_icon"
          src={senderIcon}
        />
      </Grid>
      <Grid item xs={9}>
        <Card className={classes.cardleft}>
          <p>{chat}</p>
        </Card>
      </Grid>
    </Grid>
  );
};
export default ChatBubble;
