import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(100),
    margin: 'auto',
  },
  triangle1: {
    top: 0,
    left: 0,
  },
  triangle2: {
    bottom: 0,
    right: 0,
  },
  infobox: {
    textlign: 'center',
    maxWidth: theme.spacing(75),
    margin: '50px auto 50px auto',
    borderRadius: '15px',
  },
  headertitle: {
    marginTop: '5px',
  },
  description: {
    minHeight: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      marginTop: '50px',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: '50px',
    margin: 'auto 0 auto 0',
    justifyContent: 'center',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  buttongrid: {
    textAlign: 'center',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      marginTop: '50px',
    },
  },
  buttons: {
    textlign: 'center',
    margin: 'auto',
    height: '100px',
    borderRadius: '50px',
  },
  listcontainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  completedtext: {
    maxWidth: theme.spacing(75),
    margin: '0 auto 0 auto',
  },
  makecomment: {
    maxWidth: theme.spacing(75),
    margin: '0 auto 0 auto',
  },
  defaulttext: {
    maxWidth: theme.spacing(75),
    margin: '15px auto 0 auto',
    textAlign: 'center',
    border: '2px solid #F5F5F5',
    borderRadius: 15,
  },
  commentheader: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: theme.spacing(75),
    maxHeight: theme.spacing(5),
    margin: 'auto',
  },
  rating: {
    margin: 'auto 0 auto 10px',
  },
  commentfield: {
    maxWidth: theme.spacing(75),
    margin: 'auto',
    padding: theme.spacing(1.5),
  },
  card: {
    margin: '5px auto 10px auto',
  },
  cardcontent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cardauthor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD172',
    textAlign: 'center',
  },
  textgrid: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
  },
  cardtext: {
    wordBreak: 'break-word',
  },
  iconbutton: {
    height: '50px',
    margin: 'auto 0 auto 0',
  },
  formfields: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '5px',
  },
}));
export default useStyles;
