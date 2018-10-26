import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logoutAction, removeAuth } from "../actions/auth";
import { newGame, inGame, statReset } from "../actions/actions";

export function Profile(props) {
  if (!props.authToken) {
    return <Redirect to="/" />;
  }
  let netGain = props.money - (props.bankruptcies * 100) - 100;
  return (
    <div className="gameBack">
      <div className="profileGameGrid">
        <h1 className="profileHeader">My Profile</h1>
        <h3 className="profileGames">Games Played: {props.played}</h3>
        <h3 className="profileWins">Wins: {props.wins}</h3>
        <h3 className="profileLosses">Losses: {props.losses}</h3>
        <h3 className="profileTies">Ties: {props.ties}</h3>
        <h3 className="profileMoney">Money: {props.money}</h3>
        <h3 className="profileGain">Net Gain: {netGain}</h3>
        <h3 className="profileBankrupt">Bankruptcies: {props.bankruptcies}</h3>
        <Link to="/" className="profileG">
          <button className="profileGame">Back to Game</button>
        </Link>
        <Link to="/" className="profileSO">
          <button
            className="profileSignOut"
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
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    played: state.statReducer.played,
    wins: state.statReducer.wins,
    losses: state.statReducer.losses,
    ties: state.statReducer.ties,
    money: state.statReducer.money,
    netGain: state.statReducer.netGain,
    bankruptcies: state.statReducer.bankruptcies,
    authToken: state.loginReducer.authToken
  };
}

export default connect(mapStateToProps)(Profile);
