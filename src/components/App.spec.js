import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';


describe('<App />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders title', () => {
    const wrapper = shallow(<App />);
    const welcome = <h1>Tic-Tac-Toe</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  
});
