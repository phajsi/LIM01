/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { act, screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Login from './Login';

describe('Whith no logged inn user, the Navbar component should', () => {
  it('contain a navigation link to the login page', async () => {
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
});
