import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    margin: theme.spacing(1),
    float: 'right',
    textDecoration: 'none',
  },
  userName: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    margin: theme.spacing(1),
    textDecoration: 'none',
  },
  right: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

export default useStyles;
