import { combineReducers } from 'redux';
import inGameReducer from './inGame';
import takeCardReducer from './takeCard';
import statReducer from './stats';

const rootReducer = combineReducers({
    inGameReducer,
    takeCardReducer,
    statReducer
});


export default rootReducer;