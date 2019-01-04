import React from "react";
import { Player } from "./player";
import { Dealer } from "./dealer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction, removeAuth } from "../actions/auth";
import { newGame, inGame, getStatsAction, statReset } from "../actions/actions";

export function Game(props) {
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <nav role="navigation" className="prof-sign-out">
          <h2>BlackJack</h2>
          <Link className="profile" to="/profile">
            <button
              className="profileButton"
              onClick={() => {
                props.dispatch(getStatsAction(props.authToken));
              }}
            >
              {props.user.username} ($
              {props.money})
            </button>
          </Link>
          <button
            className="signOut signOutButton"
            onClick={() => {
              props.dispatch(newGame());
              props.dispatch(inGame(false));
              props.dispatch(statReset());
              props.dispatch(removeAuth());
              logoutAction();
              localStorage.removeItem("authToken");
            }}
          >
            Sign Out
          </button>
        </nav>
        <Dealer {...props} />
        <Player {...props} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.inGameReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    pPoints: state.takeCardReducer.pPoints,
    dPoints: state.takeCardReducer.dPoints,
    played: state.statReducer.played,
    wins: state.statReducer.wins,
    losses: state.statReducer.losses,
    ties: state.statReducer.ties,
    authToken: state.loginReducer.authToken,
    user: state.loginReducer.user,
    statId: state.statReducer.id,
    bet: state.statReducer.bet,
    money: state.statReducer.money,
    netGain: state.statReducer.netGain,
    bankruptcies: state.statReducer.bankruptcies,
    gameOver: state.inGameReducer.gameOver,
    help: state.inGameReducer.help
  };
}

export default connect(mapStateToProps)(Game);
