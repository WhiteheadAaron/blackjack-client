import { combineReducers } from 'redux';
import inGameReducer from './inGame';
import takeCardReducer from './takeCard';

const rootReducer = combineReducers({
    inGameReducer,
    takeCardReducer
});


export default rootReducer;