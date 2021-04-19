import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridText: {
    paddingBottom: theme.spacing(0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
  chatList: {
    width: 'inherit',
    overflow: 'auto',
  },
}));

export default useStyles;
