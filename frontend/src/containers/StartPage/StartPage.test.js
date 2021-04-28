/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import StartPage from './StartPage';

describe('The StartPage component', () => {
  it('should contain the title text "DiPICKLE"', () => {
    const { getByText } = render(
      <Router>
        <StartPage />
      </Router>
    );

    const title = getByText('DiPICKLE');

    expect(title.tagName.toLowerCase()).toEqual('h1');
  });
});

describe('The Link component should', () => {
  it('contain a navigation link to the login page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    );

    const link = getByText('Logg inn');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });
  it('contain a navigation link to the Signup page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    );

    const link = getByText('Registrer deg');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });
});
