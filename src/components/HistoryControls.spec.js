import React from 'react';
import ReactDOM from 'react-dom';
import HistoryControls from './HistoryControls';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HistoryControls />, div);
});
