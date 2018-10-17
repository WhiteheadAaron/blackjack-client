import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_ERROR
} from "../actions/auth";

const initialState = {
    authToken: '',
    user: null,
    loading: false,
    error: null
};

const loginReducer = (state = initialState, action) => {
    if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    }
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.value
        });
    }
    if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            user: action.value
        });
    }
    if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.value,
        });
    }
    if (action.type === REMOVE_AUTH) {
        return Object.assign({}, state, {
            authToken: '',
            user: null
        });
    }
    else {
        return state;
    }
}
export default loginReducer;