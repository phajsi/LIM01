/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateExercises from './CreateExercises';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

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
  test('Stepper Chat', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExercises />
        </Router>
      )
    );

    await screen.findByText('Lagre');
    const chatButton = screen.getAllByText('Chat')[0];
    fireEvent.click(chatButton);

    await screen.findByText('Hvem sender meldingen?');

    const backButton = screen.getByText('Tilbake');
    fireEvent.click(backButton);

    await screen.findByText('Nytt sett');

    expect(screen.getByText('Nytt sett')).toBeVisible();
  });
  test('Stepper Forstaelse', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExercises />
        </Router>
      )
    );

    await screen.findByText('Lagre');
    const chatButton = screen.getAllByText('Forståelse')[0];
    fireEvent.click(chatButton);

    await screen.findByText(
      'Skriv et ja/nei spørsmål med tanke på meldingen: *'
    );

    const backButton = screen.getByText('Tilbake');
    fireEvent.click(backButton);

    await screen.findByText('Nytt sett');

    expect(screen.getByText('Nytt sett')).toBeVisible();
  });
  test('Stepper RyddeSetninger', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateExercises />
        </Router>
      )
    );

    await screen.findByText('Lagre');
    const chatButton = screen.getAllByText('Rydde Setninger')[0];
    fireEvent.click(chatButton);

    await screen.findByText('Velg ordklassen ordet tilhører:');

    const backButton = screen.getByText('Tilbake');
    fireEvent.click(backButton);

    await screen.findByText('Nytt sett');

    expect(screen.getByText('Nytt sett')).toBeVisible();
  });
});
