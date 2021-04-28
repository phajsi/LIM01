/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SetCard from './SetCard';

describe('SetCard rendering', () => {
  const userResp = {
    id: 5,
    setOwner: 'simen',
    title: 'Hverdagsliv',
    description: 'Dette er et sett som tar for seg hverdagslige aktiviteter.',
    forstaelse1: 19,
    forstaelse2: 20,
    forstaelse3: null,
    forstaelse4: null,
    forstaelse5: null,
    chat1: 22,
    chat2: 23,
    chat3: null,
    chat4: null,
    chat5: null,
    ryddeSetninger1: 11,
    ryddeSetninger2: 12,
    ryddeSetninger3: null,
    ryddeSetninger4: null,
    ryddeSetninger5: null,
  };
  test('SetCard should return MySet card type with correct information', async () => {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    await act(async () =>
      render(
        <Router>
          <SetCard
            type="mySet"
            formData={userResp}
            onClick1={() => (count1 += 1)}
            onClick2={() => (count2 += 1)}
            onClick3={() => (count3 += 1)}
          />
        </Router>
      )
    );

    const commentButton = screen.getByTestId('commentButton');
    fireEvent.click(commentButton);
    const editButton = screen.getByTestId('editButton');
    fireEvent.click(editButton);
    const deleteButton = screen.getByTestId('deleteButton');
    fireEvent.click(deleteButton);

    expect(count1).toBe(1);
    expect(count2).toBe(1);
    expect(count3).toBe(1);

    expect(screen.getByTestId('commentButton')).toBeVisible();
    expect(screen.getByTestId('editButton')).toBeVisible();
    expect(screen.getByTestId('deleteButton')).toBeVisible();
    expect(screen.getByText('simen')).toBeVisible();
    expect(screen.getByText('Hverdagsliv')).toBeVisible();
    expect(screen.getByText('5')).toBeVisible();
  });
  const savedResp = { id: 2, sets: 5, title: 'Hverdagsliv', setOwner: 'simen' };
  test('SetCard should return favorite card type with correct information', async () => {
    let count1 = 0;
    await act(async () =>
      render(
        <Router>
          <SetCard
            type="favorite"
            formData={savedResp}
            onClick1={() => (count1 += 1)}
          />
        </Router>
      )
    );

    const playButton = screen.getByTestId('playButton');
    fireEvent.click(playButton);

    expect(count1).toBe(1);
    expect(screen.getByTestId('playButton')).toBeVisible();
    expect(screen.getByText('simen')).toBeVisible();
    expect(screen.getByText('Hverdagsliv')).toBeVisible();
    expect(screen.getByText('5')).toBeVisible();
  });
  const completedResp = {
    id: 2,
    sets: 5,
    score: '2',
    title: 'Hverdagsliv',
    setOwner: 'simen',
  };
  test('SetCard should return completed card type with correct information', async () => {
    let count1 = 0;
    await act(async () =>
      render(
        <Router>
          <SetCard
            type="completed"
            formData={completedResp}
            onClick1={() => (count1 += 1)}
          />
        </Router>
      )
    );

    const playButton = screen.getByTestId('playButton');
    fireEvent.click(playButton);

    expect(count1).toBe(1);
    expect(screen.getByTestId('playButton')).toBeVisible();
    expect(screen.getByText('Hverdagsliv')).toBeVisible();
    expect(screen.getByText('5')).toBeVisible();
  });
  test('noType card', async () => {
    await act(async () =>
      render(
        <Router>
          <SetCard formData={completedResp} />
        </Router>
      )
    );
    expect(screen.getByText('Hverdagsliv')).toBeVisible();
    expect(screen.getByText('5')).toBeVisible();
  });
});
