/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('contain a navigation link to the login page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const link = getByText('Logg inn');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  test('contain a navigation link to the Signup page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const link = getByText('Registrering');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });

  test('show a menu when the hamburger menu icon is clicked', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Navbar />
          </Router>
        </Provider>
      )
    );

    const hamburgerMenuButton = screen.getByTestId('hamburgerMenuButton');
    await act(async () => fireEvent.click(hamburgerMenuButton));
    await screen.findByTestId('drawer');
    expect(screen.getByTestId('drawer')).toBeVisible();
  });
});
