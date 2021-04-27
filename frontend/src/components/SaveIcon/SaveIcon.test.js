/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SaveIcon from './SaveIcon';

jest.mock('axios');

describe('Save icon', () => {
  test('should fetch getcontent once', async () => {
    axios.get.mockResolvedValue({ saved: true });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/usersaved/${5}`,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  });

  test('should be red when saved', async () => {
    axios.get.mockResolvedValue({ data: { saved: true } });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );
    await screen.findByTestId('favorite');
    expect(screen.getByTestId('favorite')).toBeVisible();
  });

  test('should be red when saved', async () => {
    axios.get.mockResolvedValue({ data: { saved: false } });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );
    await screen.findByTestId('notFavorite');
    expect(screen.getByTestId('notFavorite')).toBeVisible();
  });
});
