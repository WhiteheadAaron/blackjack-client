import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../config";

const saveAuthToken = authToken => {
  try {
    localStorage.setItem("authToken", authToken);
  } catch (e) {}
};

const removeAuthToken = () => {
  try {
    localStorage.removeItem("authToken");
  } catch (e) {}
};

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = value => ({
  type: SET_AUTH_TOKEN,
  value
});

export const REMOVE_AUTH = "REMOVE_AUTH";
export const removeAuth = () => ({
  type: REMOVE_AUTH
});

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = value => ({
  type: AUTH_SUCCESS,
  value
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = value => ({
  type: AUTH_ERROR,
  value
});

export const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
};

export const logoutAction = () => dispatch => {
    dispatch(removeAuthToken)
}

export const loginAction = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/login`, {
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
      .then(({ authToken }) => {
        storeAuthInfo(authToken, dispatch)
        return authToken;
      })
      .catch(err => {
        dispatch(authError(err));
        return err
      })
  );
};
