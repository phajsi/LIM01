import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    margin: theme.spacing(1),
    float: 'right',
    textDecoration: 'none',
  },
  right: {
    flex: 1,
  },
}));

export default useStyles;
