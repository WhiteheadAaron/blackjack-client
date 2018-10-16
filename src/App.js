import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/login.css";
import "./components/game.css";
import Login from "./components/Login";
import Game from "./components/Game";
import Profile from "./components/Profile";
import { connect } from "react-redux";

class AppRouter extends Component {
 

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route
              path="/game"
              render={() => {
                return (
                  <Game
                    images={this.props.images}
                    playerCards={this.props.playerCards}
                    inGame={this.props.inGame}
                  />
                );
              }}
              exact={true}
            />
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/" component={Login} />
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
    dealerPoints: state.takeCardReducer.dealerPoints,
    playerPoints: state.takeCardReducer.playerPoints,
    dPoints: state.takeCardReducer.dPoints,
    pPoints: state.takeCardReducer.pPoints
  };
}

export default connect(mapStateToProps)(AppRouter);
