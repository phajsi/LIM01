import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from './SaveIcon';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: 'orange',
  },
  cardHeader: {
    padding: '12px',
  },
  card: {
    marginTop: '3px',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.between('sm', 'xl')]: {
      width: '60vw',
    },
  },
}));

/**
 * Reusable card component for exercise sets with icon buttons for playing, saving,
 * editing and deleting exercise sets.
 * @param {Object} param0 props
 * @returns card component for given exercise set
 */

function SetCard({ type, formData, onClick1, onClick2, onClick3 }) {
  const classes = useStyles();

  // returns different buttons depending on the type of card.
  function iconButtons() {
    if (type !== 'mySet') {
      return (
        <>
          <SaveIcon id={formData.sets} />
          <IconButton onClick={() => onClick1()}>
            <PlayCircleOutlineIcon style={{ fontSize: 30 }} />
          </IconButton>
        </>
      );
    }
    if (type === 'mySet') {
      return (
        <>
          <IconButton onClick={() => onClick3()}>
            <CommentIcon />
          </IconButton>
          <IconButton onClick={() => onClick1()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onClick2()}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      );
    }
    return <></>;
  }

  if (!formData) {
    return <></>;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar className={classes.avatar}>
            {type === 'mySet' ? formData.id : formData.sets}
          </Avatar>
        }
        title={formData.title}
        subheader={
          <>
            <PersonIcon style={{ fontSize: 15 }} />
            {type && `${formData.setOwner} `}
            {type === 'completed' && (
              <>
                <WhatshotIcon style={{ fontSize: 15 }} />
                {`${formData.score}%`}
              </>
            )}
          </>
        }
        action={iconButtons()}
      />
    </Card>
  );
}

export default SetCard;
