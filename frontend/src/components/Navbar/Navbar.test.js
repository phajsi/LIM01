/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { logout } from '../../actions/auth';
import store from '../../store';
import NavBar from './NavBar';

describe('Whith no logged inn user, the Navbar component should', () => {
  it('contain a navigation link to the login page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
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
          <NavBar />
        </Router>
      </Provider>
    );
    const link = getByText('Registrering');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });
});

/* describe('With a logged in user, the Navbar component should', () => {
  it('contain a navigation link to the logout page', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <NavBar isAuthenticated logout={false} user={{ name: 'Pickle' }} />
          </Router>
        </Provider>
      )
    );

    await screen.findByText('Logg ut');
    const link = screen.getByText('Logg ut');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
}); */
