import React from "react";
import { connect } from "react-redux";
import { dealerCard } from "../actions/actions";

export function Dealer(props) {
  const faceDown = require(`../images/deck.jpg`);
  if (props.inGame === true && props.playerPoints <= 21) {
    return (
      <React.Fragment>
        <div className="dealerCard0">
          <img
            src={require(`../images/${props.dealerCards[0].src}.jpg`)}
            alt="Dealer's first card"
          />
        </div>
        <div className="dealerCard1">
          <img src={faceDown} alt="Dealer's second card" />
        </div>
      </React.Fragment>
    );
  }

  if (props.inGame === "results") {
    function checkCards() {
      let dealerValue;
      if (props.dealerPoints < 17) {
        let card =
          props.images[Number(Math.floor(Math.random() * props.images.length))];
        props.dispatch(dealerCard(card));
        dealerValue = card.value
        if (props.dealerPoints + dealerValue < 17) {
          let card2 =
          props.images[Number(Math.floor(Math.random() * props.images.length))];
        props.dispatch(dealerCard(card2));
        dealerValue = dealerValue + card.value;
        }
        if (props.dealerPoints + dealerValue < 17) {
          let card3 =
          props.images[Number(Math.floor(Math.random() * props.images.length))];
        props.dispatch(dealerCard(card3));
        dealerValue = dealerValue + card.value;
        }
      }
    }

    if (props.dealerPoints) {
      checkCards()

      function renderDealerCards() {
        console.log(props.dealerCards.length)
        for (let i = 0; i <= props.dealerCards.length; i++) {
          return (
            <div className={`dealerCard${i}`}>
              <img
                src={require(`../images/${props.dealerCards[i].src}.jpg`)}
                alt={`Dealer card number ${i + 1}`}
              />
            </div>
          );
        }
      }
      if (
        props.dealerPoints >= props.playerPoints &&
        props.dealerPoints <= 21
      ) {
        return (
          <React.Fragment>
            <h1>You lost.</h1>
            <div className="playerCard1">
              <img
                src={require(`../images/${props.playerCards[0].src}.jpg`)}
                alt="Player's first card"
              />
            </div>
            <div className="playerCard2">
              <img
                src={require(`../images/${props.playerCards[1].src}.jpg`)}
                alt="Player's second card"
              />
            </div>
            {renderDealerCards()}
          </React.Fragment>
        );
      }
      if (props.dealerPoints < props.playerPoints || props.dealerPoints > 21) {
        return <h1>You won.</h1>;
      }
    }
  } else {
    return "";
  }
}

function mapStateToProps(state) {
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    playerPoints: state.takeCardReducer.playerPoints,
    dealerPoints: state.takeCardReducer.dealerPoints
  };
}

export default connect(mapStateToProps)(Dealer);
