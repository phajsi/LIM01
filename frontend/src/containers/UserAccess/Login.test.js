/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { act, screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Login from './Login';

jest.mock('axios');

describe('The Login component', () => {
  test('should contain a Login header, when no user is logged in', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    expect(screen.getAllByText('Logg inn')[1]);
  });

  test('should send one post request on login', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/jwt/create/`) {
        return Promise.resolve({
          data: {
            refresh: 'refresh',
            access: 'access',
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>
      )
    );

    const inputEmail = screen.getByPlaceholderText('Epost');
    const inputPassord = screen.getByPlaceholderText('Passord');
    fireEvent.change(inputEmail, { target: { value: 'pickle@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Sylteagurk1' } });
    const button = screen.getByTestId('LoggInnButton');
    fireEvent.click(button);

    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('should be able to toggle password visibility', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login loginError isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const visibilityOffButton = screen.getByTestId('visibilityOffButton');
    expect(visibilityOffButton).toBeVisible();
    await act(async () => fireEvent.click(visibilityOffButton));
    await screen.findByTestId('visibilityButton');
    expect(screen.getByTestId('visibilityButton')).toBeVisible();
  });

  test('should show an error message when credentials are not found on the database', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/jwt/create/`) {
        return Promise.reject({
          response: {
            status: 401,
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login loginError isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputEmail = screen.getByPlaceholderText('Epost');
    const inputPassord = screen.getByPlaceholderText('Passord');
    fireEvent.change(inputEmail, { target: { value: 'test@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Sometext' } });
    const button = screen.getByTestId('LoggInnButton');
    fireEvent.click(button);

    await screen.findByText('Brukernavn eller passord er feil.');
    expect(screen.getByText('Brukernavn eller passord er feil.')).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  test('should show a general error message', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/jwt/create/`) {
        return Promise.reject({
          response: {
            status: 400,
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login loginError isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputEmail = screen.getByPlaceholderText('Epost');
    const inputPassord = screen.getByPlaceholderText('Passord');
    fireEvent.change(inputEmail, { target: { value: 'test@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Sometext' } });
    const button = screen.getByTestId('LoggInnButton');
    fireEvent.click(button);

    await screen.findByText('Noe gikk galt! Prøv igjen senere.');
    expect(screen.getByText('Noe gikk galt! Prøv igjen senere.')).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
