/* eslint-disable no-undef */
import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';

describe('The Searchbar component', () => {
  test('show an error message on illegal input', async () => {
    await act(async () =>
      render(
        <Router>
          <SearchBar />
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
