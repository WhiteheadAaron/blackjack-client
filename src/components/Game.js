import React from "react";
import { Player } from "./player";
import { Dealer } from "./dealer";
import { connect } from 'react-redux';

export function Game(props) {
  return (
    <div className="gameBack">
      <div className="gameGrid">
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
    dealerPoints: state.takeCardReducer.dealerPoints,
    playerPoints: state.takeCardReducer.playerPoints
  };
}

export default connect(mapStateToProps)(Game);