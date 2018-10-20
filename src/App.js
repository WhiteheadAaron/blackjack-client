import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/login.css";
import "./components/game.css";
import Game from "./components/Game";
import Profile from "./components/Profile";
import { connect } from "react-redux";
import Home from "./components/home";

class AppRouter extends Component {
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
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.inGameReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    dPoints: state.takeCardReducer.dPoints,
    pPoints: state.takeCardReducer.pPoints,
    played: state.statReducer.played,
    wins: state.statReducer.wins,
    losses: state.statReducer.losses,
    authToken: state.loginReducer.authToken,
    user: state.loginReducer.user,
    statId: state.statReducer.id,--------------
    gameOver: state.inGameReducer.gameOver
  };
}

export default connect(mapStateToProps)(AppRouter);
