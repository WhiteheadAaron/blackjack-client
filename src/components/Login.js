import React from "react";
import { connect } from "react-redux";
import { loginAction } from "../actions/auth";
import { getStatsAction } from "../actions/actions";
import { registerAction, statAction } from "../actions/register";

export function Login(props) {
  return (
    <div className="backgroundLogin">
      <div className="Login">
        <div className="loginInfo">
          <h1>BlackJack</h1>
          <p>
            Login or signup to play BlackJack. It's 100% free. What are you
            waiting for?
          </p>
        </div>
        <div className="loginGrid">
          <form
            className="loginForm"
            onSubmit={e => {
              e.preventDefault();
              let username = e.target.username.value.toLowerCase();
              let password = e.target.password.value;
              const loginF = async () => {
                try {
                  let authToken = await props.dispatch(
                    loginAction(username, password)
                  );
                  props.dispatch(getStatsAction(authToken));
                } catch (err) {
                  console.log(err);
                  if (err.status === 401) {
                    alert("Username or Password is incorrect.");
                  }
                }
              };
              loginF();
            }}
          >
            <label>Login</label>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <p className="demo demo2">Demo Username: test</p>
            <p className="demo">Password: pass123</p>
            <button type="submit" className="signInSubmit">
              Submit
            </button>
          </form>
        </div>
        <div className="registerGrid">
          <form
            className="registerForm"
            onSubmit={e => {
              e.preventDefault();
              let username = e.target.username.value.toLowerCase();
              let password = e.target.password.value;
              if (password === e.target.password2.value) {
                props
                  .dispatch(registerAction(username, password))
                  .then(user => {
                    if (user) {
                      const getAuTo = async () => {
                        try {
                          let auTo = await props.dispatch(
                            loginAction(username, password)
                          );
                          props.dispatch(
                            statAction(
                              0,
                              0,
                              0,
                              0,
                              100,
                              0,
                              0,
                              user.id,
                              username,
                              auTo
                            )
                          );
                          props.dispatch(getStatsAction(auTo));
                        } catch (err) {
                          if (err.status === 401) {
                            alert("Username or Password is incorrect.");
                          }
                        }
                      };
                      getAuTo();
                    }
                  });
              } else {
                alert("Passwords must match!");
                e.target.password.value = "";
                e.target.password2.value = "";
              }
            }}
          >
            <label>Sign Up</label>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
            />
            <button type="submit" className="signUpSubmit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  inGame: state.inGame,
  authToken: state.loginReducer.authToken,
  user: state.loginReducer.user
});

export default connect(mapStateToProps)(Login);
