/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import ResetPassword from './ResetPassword';

jest.mock('axios');

describe('The ResetPassword component', () => {
  test('should show an error message on illegal input', async () => {
    axios.post.mockImplementation((url) => {
      if (
        url === `${process.env.REACT_APP_API_URL}/auth/users/reset_password`
      ) {
        return Promise.resolve({});
      }
    });
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <ResetPassword />
          </Router>
        </Provider>
      )
    );

    const inputEl = screen.getByPlaceholderText('Email');
    fireEvent.change(inputEl, { target: { value: 'pickle@lim.no' } });
    const button = screen.getByText('Reset Password');
    await act(async () => fireEvent.click(button));

    await screen.findByText(
      'En Epost har blitt sendt til pickle@lim.no. Trykk på linken i e-posten for å endre passordet ditt.'
    );
    const message = screen.getByText(
      'En Epost har blitt sendt til pickle@lim.no. Trykk på linken i e-posten for å endre passordet ditt.'
    );
    expect(message).toBeVisible();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
