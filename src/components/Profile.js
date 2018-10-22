import React from "react";
import { connect } from "react-redux";

export function Profile(props) {
  return (
    <div className="App">
      <h1>My Profile</h1>
      <h3>Games Played: {props.played}</h3>
      <h3>Wins: {props.wins}</h3>
      <h3>Losses: {props.losses}</h3>
      <h3>Ties: {props.ties}</h3>
      <h3>Money: {props.money}</h3>
      <h3>Net Gain: {props.netGain}</h3>
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
    netGain: state.statReducer.netGain
  };
}

export default connect(mapStateToProps)(Profile);
