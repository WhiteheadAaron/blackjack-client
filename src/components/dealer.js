import React from "react";
import { connect } from "react-redux";
import {
  dealerCard,
  newGame,
  takeCard,
  inGame,
  removeDealerAce
} from "../actions/actions";

export function Dealer(props) {
  const faceDown = require(`../images/deck.jpg`);
  function playerPointCount() {
    let total = 0;
    for (let i = 0; i < props.pPoints.length; i++) {
      total = total + props.pPoints[i];
    }
    return total;
  }

  function dealerPointCount() {
    let total = 0;
    for (let i = 0; i < props.dPoints.length; i++) {
      total = total + props.dPoints[i];
    }
    return total;
  }

  if (props.inGame === true && playerPointCount() <= 21) {
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
      let card;
      let card2;
      let card3;
      let card4;
      let images = props.images;
      if (dealerPointCount() < 17) {
        card =
          images[Number(Math.floor(Math.random() * images.length))];
        props.dispatch(dealerCard(card));
        dealerValue = card.value;
        images = images.filter(item => item.src !== card.src)
        if (dealerPointCount() + dealerValue < 17) {
          card2 =
            images[
              Number(Math.floor(Math.random() * images.length))
            ];
          props.dispatch(dealerCard(card2));
          dealerValue2 = dealerValue + card2.value;
          images = images.filter(item => item.src !== card2.src)
          if (dealerPointCount() + dealerValue2 < 17) {
            card3 =
              images[
                Number(Math.floor(Math.random() * images.length))
              ];
            props.dispatch(dealerCard(card3));
            dealerValue3 = dealerValue2 + card3.value;
            images = images.filter(item => item.src !== card3.src)
            if (dealerPointCount() + dealerValue3 < 17) {
              card4 =
                images[
                  Number(Math.floor(Math.random() * images.length))
                ];
              props.dispatch(dealerCard(card4));
              images = images.filter(item => item.src !== card4.src)
            }

            if (dealerPointCount() + dealerValue3 > 21) {
              if (props.dPoints.includes(11) || card3.value === 11) {
                props.dispatch(removeDealerAce());
              }
            }
          }
          if (dealerPointCount() + dealerValue2 > 21) {
            if (props.dPoints.includes(11) || card2.value === 11) {
              props.dispatch(removeDealerAce());
            }
          }
        }
        if (dealerPointCount() + dealerValue > 21) {
          if (props.dPoints.includes(11) || card.value === 11) {
            props.dispatch(removeDealerAce());
          }
        }
      }
      if (dealerPointCount() > 21) {
        if (props.dPoints.includes(11) || dealerValue === 11) {
          props.dispatch(removeDealerAce());
        }
      }

    }
    checkCards();

    if (dealerPointCount()) {
      function renderDealerCards() {
        let newArr = [];
        for (let i = 0; i < props.dealerCards.length; i++) {
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
      if (
        (dealerPointCount() > playerPointCount() && dealerPointCount() <= 21) ||
        playerPointCount() > 21
      ) {
        let dealerP = dealerPointCount();
        let playerP = playerPointCount();
        if (dealerPointCount() > 21 && playerPointCount() <= 21) {
          dealerP = "Bust";
        }
        if (playerPointCount() > 21) {
          playerP = "Bust";
        }
        return (
          <React.Fragment>
            <h1 className="youLost">You lose.</h1>
            <button
              className="playAgainButton"
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
            <p className="dealerPoints">Dealer Points: {dealerP}</p>
            <p className="playerPoints">Player Points: {playerP}</p>
            {renderPlayerCards()}
            {renderDealerCards()}
          </React.Fragment>
        );
      }
      if (dealerPointCount() < playerPointCount() || dealerPointCount() > 21) {
        let dealerP = dealerPointCount();
        let playerP = playerPointCount();
        if (dealerPointCount() > 21 && playerPointCount() <= 21) {
          dealerP = "Bust";
        }
        if (playerPointCount() > 21) {
          playerP = "Bust";
        }
        return (
          <React.Fragment>
            <h1 className="youLost">You win.</h1>
            <p className="dealerPoints">Dealer Score: {dealerP}</p>
            <p className="playerPoints">Your Score: {playerP}</p>
            {renderPlayerCards()}
            {renderDealerCards()}
            <button
              className="playAgainButton"
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
      if (
        dealerPointCount() === playerPointCount() &&
        dealerPointCount() <= 21 &&
        playerPointCount() <= 21
      ) {
        let dealerP = dealerPointCount();
        let playerP = playerPointCount();
        if (dealerPointCount() > 21 && playerPointCount() <= 21) {
          dealerP = "Bust";
        }
        if (playerPointCount() > 21) {
          playerP = "Bust";
        }
        return (
          <React.Fragment>
            <h1 className="youLost">It is a tie.</h1>
            <p className="dealerPoints">Dealer Score: {dealerP}</p>
            <p className="playerPoints">Your Score: {playerP}</p>
            {renderDealerCards()}
            {renderPlayerCards()}
            <button
              className="playAgainButton"
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
    pPoints: state.takeCardReducer.pPoints,
    dPoints: state.takeCardReducer.dPoints
  };
}

export default connect(mapStateToProps)(Dealer);
