import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  searchBar: {
    margin: 'auto',
    width: '50vw',
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: 0,
      paddingLeft: '260px',
      width: '50vw',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      width: '60vw',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    display: 'block',
  },
  spacing: theme.mixins.toolbar,
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
  },
  buttonList: {
    margin: theme.spacing(1),
    textAlign: 'center',
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
