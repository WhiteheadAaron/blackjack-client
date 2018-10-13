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