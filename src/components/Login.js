import React from "react";
import { connect } from "react-redux";
import { loginAction } from "../actions/auth";
import { getStatsAction } from "../actions/actions";
import { registerAction, statAction } from "../actions/register";

export function Login(props) {
  return (
    <div className="backgroundLogin">
      <div className="Login">
        <header className="howToPlay">BlackJack Game</header>
        <div className="howToPlayInfo">
          <p>
            This is an application where you can play Blackjack, the popular
            betting game. However, we just play for fun here, so you'll just be
            playing with virtual money.
          </p>
          <ul className="rulesList">
            <li>Some rules here</li>
            <li>Some more rules</li>
            <li>Some rules here</li>
            <li>Some more rules</li>
            <li>Some rules here</li>
            <li>Some more rules</li>
          </ul>
        </div>
        <div className="loginGrid">
          <form
            className="loginForm"
            onSubmit={e => {
              e.preventDefault();
              let username = e.target.username.value.toLowerCase();
              let password = e.target.password.value;
              props.dispatch(loginAction(username, password)).then(() => {
                console.log(props.authToken);
                props.dispatch(getStatsAction(props.authToken));
              });
            }}
          >
            <label>Login</label>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
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
                    const getAuTo = async () => {
                      let auTo = await props.dispatch(
                        loginAction(username, password)
                      );
                      props.dispatch(
                        statAction(0, 0, 0, 0, 100, 0, user.id, username, auTo)
                      );
                      props.dispatch(getStatsAction(auTo));
                    };
                    getAuTo();
                  });
              } else {
                alert("Passwords must match!");
                e.target.password.value = '';
                e.target.password2.value = '';
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
