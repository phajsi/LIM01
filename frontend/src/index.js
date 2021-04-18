import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
