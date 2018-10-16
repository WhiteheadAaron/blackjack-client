export const IN_GAME = 'IN_GAME';
export const inGame = (value) => {
    return {
        type: IN_GAME,
        value
    };
}

export const TAKE_CARD = 'TAKE_CARD';
export const takeCard = (value) => {
    return {
        type: TAKE_CARD,
        value
    };
}

export const DEALER_CARD = 'DEALER_CARD'
export const dealerCard = (value) => {
    return {
        type: DEALER_CARD,
        value
    }
}

export const NEW_GAME = 'NEW_GAME';
export const newGame = (value) => {
    return {
        type: NEW_GAME,
        value
    }
}

export const REMOVE_ACE = "REMOVE_ACE";
export const removeAce = (value) => {
    return {
        type: REMOVE_ACE,
        value
    }
}

export const REMOVE_DEALER_ACE = "REMOVE_DEALER_ACE";
export const removeDealerAce = (value) => {
    return {
        type: REMOVE_DEALER_ACE,
        value
    }
}

export const fetchStatsRequest = (value) => {
    return {
        type: 'GET_STATS',
        value
    };
};

export const fetchStatsSuccess = value => {
    return {
        type: 'GET_STATS_SUCCESS',
        value
    }
}

export const fetchStatsError = value => {
    return {
        type: 'GET_STATS_ERROR',
        value
    }
}

export const getStatsAction = () => dispatch => {
    dispatch(fetchStatsRequest())
    fetch('https://blackjack-app-server.herokuapp.com/test')
        .then(res => res.json()) 
        .then(res => dispatch(fetchStatsSuccess(res))) 
        .catch(err => dispatch(fetchStatsError()));
}