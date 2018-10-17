import React from "react";
import { connect } from "react-redux";
import { loginAction } from '../actions/auth';
import { registerAction, statAction } from '../actions/register';

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
              let username = e.target.username.value;
              let password = e.target.password.value;
              let played = 0;
              let wins = 0;
              let losses = 0;
              console.log(username, password)
              props.dispatch(loginAction(username, password))
              props.dispatch(statAction(played, wins, losses))
            }}
          >
            <label>Login</label>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
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
              let username = e.target.username.value;
              let password = e.target.password.value;
              props.dispatch(registerAction(username, password))
            }}
          >
            <label>Sign Up</label>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="password" placeholder="Password" />
            <input
              type="text"
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
  inGame: state.inGame
});

export default connect(mapStateToProps)(Login);
