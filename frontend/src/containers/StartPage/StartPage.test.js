/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import StartPage from './StartPage';

describe('The StartPage component', () => {
  it('should render', () => {
    // arrange
    const { asFragment } = render(
      <Router>
        <StartPage />
      </Router>
    );

    // act
    const html = asFragment();

    // assert
    expect(html).toMatchSnapshot();
  });

  it('should contain the title text "DiPICKLE"', () => {
    const { getByText } = render(
      <Router>
        <StartPage />
      </Router>
    );

    const title = getByText('DiPICKLE');

    expect(title.tagName.toLowerCase()).toEqual('h3');
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

describe('Searchbar', () => {
  test('show an error message on illegal input', async () => {
    await act(async () =>
      render(
        <Router>
          <StartPage />
        </Router>
      )
    );

    const inputEl = screen.getByPlaceholderText('Tast inn settets ID');
    fireEvent.change(inputEl, { target: { value: 'hei' } });
    const button2 = screen.getByText('SPILL');
    fireEvent.click(button2);

    await screen.findByText('Settet finnes ikke.');
    const errorMessage = screen.getByText('Settet finnes ikke.');

    expect(errorMessage.tagName.toLowerCase()).toEqual('span');
  });
});
