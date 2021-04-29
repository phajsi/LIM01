/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Navbar from './Navbar';

describe('Whith no logged inn user, the Navbar component should', () => {
  it('contain a navigation link to the login page', () => {
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

  it('contain a navigation link to the Signup page', () => {
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
});
