const initialState = {
    loading: false,
    error: null
};

const registerReducer = (state = initialState, action) => {
    if (action.type === 'REGISTER') {
        return Object.assign({}, state, {
            loading: true
        });
    }
    if (action.type === 'REGISTER_ERROR') {
        return Object.assign({}, state, {
            loading: false,
            error: true
        });
    }
    if (action.type === 'REGISTER_SUCCESS') {
        return Object.assign({}, state, {
            loading: false,
            error: null
        });
    }

    else {
        return state;
    }
}
export default registerReducer;