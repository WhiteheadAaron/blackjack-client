import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/login.css";
import "./components/game.css";
import Login from "./components/Login";
import Game from "./components/Game";
import Profile from "./components/Profile";
import { connect } from "react-redux";
import getStatsAction from './actions/actions';

class AppRouter extends Component {

  componentDidMount() {
    this.props.dispatch(getStatsAction())
  }
 

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route
              path="/game"
              render={() => {
                return (
                  <Game/>
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
    dPoints: state.takeCardReducer.dPoints,
    pPoints: state.takeCardReducer.pPoints,
    played: state.statReducer.played,
    wins: state.statReducer.wins,
    losses: state.statReducer.losses
  };
}

export default connect(mapStateToProps)(AppRouter);
