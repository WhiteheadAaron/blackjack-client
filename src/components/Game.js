import React from "react";
import { Player } from "./player";
import { Dealer } from "./dealer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function Game(props) {
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <Link className="profile" to="/profile">
          <button className="profileButton" onClick={() => {}}>
            My Profile
          </button>
        </Link>
        <Link className="signOut" to="/">
          <button className="signOutButton" onClick={() => {}}>
            Sign Out
          </button>
        </Link>
        <Dealer {...props} />
        <Player {...props} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state)
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
    authToken: state.loginReducer.authToken
  };
}

export default connect(mapStateToProps)(Game);
