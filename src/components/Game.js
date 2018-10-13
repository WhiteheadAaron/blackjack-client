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
    inGame: state.takeCardReducer.inGame
  };
}

export default connect(mapStateToProps)(Game);