import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import img from '../assets/images/User2.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    maxWidth: theme.spacing(100),
  },
  cardleft: {
    maxWidth: theme.spacing(50),
    display: 'inline-block',
    marginRight: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardright: {
    maxWidth: theme.spacing(50),
    float: 'right',
    display: 'inline-block',
    marginLeft: theme.spacing(4),
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const ChatBubble = ({ chat }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Avatar
          className={classes.avatarLarge}
          alt="placeholder_icon"
          src={img}
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
