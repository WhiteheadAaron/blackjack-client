import React from "react";
import { connect } from "react-redux";
import {
  takeCard,
  inGame,
  dealerCard,
  newGame,
  removeAce
} from "../actions/actions";

export function Player(props) {
  const faceDown = require(`../images/deck.jpg`);
  console.log(playerPointCount())

  function playerPointCount() {
    let total = 0;
    for (let i=0; i < props.pPoints.length; i++) {
      total = total + props.pPoints[i];
    }
    return total;
  } 


  if (props.inGame === false) {
    return (
      <button
        onClick={() => {
          let images = props.images;
          let card1 =
            images[
              Number(Math.floor(Math.random() * images.length))
            ];
          props.dispatch(takeCard(card1));
          images = images.filter(item => item.src !== card1.src)
          let card2 =
            images[
              Number(Math.floor(Math.random() * images.length))
            ];
          props.dispatch(takeCard(card2));
          images = images.filter(item => item.src !== card2.src)
          let card3 =
            images[
              Number(Math.floor(Math.random() * images.length))
            ];
          props.dispatch(dealerCard(card3));
          props.dispatch(inGame(true));
        }}
      >
        Hello
      </button>
    );
  }

  if (props.inGame === true && playerPointCount() === 22) {
    props.dispatch(removeAce());
  }

  if (props.inGame === true && playerPointCount() <= 21) {
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
        <p className="playerPointCount">
          Your Current Points: {playerPointCount()}
        </p>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
            let newValue = playerPointCount() + card.value;
            if (newValue > 21) {
              if (props.pPoints.includes(11) || card.value === 11) {
                props.dispatch(removeAce());
              }
              if (!props.pPoints.includes(11) && card.value !== 11) {
                props.dispatch(inGame("results"));
              }
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
  } else {
    return '';
  }
}

function mapStateToProps(state) {
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    pPoints: state.takeCardReducer.pPoints
    
  };
}

export default connect(mapStateToProps)(Player);
