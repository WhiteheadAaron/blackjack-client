import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/login.css";
import "./components/game.css";
import './components/profile.css';
import Profile from "./components/Profile";
import { connect } from "react-redux";
import Home from "./components/home";

export class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(AppRouter);
