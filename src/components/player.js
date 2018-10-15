import React from "react";
import { connect } from "react-redux";
import { takeCard, inGame, dealerCard, newGame } from "../actions/actions";


export function Player(props) {
  const faceDown = require(`../images/deck.jpg`);

  if (props.playerPoints > 21 && props.inGame === true) {
    return (
      <div>
        <h1>You lose.</h1>
        <button
          onClick={() => {
            props.dispatch(newGame());
            let card1 =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card1));
            let card2 =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card2));
            let card3 =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(dealerCard(card3));
          }}
        >
          New Game
        </button>
      </div>
    );
  }

  if (props.inGame === false) {
    return (
      <button
        onClick={() => {
          let card1 =
            props.images[
              Number(Math.floor(Math.random() * props.images.length))
            ];
          props.dispatch(takeCard(card1));
          let card2 =
            props.images[
              Number(Math.floor(Math.random() * props.images.length))
            ];
          props.dispatch(takeCard(card2));
          let card3 =
            props.images[
              Number(Math.floor(Math.random() * props.images.length))
            ];
          props.dispatch(dealerCard(card3));
          props.dispatch(inGame(true));
        }}
      >
        Hello
      </button>
    );
  }
  if (
    props.inGame === true &&
    props.playerPoints <= 21
  ) {
    function renderPlayerCards() {
      let newArr = [];
      for (let i = 0; i < props.playerCards.length; i++) {
        newArr.push(
          <div className={`playerCard${i}`}>
            <img
              src={require(`../images/${props.playerCards[i].src}.jpg`)}
              alt={`Player card number ${i + 1}`}
            />
          </div>
        );
      }
      return newArr;
    }
    return (
      <React.Fragment>


        <div className="deckImgDiv">
          <img src={faceDown} alt="Deck of Cards" />
        </div>
        <p className="playerPointCount">Your Current Points: {props.playerPoints}</p>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
            let newValue = props.playerPoints + card.value;
            if (newValue > 21) {
              props.dispatch(inGame("results"));
            }
          }}
        >
          Hit
        </button>
        <button
          className="stayButton"
          onClick={() => {
            props.dispatch(inGame("results"));
          }}
        >
          Stay
        </button>
        {renderPlayerCards()}
      </React.Fragment>
    );
  }
 else {
    return "";
  }
}

function mapStateToProps(state) {
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    dealerPoints: state.takeCardReducer.dealerPoints,
    playerPoints: state.takeCardReducer.playerPoints
  };
}

export default connect(mapStateToProps)(Player);
