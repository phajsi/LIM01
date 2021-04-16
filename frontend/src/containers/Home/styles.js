import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    display: 'block',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#47956A',
    alignItems: 'center',
    paddingTop: theme.spacing(10),
    display: 'inline',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    '& h3': {
      width: 'fit-content',
      margin: 'auto',
      padding: theme.spacing(1),
      textTransform: 'uppercase',
      color: 'mintcream',
    },
  },
  buttonList: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  drawerBtn: {
    textAlign: 'center',
    border: 'rgba(0, 0, 0, 0.12) 1px black',
    borderRadius: '11px',
  },
  drawerBtnClicked: {
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    border: 'rgba(0, 0, 0, 0.12) 1px black',
    borderRadius: '11px',
  },
}));
export default useStyles;
