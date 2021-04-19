import { createMuiTheme } from '@material-ui/core/styles';

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F7B733',
    },
    secondary: {
      main: '#F68365',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#b9b9b9',
          color: 'white',
        },
      },
      outlined: {
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#b9b9b9',
        },
      },
      containedPrimary: {
        '&:hover': {
          color: 'white',
        },
      },
      outlinedSecondary: {
        color: '#f5562c',
        '&:hover': {
          backgroundColor: '#F68365',
          color: 'white',
        },
      },
    },
  },
});

export default MuiTheme;
