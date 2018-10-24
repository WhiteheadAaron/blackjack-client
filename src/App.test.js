import React from 'react';
import AppRouter from './App';
import { Provider } from 'react-redux';
import store from './store';
import {shallow, mount} from 'enzyme';
import { Player } from './components/player';

it('renders without crashing', () => {
  shallow(<Provider store={store}><AppRouter /></Provider>);
});

it ('should add a card on hit', () => {
  const items = [4, 5, 6];
  const wrapper = shallow(<Player />);
  wrapper.setProps({
    pPoints: items
  });
  const button = wrapper.find('.hitButton');
  button.simulate('click');
  expect(wrapper.props('pPoints.length')).toEqual(4);
});