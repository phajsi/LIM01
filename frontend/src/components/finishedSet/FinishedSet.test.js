/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FinishedSet from './FinishedSet';

jest.mock('axios');

describe('The FinishedSet component', () => {
  it('should show over case', async () => {
    await act(async () =>
      render(
        <Router>
          <FinishedSet
            completed
            totalScore={5}
            totalExercises={5}
            percentage={1}
          />
        </Router>
      )
    );

    expect(screen.getByText('Bra jobba!')).toBeVisible();
    expect(
      screen.getByText(`Din totale poengsum ble ${5} av totalt ${5} mulige!`)
    ).toBeVisible();
    expect(screen.getByAltText('happy pickle')).toBeVisible();
  });

  it('should show under case', async () => {
    await act(async () =>
      render(
        <Router>
          <FinishedSet
            completed
            totalScore={3}
            totalExercises={6}
            percentage={0.5}
          />
        </Router>
      )
    );

    expect(screen.getByText('Ikke værst!')).toBeVisible();
    expect(
      screen.getByText(`Din totale poengsum ble ${3} av totalt ${6} mulige!`)
    ).toBeVisible();
    expect(screen.getByAltText('Final sad pickle')).toBeVisible();
  });

  test('should fetch getContent twice', async () => {
    axios.post.mockResolvedValue({ data: { id: 11, sets: 10, score: 1 } });
    axios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/rating/${10}`) {
        return Promise.resolve({ data: { rating: null } });
      }
      if (url === `${process.env.REACT_APP_API_URL}/api/usersaved/${10}`) {
        return Promise.resolve({ data: { saved: true } });
      }
    });

    await act(async () =>
      render(
        <Router>
          <FinishedSet id={10} isAuthenticated completed rating={null} />
        </Router>
      )
    );

    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  test('thumbs up should have color blue when clicked', async () => {
    axios.post.mockResolvedValue({ data: { id: 11, sets: 10, score: 1 } });
    axios.get.mockImplementation((url) => {
      if (url === `${process.env.REACT_APP_API_URL}/api/rating/${10}`) {
        return Promise.resolve({ data: { rating: true } });
      }
      if (url === `${process.env.REACT_APP_API_URL}/api/usersaved/${10}`) {
        return Promise.resolve({ data: { saved: true } });
      }
    });
    await act(async () =>
      render(
        <Router>
          <FinishedSet id={10} isAuthenticated completed rating />
        </Router>
      )
    );
    const ratingUpButtonClicked = screen.getByTestId('ratingUpButtonClicked');
    expect(ratingUpButtonClicked).toBeVisible();
    await act(async () => fireEvent.click(ratingUpButtonClicked));
    await screen.findByTestId('ratingUpButton');
    expect(screen.getByTestId('ratingUpButton')).toBeVisible();
  });
});
