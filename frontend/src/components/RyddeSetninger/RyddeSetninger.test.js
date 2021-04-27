/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RyddeSetninger from './RyddeSetninger';

jest.mock('axios');

describe('Rydde setninger exercise', () => {
  const resp = {
    id: 11,
    word1: 'Jeg',
    wordClass1: 'pron',
    word2: 'er',
    wordClass2: 'v',
    word3: 'under',
    wordClass3: 'prp',
    word4: 'bordet',
    wordClass4: 'n',
    word5: '',
    wordClass5: '',
    word6: '',
    wordClass6: '',
    word7: '',
    wordClass7: '',
    word8: '',
    wordClass8: '',
    word9: '',
    wordClass9: '',
    word10: '',
    wordClass10: '',
  };
  test('should fetch getcontent once', async () => {
    axios.get.mockResolvedValue({ data: {} });

    await act(async () =>
      render(
        <Router>
          <RyddeSetninger id={5} restartSet={() => <></>} />
        </Router>
      )
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/rydde_setninger/${5}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }
    );
  });

  test('should update exercise after request', async () => {
    axios.get.mockResolvedValue({ data: resp });

    await act(async () =>
      render(
        <Router>
          <RyddeSetninger id={5} restartSet={() => <></>} />
        </Router>
      )
    );

    await screen.findByText('Jeg');
    const text = screen.getByText('Jeg');

    expect(text.tagName.toLowerCase()).toEqual('span');
  });
  test('should return "Riktig!" on correct play through, and buttons disabled', async () => {
    axios.get.mockResolvedValue({ data: resp });

    await act(async () =>
      render(
        <Router>
          <RyddeSetninger id={5} restartSet={() => <></>} />
        </Router>
      )
    );

    await screen.findByText('Jeg');
    const button = screen.getByText('Jeg');
    fireEvent.click(button);
    const button2 = screen.getByText('er');
    fireEvent.click(button2);
    const button3 = screen.getByText('under');
    fireEvent.click(button3);
    const button4 = screen.getByText('bordet');
    fireEvent.click(button4);
    const text = screen.getByText('Jeg');

    const checkAnswer = screen.getByText('Sjekk svar');
    fireEvent.click(checkAnswer);

    await screen.findByText('Riktig!');
    const answer = screen.getByText('Jeg');
    const answerButton = screen.getByText('Jeg');

    expect(answerButton.closest('button')).toBeDisabled();
    expect(checkAnswer.closest('button')).toBeDisabled();

    expect(answer.tagName.toLowerCase()).toEqual('span');
    expect(text.tagName.toLowerCase()).toEqual('span');
  });
});
