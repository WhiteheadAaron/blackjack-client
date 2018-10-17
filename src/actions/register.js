import { API_BASE_URL } from "../config";



export const REGISTER = "REGISTER";
export const setAuthToken = value => ({
  type: REGISTER,
  value
});

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const registerSuccess = value => {
    return {
        type: REGISTER_SUCCESS,
        value
    }
}

export const REGISTER_ERROR = "REGISTER_ERROR"
export const registerError = value => {
    return {
        type: REGISTER_ERROR,
        value
    }
}


export const registerAction = (username, password, played, wins, losses) => dispatch => {
  return (
    fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        played,
        wins,
        losses
      })
    })
      .then(res => res.json())
      .then(res => dispatch(registerSuccess(res))) 
      .catch(err => dispatch(registerError()))
  );
};

