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
    padding: theme.spacing(1),
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
  avatar: {
    backgroundColor: 'orange',
  },
  cardHeader: {
    padding: '12px',
  },
  card: {
    maxWidth: '500px',
    marginTop: '3px',
  },
  drawerBtn: {
    padding: theme.spacing(1),
    textTransform: 'uppercase',
    lineHeight: '2',
    fontWeight: 500,
    borderRadius: '11px',
    '&.MuiListItem-button.Mui-selected': {
      backgroundColor: '#367051',
      color: 'antiquewhite',
      '& > *': {
        color: 'antiquewhite',
      },
    },
    '&:focus': {
      backgroundColor: '#367051',
      color: 'antiquewhite',
    },
  },
  svg: {
    margin: 'auto',
  },
}));
export default useStyles;
