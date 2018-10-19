const initialState = {
    loading: false,
    error: null
};

const resultReducer = (state = initialState, action) => {
    if (action.type === 'RESULT') {
        return Object.assign({}, state, {
            loading: true
        });
    }
    if (action.type === 'RESULT_ERROR') {
        return Object.assign({}, state, {
            loading: false,
            error: true
        });
    }
    if (action.type === 'RESULT_SUCCESS') {
        return Object.assign({}, state, {
            loading: false,
            error: null
        });
    }

    else {
        return state;
    }
}
export default resultReducer;