/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OverviewPage from './OverviewPage';

jest.mock('axios');

describe('OverviewPage component', () => {
  const comments = [
    {
      id: 39,
      sets: 20,
      comment: 'Dette var et kult sett :)',
      name: 'Pickle',
    },
  ];
  const rating = {
    ratings: 1,
    upvotes: 1,
    downvotes: 0,
  };
  const completed = {
    id: 2,
    completed: true,
    score: '50',
  };
  function getRequest() {
    return axios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/comment/${20}`) {
        return Promise.resolve({ data: comments });
      }
      if (url === `${process.env.REACT_APP_API_URL}/api/getrating/${20}`) {
        return Promise.resolve({ data: rating });
      }
      if (url === `${process.env.REACT_APP_API_URL}/api/usersaved/${20}`) {
        return Promise.resolve({ data: { saved: true } });
      }
    });
  }

  test('should fetch getcontent once when user is authenticated', async () => {
    getRequest();
    await act(async () =>
      render(
        <Router>
          <OverviewPage
            id={20}
            user={{ name: 'Pickle' }}
            isAuthenticated
            completed={completed}
          />
        </Router>
      )
    );

    await screen.findByTestId('favorite');

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(screen.getByTestId('favorite')).toBeVisible();
    expect(screen.getByTestId('score')).toBeVisible();
    expect(screen.getByText(`Din beste score på dette settet er ${50}%.`));
    expect(screen.getByTestId('makeComment')).toBeVisible();
    expect(screen.getByTestId('card')).toBeVisible();
    expect(screen.getByText('Dette var et kult sett :)')).toBeVisible();
    expect(screen.getByText('Pickle')).toBeVisible();
    expect(screen.getByTestId('delete')).toBeVisible();
  });

  test('should fetch getcontent once when user is not authenticated', async () => {
    axios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/comment/${20}`) {
        return Promise.resolve({ data: comments });
      }
      if (url === `${process.env.REACT_APP_API_URL}/api/getrating/${20}`) {
        return Promise.resolve({ data: rating });
      }
    });

    await act(async () =>
      render(
        <Router>
          <OverviewPage id={20} isAuthenticated={false} completed={false} />
        </Router>
      )
    );

    await screen.findByTestId('card');

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(
      screen.getByText(
        'Du må være innlogget for å kunne kunne legge igen en kommentar til dette settet.'
      )
    ).toBeVisible();
    expect(screen.getByTestId('card')).toBeVisible();
    expect(screen.getByText('Dette var et kult sett :)')).toBeVisible();
    expect(screen.getByText('Pickle')).toBeVisible();
  });

  test('should open deletemodal when an authenticated user wants to delete a comment', async () => {
    getRequest();

    await act(async () =>
      render(
        <Router>
          <OverviewPage
            id={20}
            user={{ name: 'Pickle' }}
            isAuthenticated
            completed={false}
          />
        </Router>
      )
    );

    await screen.findByTestId('delete');
    const deleteButton = screen.getByTestId('delete');
    fireEvent.click(deleteButton);

    await screen.findByText('Bekreft sletting. Det kan ikke omgjøres.');
    const warning = screen.getByText(
      'Bekreft sletting. Det kan ikke omgjøres.'
    );

    await screen.findByTestId('cancelButton');
    const cancelButton = screen.getByTestId('cancelButton');
    fireEvent.click(cancelButton);

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(deleteButton).toBeVisible();
    expect(warning).toBeVisible();
    expect(cancelButton).toBeVisible();
  });

  test('should delete comment', async () => {
    getRequest();
    axios.delete.mockResolvedValue({ data: {} });

    await act(async () =>
      render(
        <Router>
          <OverviewPage
            id={20}
            user={{ name: 'Pickle' }}
            isAuthenticated
            completed={false}
          />
        </Router>
      )
    );

    await screen.findByTestId('delete');
    const deleteButton = screen.getByTestId('delete');
    fireEvent.click(deleteButton);

    await screen.findByText('Bekreft sletting. Det kan ikke omgjøres.');
    const warning = screen.getByText(
      'Bekreft sletting. Det kan ikke omgjøres.'
    );

    await screen.findByTestId('deleteButton');
    const deleteButton2 = screen.getByTestId('deleteButton');
    await act(async () => fireEvent.click(deleteButton2));

    expect(axios.get).toHaveBeenCalledTimes(5);
    expect(deleteButton).toBeVisible();
    expect(warning).toBeVisible();
    expect(deleteButton2).toBeVisible();
    expect(axios.delete).toHaveBeenCalledTimes(1);
  });

  test('Should post comment', async () => {
    getRequest();
    axios.post.mockResolvedValue({ data: {} });

    await act(async () =>
      render(
        <Router>
          <OverviewPage
            id={20}
            user={{ name: 'Pickle' }}
            isAuthenticated
            completed={false}
          />
        </Router>
      )
    );

    const input = screen.getByPlaceholderText('Skriv en kommentar...');
    fireEvent.change(input, { target: { value: 'Dette var et flott sett' } });
    const submitButton = screen.getByTestId('submitButton');
    await act(async () => fireEvent.click(submitButton));

    expect(axios.post).toHaveBeenCalled();
  });
});
