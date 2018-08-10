import React from 'react';
import ReactDOM from 'react-dom';
import NewGameSettings from './NewGameSettings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewGameSettings />, div);
});
