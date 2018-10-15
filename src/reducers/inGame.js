import { IN_GAME } from "../actions/actions";

const initialState = {
    inGame: false
};

const inGameReducer = (state = initialState, action) => {
  if (action.type === IN_GAME) {
    return Object.assign({}, state, {
      inGame: action.value
    });
  } else {
    return state;
  }
};

export default inGameReducer;