/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Signup from './Signup';

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Whith no logged inn user, the Navbar component should', () => {
  it('contain a navigation link to the login page', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Signup isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    expect(screen.getByText('Opprett bruker'));
  });

  it('should show an error message if email already exists', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/users/`) {
        return Promise.reject({
          response: {
            data: {
              email: 'exists already',
            },
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Signup isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputName = screen.getByPlaceholderText('Navn *');
    const inputEmail = screen.getByPlaceholderText('E-post *');
    const inputPassord = screen.getByPlaceholderText('Password *');
    const inputConfirmPassord = screen.getByPlaceholderText(
      'Bekreft passord *'
    );
    fireEvent.change(inputName, { target: { value: 'test' } });
    fireEvent.change(inputEmail, { target: { value: 'pickle@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Bachel0r' } });
    fireEvent.change(inputConfirmPassord, { target: { value: 'Bachel0r' } });
    const button = screen.getByTestId('signUpButton');
    fireEvent.click(button);

    await screen.findByText('Denne E-post addressen er ikke gyldig.');
    expect(
      screen.getByText('Denne E-post addressen er ikke gyldig.')
    ).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('should show an error message if the password is not good enough', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/users/`) {
        return Promise.reject({
          response: {
            data: {
              password: 'is not secure enough',
            },
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Signup isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputName = screen.getByPlaceholderText('Navn *');
    const inputEmail = screen.getByPlaceholderText('E-post *');
    const inputPassord = screen.getByPlaceholderText('Password *');
    const inputConfirmPassord = screen.getByPlaceholderText(
      'Bekreft passord *'
    );
    fireEvent.change(inputName, { target: { value: 'test' } });
    fireEvent.change(inputEmail, { target: { value: 'testing@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Test1234' } });
    fireEvent.change(inputConfirmPassord, { target: { value: 'Test1234' } });
    const button = screen.getByTestId('signUpButton');
    fireEvent.click(button);

    await screen.findByText('Passordet er ikke godt nok.');
    expect(screen.getByText('Passordet er ikke godt nok.')).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('should show a general error message', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/users/`) {
        return Promise.reject({
          response: {
            data: {
              test: 'test',
            },
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Signup isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputName = screen.getByPlaceholderText('Navn *');
    const inputEmail = screen.getByPlaceholderText('E-post *');
    const inputPassord = screen.getByPlaceholderText('Password *');
    const inputConfirmPassord = screen.getByPlaceholderText(
      'Bekreft passord *'
    );
    fireEvent.change(inputName, { target: { value: 'Pickle' } });
    fireEvent.change(inputEmail, { target: { value: 'pickle@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Sylteagur1' } });
    fireEvent.change(inputConfirmPassord, { target: { value: 'Sylteagur1' } });
    const button = screen.getByTestId('signUpButton');
    fireEvent.click(button);

    await screen.findByText('Noe gikk galt! Prøv igjen senere.');
    expect(screen.getByText('Noe gikk galt! Prøv igjen senere.')).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('should show a signup successful error message', async () => {
    axios.post.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/auth/users/`) {
        return Promise.resolve({
          data: {
            name: 'TestUser',
            email: 'testUser@lim.no',
            id: 16,
          },
        });
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Signup isAuthenticated={false} />
          </Router>
        </Provider>
      )
    );

    const inputName = screen.getByPlaceholderText('Navn *');
    const inputEmail = screen.getByPlaceholderText('E-post *');
    const inputPassord = screen.getByPlaceholderText('Password *');
    const inputConfirmPassord = screen.getByPlaceholderText(
      'Bekreft passord *'
    );
    fireEvent.change(inputName, { target: { value: 'TestUser' } });
    fireEvent.change(inputEmail, { target: { value: 'testUser@lim.no' } });
    fireEvent.change(inputPassord, { target: { value: 'Bachel0r' } });
    fireEvent.change(inputConfirmPassord, { target: { value: 'Bachel0r' } });
    const button = screen.getByTestId('signUpButton');
    fireEvent.click(button);

    await screen.findByText(
      'Takk! Vi har sendt deg en e-post med en link som du må trykke på for å aktivere brukeren din. Når du har gjort det kan du logge deg inn.'
    );
    expect(
      screen.getByText(
        'Takk! Vi har sendt deg en e-post med en link som du må trykke på for å aktivere brukeren din. Når du har gjort det kan du logge deg inn.'
      )
    ).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
