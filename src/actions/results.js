import { API_BASE_URL } from "../config";

export const RESULT = "RESULT";
export const result = value => ({
  type: RESULT,
  value
});

export const RESULT_SUCCESS = "RESULT_SUCCESS";
export const resultSuccess = value => {
  return {
    type: RESULT_SUCCESS,
    value
  };
};

export const RESULT_ERROR = "RESULT_ERROR";
export const resultError = value => {
  return {
    type: RESULT_ERROR,
    value
  };
};

export const resultAction = (
    played,
    wins,
    losses,
    ties,
    money,
    netGain,
    authToken,
    statId
  ) => dispatch => {
    return fetch(`${API_BASE_URL}/stats/${statId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken
      },
      body: JSON.stringify({
        played,
        wins,
        losses,
        ties,
        money,
        netGain
      })
    })
      .then(res => res.json())
      .then()
      .then(res => dispatch(resultSuccess(res)))
      .catch(err => dispatch(resultError()));
  };