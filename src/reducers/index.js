import { combineReducers } from 'redux';
import inGameReducer from './inGame';

const rootReducer = combineReducers({
    inGameReducer,
});


export default rootReducer;