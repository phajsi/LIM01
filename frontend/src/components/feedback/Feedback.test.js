/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Feedback from './Feedback';

describe('The Feedback component', () => {
  it('should show true case', async () => {
    await act(async () =>
      render(
        <Router>
          <Feedback totalScore={3} totalExercises={5} feedbackState />
        </Router>
      )
    );

    expect(screen.getByText('Hurra, du klarte det!')).toBeVisible();
    expect(
      screen.getByText(`Poengsummen din er ${3} av totalt ${5} mulige!`)
    ).toBeVisible();
  });

  it('should show false case', async () => {
    await act(async () =>
      render(
        <Router>
          <Feedback totalScore={1} totalExercises={5} feedbackState={false} />
        </Router>
      )
    );

    expect(screen.getByText('Bedre lykke neste gang!')).toBeVisible();
    expect(
      screen.getByText(`Poengsummen din er ${1} Av totalt ${5} mulige!`)
    ).toBeVisible();
  });

  it('should show true case', async () => {
    await act(async () =>
      render(
        <Router>
          <Feedback />
        </Router>
      )
    );

    expect(screen.getByText('Noe gikk galt')).toBeVisible();
  });
});
