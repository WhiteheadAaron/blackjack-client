import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { loadAuthToken } from './local-storage';
import { storeAuthInfo } from './actions/auth';
import { getStatsAction } from './actions/actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken
    storeAuthInfo(token, store.dispatch)
    store.dispatch(getStatsAction(token))
}

export default store;