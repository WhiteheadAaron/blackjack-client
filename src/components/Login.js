import React from "react";


const Login = () => (
  <div className="Login">
    <header className="howToPlay">
        BlackJack Game
    </header>
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
        <form className="loginForm">
            <label>Login</label>
            <input type="text" name="username" placeholder="Username"></input>
            <input type="text" name="password" placeholder="Password"></input>
            <button type="submit" className="signUpSubmit">Submit</button>
            <a href='google.com'>Don't have an account? Sign up here.</a>
        </form>
    </div>
  </div>
);

export default Login;