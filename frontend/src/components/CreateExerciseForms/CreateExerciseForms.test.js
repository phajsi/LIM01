/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateChat from './CreateChat';
import CreateForstaelse from './CreateForstaelse';
import CreateRyddeSetninger from './CreateRyddeSetninger';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('CreateChat test', () => {
  test('Add task button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateChat />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);

    await screen.findByText('Tema3');
    const removeTaskButton = screen.getByTestId('removeButton');
    expect(removeTaskButton).toBeVisible();
    expect(screen.getByText('Tema3')).toBeVisible();
  });
  test('Remove task button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateChat />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);
    await screen.findByText('Tema3');

    const removeTaskButton = screen.getByTestId('removeButton');
    fireEvent.click(removeTaskButton);
    await screen.findByTestId('addButton');
    expect(screen.getByTestId('addButton')).toBeVisible();
  });
  test('render with formDataEdit tema3', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateChat formDataEdit={{ chatquestion3: 'is this a question?' }} />
        </Router>
      )
    );

    expect(screen.getByText('Tema3')).toBeVisible();
  });
  test('render with formDataEdit tema2', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateChat formDataEdit={{ chatquestion2: 'is this a question?' }} />
        </Router>
      )
    );

    expect(screen.getByText('Tema2')).toBeVisible();
  });
  test('infoModal', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateChat />
        </Router>
      )
    );
    const infoButton = screen.getByTestId('infoButton');
    fireEvent.click(infoButton);
    await screen.findByText('Lage ny chat-oppgave');
    expect(screen.getByText('Lage ny chat-oppgave')).toBeVisible();
  });
});

describe('CreateForstaelse test', () => {
  test('Add task button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateForstaelse />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);

    await screen.findByText('Tema 3');
    const removeTaskButton = screen.getByTestId('removeButton');
    expect(removeTaskButton).toBeVisible();
    expect(screen.getByText('Tema 3')).toBeVisible();
  });
  test('Remove task button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateForstaelse />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);
    await screen.findByText('Tema 3');

    const removeTaskButton = screen.getByTestId('removeButton');
    fireEvent.click(removeTaskButton);
    await screen.findByTestId('addButton');
    expect(screen.getByTestId('addButton')).toBeVisible();
  });
  test('render with formDataEdit tema3', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateForstaelse formDataEdit={{ chat3: 'is this a question?' }} />
        </Router>
      )
    );

    expect(screen.getByText('Tema 3')).toBeVisible();
  });
  test('render with formDataEdit tema2', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateForstaelse formDataEdit={{ chat2: 'is this a question?' }} />
        </Router>
      )
    );

    expect(screen.getByText('Tema 2')).toBeVisible();
  });
  test('infoModal', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateForstaelse />
        </Router>
      )
    );
    const infoButton = screen.getByTestId('infoButton');
    fireEvent.click(infoButton);
    await screen.findByText('Lage ny forståelse-oppgave');
    expect(screen.getByText('Lage ny forståelse-oppgave')).toBeVisible();
  });
});

describe('CreateRyddeSetninger test', () => {
  const ryddeSetningerMock = {
    id: 11,
    word1: 'Jeg',
    wordClass1: 'pron',
    word2: 'er',
    wordClass2: 'v',
    word3: 'under',
    wordClass3: 'prp',
    word4: 'bordet',
    wordClass4: 'n',
    word5: 'nå',
    wordClass5: 'n',
  };
  test('Add word button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateRyddeSetninger />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);

    await screen.findByTestId('word5');
    const removeTaskButton = screen.getByTestId('removeButton');
    expect(removeTaskButton).toBeVisible();
    expect(screen.getByTestId('word5')).toBeVisible();
  });
  test('Remove task button', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateRyddeSetninger />
        </Router>
      )
    );

    const addTaskButton = screen.getByTestId('addButton');
    fireEvent.click(addTaskButton);
    fireEvent.click(addTaskButton);
    await screen.findByTestId('word5');

    const removeTaskButton = screen.getByTestId('removeButton');
    fireEvent.click(removeTaskButton);
    await screen.findByTestId('addButton');
    expect(screen.getByTestId('addButton')).toBeVisible();
  });
  test('render with formDataEdit tema3', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateRyddeSetninger formDataEdit={ryddeSetningerMock} />
        </Router>
      )
    );

    expect(screen.getByTestId('word5')).toBeVisible();
  });
  test('infoModal', async () => {
    await act(async () =>
      render(
        <Router>
          <CreateRyddeSetninger />
        </Router>
      )
    );
    const infoButton = screen.getByTestId('infoButton');
    fireEvent.click(infoButton);
    await screen.findByText('Lage ny rydde setninger-oppgave');
    expect(screen.getByText('Lage ny rydde setninger-oppgave')).toBeVisible();
  });
});
