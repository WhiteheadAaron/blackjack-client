const initialState = {
    wins: 0,
    losses: 0,
    ties: 0,
    played: 0,
    id: null,
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
            played: action.value.played,
            ties: action.value.ties,
            id: action.value.id
        });
    }
    if (action.type === 'STAT_WIN') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            wins: state.wins + 1,
            played: state.played + 1
        });
    }
    if (action.type === 'STAT_LOSS') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            losses: state.losses + 1,
            played: state.played + 1
        });
    }
    if (action.type === 'STAT_TIE') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            played: state.played + 1,
            ties: state.ties + 1
        });
    }
    
    else {
        return state;
    }
}
export default statReducer;