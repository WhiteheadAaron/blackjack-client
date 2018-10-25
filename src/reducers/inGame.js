import { IN_GAME, GAME_OVER } from "../actions/actions";

const initialState = {
    inGame: false,
    gameOver: null,
    help: true
};

const inGameReducer = (state = initialState, action) => {
  if (action.type === IN_GAME) {
    return Object.assign({}, state, {
      inGame: action.value
    });
  } 
  if (action.type === GAME_OVER) {
    return Object.assign({}, state, {
      gameOver: action.value
    });
  } 
  if (action.type === 'HELP') {
    return Object.assign({}, state, {
      help: action.value
    });
  }
  else {
    return state;
  }
};

export default inGameReducer;