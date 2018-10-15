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