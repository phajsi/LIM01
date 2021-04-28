/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Signup from './Signup';

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
});
