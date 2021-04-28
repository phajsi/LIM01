/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('The Home component', () => {
  it('should contain four clickable buttons', () => {
    // arrange
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    // act
    const title = getByText('Opprett oppgavesett');
    fireEvent.click(screen.getAllByText('Mine sett')[1]);
    fireEvent.click(screen.getAllByText('Lagrede sett')[1]);
    fireEvent.click(screen.getAllByText('Fullførte sett')[1]);

    // assert
    expect(title.tagName.toLowerCase()).toEqual('a');
  });
});
