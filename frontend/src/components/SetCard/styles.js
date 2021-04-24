import { makeStyles } from '@material-ui/core/styles';

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
  iconSmall: {
    fontSize: 15,
  },
  iconLarge: {
    fontSize: 30,
  },
}));
export default useStyles;
