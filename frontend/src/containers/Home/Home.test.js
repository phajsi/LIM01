/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('The Home component', () => {
  it('should contain the title text "Opprett Oppgavesett"', () => {
    // arrange
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    // act
    const title = getByText('Opprett oppgavesett');

    // assert
    expect(title.tagName.toLowerCase()).toEqual('span');
  });
});
