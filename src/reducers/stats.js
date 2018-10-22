const initialState = {
    wins: 0,
    losses: 0,
    ties: 0,
    played: 0,
    money: 0,
    netGain: 0,
    bet: 0,
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
            money: action.value.money,
            netGain: action.value.netGain,
            id: action.value.id
        });
    }
    if (action.type === 'STAT_WIN') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            wins: state.wins + 1,
            played: state.played + 1,
            money: state.money + action.value,
            netGain: state.netGain + action.value
        });
    }
    if (action.type === 'STAT_LOSS') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            losses: state.losses + 1,
            played: state.played + 1,
            money: state.money + action.value,
            netGain: state.netGain + action.value
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
    if (action.type === 'BET') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            bet: action.value,
            money: state.money - action.value
        })
    }
    if (action.type === 'STAT_RESET') {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            played: 0,
            wins: 0,
            losses: 0,
            ties: 0,
            bet: 0,
            id: null
        })
    }
    
    else {
        return state;
    }
}
export default statReducer;