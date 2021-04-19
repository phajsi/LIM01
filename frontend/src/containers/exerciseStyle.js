import { makeStyles } from '@material-ui/core/styles';

const exerciseStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F5F5',
    maxWidth: theme.spacing(62),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 0,
    borderRadius: '15px',
    maxHeight: '600px',
  },
  layout: {
    backgroundColor: '#F5F5F5',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '15px 15px 0 0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardcontent: {
    display: 'flex',
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
  audiotext: {
    margin: 'auto 0 auto 0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
  progresscontainer: {
    margin: theme.spacing(1),
  },
}));

export default exerciseStyles;
