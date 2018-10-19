import React from "react";
import { Player } from "./player";
import { Dealer } from "./dealer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction, removeAuth } from '../actions/auth';
import { newGame, inGame, getStatsAction } from '../actions/actions';
import { statAction } from '../actions/register';

export function Game(props) {
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <Link className="profile" to="/profile">
          <button className="profileButton" onClick={() => {
            console.log(props)
            // props.dispatch(statAction(0, 0, 0, props.user.id, props.authToken))
          
              props.dispatch(getStatsAction(props.authToken))
            
            
          }}>
            My Profile
          </button>
        </Link>
          <button className="signOut signOutButton" onClick={() => {
            props.dispatch(newGame())
            props.dispatch(inGame(false))
            props.dispatch(removeAuth())
            logoutAction()
          }}>
            Sign Out
          </button>
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
    authToken: state.loginReducer.authToken,
    user: state.loginReducer.user,
    statId: state.statReducer.id
  };
}

export default connect(mapStateToProps)(Game);
