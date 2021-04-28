/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateExerciseMenu from './CreateExerciseMenu';

describe('CreateExercisesMenu', () => {
  test('Test render correctly', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{}}
            exerciseCounts={{ c: 0, f: 0, r: 0 }}
          />
        </Router>
      )
    );

    await screen.findByText('Chat');
    const inputTitle = screen.getByPlaceholderText('Legg til tittel...');
    const inputDescription = screen.getByPlaceholderText(
      'Gi settet ditt en beskrivelse...'
    );

    expect(screen.getByText('Chat')).toBeVisible();
    expect(screen.getByText('Forståelse')).toBeVisible();
    expect(screen.getByText('Rydde Setninger')).toBeVisible();
    expect(inputTitle.value).toBe('');
    expect(inputDescription.value).toBe('');
  });
  test('Test render correctly when edit', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{
              id: 5,
              setOwner: 'simen',
              title: 'Hverdagsliv',
              description:
                'Dette er et sett som tar for seg hverdagslige aktiviteter.',
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
            }}
            exerciseCounts={{ c: 2, f: 2, r: 2 }}
          />
        </Router>
      )
    );

    await screen.findByText('Hverdagsliv');
    const inputTitle = screen.getByPlaceholderText('Legg til tittel...');
    const inputDescription = screen.getByPlaceholderText(
      'Gi settet ditt en beskrivelse...'
    );

    expect(inputTitle.value).toBe('Hverdagsliv');
    expect(inputDescription.value).toBe(
      'Dette er et sett som tar for seg hverdagslige aktiviteter.'
    );
  });
  test('Test errorMessage', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{}}
            exerciseCounts={{ c: 0, f: 0, r: 0 }}
            errorMessage="This is an error message"
          />
        </Router>
      )
    );

    await screen.findByText('Tittel:');
    const error = screen.getByText('This is an error message');

    expect(error).toBeVisible();
  });
  test('chatModal open correctly', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{}}
            exerciseCounts={{ c: 0, f: 0, r: 0 }}
          />
        </Router>
      )
    );

    await screen.findByText('Tittel:');
    const chatModal = screen.getByTestId('chatModal');
    fireEvent.click(chatModal);

    expect(screen.getByText('Eksempel på Chat')).toBeVisible();
  });
  test('forstaelseModal open correctly', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{}}
            exerciseCounts={{ c: 0, f: 0, r: 0 }}
          />
        </Router>
      )
    );

    await screen.findByText('Tittel:');
    const forstaelseModal = screen.getByTestId('forstaelseModal');
    fireEvent.click(forstaelseModal);

    expect(screen.getByText('Eksempel på Forståelse')).toBeVisible();
  });
  test('ryddeSetningerModal open correctly', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExerciseMenu
            formDataSet={{}}
            exerciseCounts={{ c: 0, f: 0, r: 0 }}
          />
        </Router>
      )
    );

    await screen.findByText('Tittel:');
    const ryddeSetningerModal = screen.getByTestId('ryddeSetningerModal');
    fireEvent.click(ryddeSetningerModal);

    expect(screen.getByText('Eksempel på rydde-setninger')).toBeVisible();
  });
});
