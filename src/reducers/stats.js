const initialState = {
    wins: 0,
    losses: 0,
    played: 0,
    loading: false,
    error: null
};

const statReducer = (state = initialState, action) => {
    if (action.type === 'GET_STATS') {
        return Object.assign({}, state, {
            loading: true
        });
    }
    if (action.type === 'GET_STATS_ERROR') {
        return Object.assign({}, state, {
            loading: false,
            error: true
        });
    }
    if (action.type === 'GET_STATS_SUCCESS') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            wins: action.value.wins,
            losses: action.value.losses,
            played: action.value.played
        });
    }
    else {
        return state;
    }
}
export default statReducer;