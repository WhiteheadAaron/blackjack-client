import React from 'react';
import AppRouter from './App';
import { Provider } from 'react-redux';
import store from './store';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  shallow(<Provider store={store}><AppRouter /></Provider>);
});
