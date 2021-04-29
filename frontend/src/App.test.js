/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import ProtectedRoute from './ProtectedRoute';
import Home from './containers/Home/Home';

describe('App render', () => {
  it('should render and contain the title text "DiPICKLE"', async () => {
    await act(async () => render(<App />));

    await screen.findByText('DiPICKLE');

    expect(screen.getByText('DiPICKLE')).toBeVisible();
  });
  it('should route to the correct component being passed if auth', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <ProtectedRoute isAuthenticated component={Home} />
          </Router>
        </Provider>
      )
    );

    await screen.findByText('Opprett oppgavesett');

    expect(screen.getByText('Opprett oppgavesett')).toBeVisible();
  });
});
