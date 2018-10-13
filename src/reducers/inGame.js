import {IN_GAME} from '../actions/actions';

const initialState = {
    inGame: 'hello'
};

const inGameReducer = (state = initialState, action) => {
    if (action.type === IN_GAME) {
        return Object.assign({}, state, {
            inGame: 'goodbye'
        });
    }
    else {
        return state;
    }
};

export default inGameReducer;