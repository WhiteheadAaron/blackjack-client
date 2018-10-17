import { API_BASE_URL } from "../config";



export const REGISTER = "REGISTER";
export const register = value => ({
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


export const registerAction = (username, password) => dispatch => {
  return (
    fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(res => dispatch(registerSuccess(res))) 
      .catch(err => dispatch(registerError()))
    
  );
};

export const STAT = "REGISTER";
export const stat = value => ({
  type: STAT,
  value
});

export const STAT_SUCCESS = "STAT_SUCCESS";
export const statSuccess = value => {
    return {
        type: STAT_SUCCESS,
        value
    }
}

export const STAT_ERROR = "STAT_ERROR"
export const statError = value => {
    return {
        type: STAT_ERROR,
        value
    }
}


export const statAction = (played, wins, losses) => dispatch => {
  return (
    fetch(`${API_BASE_URL}/stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        played,
        wins,
        losses
      })
    })
      .then(res => res.json())
      .then(res => dispatch(statSuccess(res))) 
      .catch(err => dispatch(statError()))
    
  );
};
