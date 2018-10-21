import { API_BASE_URL } from "../config";

export const IN_GAME = "IN_GAME";
export const inGame = value => {
  return {
    type: IN_GAME,
    value
  };
};

export const GAME_OVER = "GAME_OVER";
export const gameOver = value => {
  return {
    type: GAME_OVER,
    value
  };
};


export const TAKE_CARD = "TAKE_CARD";
export const takeCard = value => {
  return {
    type: TAKE_CARD,
    value
  };
};

export const DEALER_CARD = "DEALER_CARD";
export const dealerCard = value => {
  return {
    type: DEALER_CARD,
    value
  };
};

export const NEW_GAME = "NEW_GAME";
export const newGame = value => {
  return {
    type: NEW_GAME,
    value
  };
};

export const REMOVE_ACE = "REMOVE_ACE";
export const removeAce = value => {
  return {
    type: REMOVE_ACE,
    value
  };
};

export const REMOVE_DEALER_ACE = "REMOVE_DEALER_ACE";
export const removeDealerAce = value => {
  return {
    type: REMOVE_DEALER_ACE,
    value
  };
};

export const fetchStatsRequest = value => {
  return {
    type: "GET_STATS",
    value
  };
};

export const fetchStatsSuccess = value => {
  return {
    type: "GET_STATS_SUCCESS",
    value
  };
};

export const fetchStatsError = value => {
  return {
    type: "GET_STATS_ERROR",
    value
  };
};

export const STAT_WIN = 'STAT_WIN';
export const statWin = value => {
  return {
    type: STAT_WIN,
    value
  }
}

export const STAT_LOSS = 'STAT_LOSS';
export const statLoss = value => {
  return {
    type: STAT_LOSS,
    value
  }
}

export const STAT_TIE = 'STAT_TIE';
export const statTie = value => {
  return {
    type: STAT_TIE,
    value
  }
}

export const getStatsAction = authToken => dispatch => {
  dispatch(fetchStatsRequest());
  fetch(`${API_BASE_URL}/stats`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken
    }
  })
    .then(res => res.json())
    .then(res => dispatch(fetchStatsSuccess(res[0])))
    .catch(err => dispatch(fetchStatsError()));

    
};
