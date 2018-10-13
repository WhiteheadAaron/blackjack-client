import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Player } from "./player";
import { Dealer } from "./dealer";

export function Game(props) {
  console.log(props);
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <Dealer />
        <Player takeCard={props.takeCard} />
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  inGame: state.inGame
});

export default connect(mapStateToProps)(Game);
