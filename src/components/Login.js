import React from "react";
import { connect } from "react-redux";
import { inGame } from "../actions/actions";

export function Login(props) {
  return (
    <div className="Login">
      <header className="howToPlay">BlackJack Game</header>
      <div className="howToPlayInfo">
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
            props.dispatch(inGame());
          }}
        >
          <label>Login</label>
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <button type="submit" className="signUpSubmit">
            Submit
          </button>
          <a href="google.com">Don't have an account? Sign up here.</a>
        </form>
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  inGame: state.inGame
});

export default connect(mapStateToProps)(Login);
