import { combineReducers } from 'redux';
import inGameReducer from './inGame';
import takeCardReducer from './takeCard';
import statReducer from './stats';
import registerReducer from './register';
import loginReducer from './auth';

const rootReducer = combineReducers({
    inGameReducer,
    takeCardReducer,
    statReducer,
    registerReducer,
    loginReducer
});


export default rootReducer;