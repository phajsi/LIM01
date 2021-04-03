import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    margin: theme.spacing(1),
    float: 'right',
    textDecoration: 'none',
  },
  right: {
    flex: 1,
  },
}));

export default useStyles;
