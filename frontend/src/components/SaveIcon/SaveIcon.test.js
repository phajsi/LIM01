/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SaveIcon from './SaveIcon';

jest.mock('axios');

describe('SaveIcon component', () => {
  test('should fetch getcontent once', async () => {
    axios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/usersaved/${5}`) {
        return Promise.resolve({ data: { saved: true } });
      }
    });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('should have color red when saved', async () => {
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

  test('should have color white when not saved', async () => {
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

  test('should save set as favorite when clicked on', async () => {
    axios.get.mockResolvedValue({ data: { saved: false } });
    axios.post.mockResolvedValue({ data: { saved: true } });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );
    await screen.findByTestId('favoriteButton');
    const favoriteButton = screen.getByTestId('favoriteButton');
    await act(async () => fireEvent.click(favoriteButton));
    expect(axios.post).toHaveBeenCalled();
  });

  test('should unsave set as favorite when clicked on', async () => {
    axios.get.mockResolvedValue({ data: { saved: true } });
    axios.delete.mockResolvedValue({ data: 5 });

    await act(async () =>
      render(
        <Router>
          <SaveIcon id={5} />
        </Router>
      )
    );
    await screen.findByTestId('favoriteButton');
    const favoriteButton = screen.getByTestId('favoriteButton');
    await act(async () => fireEvent.click(favoriteButton));
    expect(axios.delete).toHaveBeenCalled();
  });
});
