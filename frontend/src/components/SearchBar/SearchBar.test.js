/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';

jest.mock('axios');

describe('The Searchbar component', () => {
  test('shows an error message on illegal input', async () => {
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

  test('request is working with the right input', async () => {
    axios.head.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/sets/5`) {
        return Promise.resolve({});
      }
    });
    await act(async () =>
      render(
        <Router>
          <SearchBar />
        </Router>
      )
    );

    const inputEl = screen.getByPlaceholderText('Tast inn settets ID');
    await act(async () => fireEvent.change(inputEl, { target: { value: 5 } }));
    const button2 = screen.getByText('SPILL');
    await act(async () => fireEvent.click(button2));

    expect(axios.head).toHaveBeenCalledTimes(1);
  });

  test('request error fires when the set ID does not exist', async () => {
    axios.head.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/sets/5`) {
        return Promise.reject({
          response: {
            status: 404,
          },
        });
      }
    });
    await act(async () =>
      render(
        <Router>
          <SearchBar />
        </Router>
      )
    );

    const inputEl = screen.getByPlaceholderText('Tast inn settets ID');
    await act(async () => fireEvent.change(inputEl, { target: { value: 5 } }));
    const button2 = screen.getByText('SPILL');
    fireEvent.click(button2);

    await screen.findByText('Settet finnes ikke.');
    expect(screen.getByText('Settet finnes ikke.')).toBeVisible();

    expect(axios.head).toHaveBeenCalledTimes(1);
  });
});
