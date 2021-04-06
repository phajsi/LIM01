import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    maxWidth: theme.spacing(100),
  },
  cardLeft: {
    maxWidth: theme.spacing(50),
    display: 'inline-block',
    marginRight: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardRight: {
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

export default useStyles;
