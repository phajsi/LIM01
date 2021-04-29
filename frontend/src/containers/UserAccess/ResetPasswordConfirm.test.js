/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { act, screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import Login from './Login';

jest.mock('axios');

describe('ResetPasswordConfirm test', () => {
  it('should render correctly', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <ResetPasswordConfirm />
          </Router>
        </Provider>
      )
    );

    expect(screen.getByText('Reset Password'));
    expect(screen.getByPlaceholderText('New Password'));
    expect(screen.getByPlaceholderText('Confirm New Password'));
  });
  it('should verify properly and redirect', async () => {
    axios.post.mockResolvedValue({});
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Login />
            <ResetPasswordConfirm match={{ params: { uid: '', token: '' } }} />
          </Router>
        </Provider>
      )
    );

    const inputPassword = screen.getByPlaceholderText('New Password');
    const inputPasswordConfirm = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    fireEvent.change(inputPassword, { target: { value: 'Bachel0r' } });
    fireEvent.change(inputPasswordConfirm, { target: { value: 'Bachel0r' } });
    const button = screen.getByText('Reset Password');
    fireEvent.click(button);

    await screen.findByText('Har du ikke en konto?');
    expect(screen.getByText('Har du ikke en konto?'));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  it('should verify properly and redirect', async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 400,
      },
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <ResetPasswordConfirm match={{ params: { uid: '', token: '' } }} />
          </Router>
        </Provider>
      )
    );

    const inputPassword = screen.getByPlaceholderText('New Password');
    const inputPasswordConfirm = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    fireEvent.change(inputPassword, { target: { value: 'Bachel0r' } });
    fireEvent.change(inputPasswordConfirm, { target: { value: 'Bachel0r' } });
    const button = screen.getByText('Reset Password');
    fireEvent.click(button);

    await screen.findByText(
      'Passordet ble ikke godkjent! Pass på at passordet møter kravene: minst 8 tegn, minst en stor og liten bokstav, minst et tall, passordet kan ikke være for vanlig eller for likt brukernavnet ditt.'
    );
    expect(
      screen.getByText(
        'Passordet ble ikke godkjent! Pass på at passordet møter kravene: minst 8 tegn, minst en stor og liten bokstav, minst et tall, passordet kan ikke være for vanlig eller for likt brukernavnet ditt.'
      )
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  it('should verify properly and redirect', async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 404,
      },
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <ResetPasswordConfirm match={{ params: { uid: '', token: '' } }} />
          </Router>
        </Provider>
      )
    );

    const inputPassword = screen.getByPlaceholderText('New Password');
    const inputPasswordConfirm = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    fireEvent.change(inputPassword, { target: { value: 'Bachel0r' } });
    fireEvent.change(inputPasswordConfirm, { target: { value: 'Bachel0r' } });
    const button = screen.getByText('Reset Password');
    fireEvent.click(button);

    await screen.findByText('Noe gikk galt! Prøv igjen senere.');
    expect(screen.getByText('Noe gikk galt! Prøv igjen senere.'));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
