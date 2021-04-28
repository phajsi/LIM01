/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateExercises from './CreateExercises';

describe('CreateExercises', () => {
  test('Error on empty set', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExercises />
        </Router>
      )
    );

    await screen.findByText('Lagre');
    const saveButton = screen.getByText('Lagre');
    fireEvent.click(saveButton);

    expect(
      screen.getByText(
        'Du må legge til minst en oppgave for å opprette et sett.'
      )
    ).toBeVisible();
  });
});
