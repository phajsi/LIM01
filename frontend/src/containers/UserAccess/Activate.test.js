/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { act, screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';
import Activate from './Activate';
import StartPage from '../StartPage/StartPage';

jest.mock('axios');

describe('The Login component', () => {
  it('should render correctly', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Activate />
          </Router>
        </Provider>
      )
    );

    expect(screen.getByText('Verify your Account'));
    expect(screen.getByText('Verify'));
  });
  it('should render correctly', async () => {
    axios.post.mockResolvedValue({});
    await act(async () =>
      render(
        <Provider store={store}>
          <Router>
            <StartPage />
            <Activate match={{ params: { uid: '', token: '' } }} />
          </Router>
        </Provider>
      )
    );

    await screen.findByText('Verify');
    const verifyButton = screen.getByText('Verify');

    fireEvent.click(verifyButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
