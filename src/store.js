import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { loadAuthToken } from './local-storage';
import { setAuthToken } from './actions/auth';
// import { refreshAuthToken } from './actions/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken
    store.dispatch(setAuthToken(token));
}

// const refreshToken = refreshAuthToken();
// if (refreshToken) {
//     store.dispatch(refreshAuthToken())
// }

export default store;