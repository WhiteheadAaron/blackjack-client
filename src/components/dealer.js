import React from "react";
import { connect } from "react-redux";
import { dealerCard, newGame, takeCard, inGame } from "../actions/actions";

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
      let dealerValue2;
      let dealerValue3;
      if (props.dealerPoints < 17) {
        let card =
          props.images[Number(Math.floor(Math.random() * props.images.length))];
        props.dispatch(dealerCard(card));
        dealerValue = card.value;
        if (props.dealerPoints + dealerValue < 17) {
          console.log(props.dealerPoints + dealerValue);
          let card2 =
            props.images[
              Number(Math.floor(Math.random() * props.images.length))
            ];
          props.dispatch(dealerCard(card2));
          dealerValue2 = dealerValue + card2.value;
          if (props.dealerPoints + dealerValue2 < 17) {
            console.log(props.dealerPoints + dealerValue2);
            let card3 =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(dealerCard(card3));
            dealerValue3 = dealerValue2 + card3.value;
            if (props.dealerPoints + dealerValue3 < 17) {
              console.log(props.dealerPoints + dealerValue3);
              let card4 =
                props.images[
                  Number(Math.floor(Math.random() * props.images.length))
                ];
              props.dispatch(dealerCard(card4));
            }
          }
        }
      }
    }
    checkCards();

    if (props.dealerPoints) {
      function renderDealerCards() {
        console.log(props.dealerCards.length);
        let newArr = [];
        for (let i = 0; i < props.dealerCards.length; i++) {
          console.log(props.dealerCards.length);
          newArr.push(
            <div className={`dealerCard${i}`}>
              <img
                src={require(`../images/${props.dealerCards[i].src}.jpg`)}
                alt={`Dealer card number ${i + 1}`}
              />
            </div>
          );
        }
        return newArr;
      }
      function renderPlayerCards() {
        console.log(props.playerCards.length);
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
        return  newArr;
      }
      if (
        (props.dealerPoints >= props.playerPoints &&
          props.dealerPoints <= 21) ||
        props.playerPoints > 21
      ) {
        console.log(props);
        return (
          <React.Fragment>
            <h1>You lost.</h1>
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
                props.dispatch(inGame(true));
              }}
            >
              New Game
            </button>
            <p className="dealerPoints">Dealer Points: {props.dealerPoints}</p>
            <p className="playerPoints">Player Points: {props.playerPoints}</p>
            {renderPlayerCards()}
            {renderDealerCards()}
          </React.Fragment>
        );
      }
      if (props.dealerPoints < props.playerPoints || props.dealerPoints > 21) {
        return (
          <React.Fragment>
            <h1>You win.</h1>
            <p className="dealerPoints">Dealer Points: {props.dealerPoints}</p>
            <p className="playerPoints">Player Points: {props.playerPoints}</p>
            {renderPlayerCards()}
            {renderDealerCards()}
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
                props.dispatch(inGame(true));
              }}
            >
              New Game
            </button>
          </React.Fragment>
        );
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
