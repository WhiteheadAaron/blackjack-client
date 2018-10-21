import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dealerCard,
  newGame,
  takeCard,
  inGame,
  gameOver
} from "../actions/actions";


export class Dealer extends Component {

  renderDealerCards = () => {
    let newArr = [];
    for (let i = 0; i < this.props.dealerCards.length; i++) {
      newArr.push(
        <div className={`dealerCard${i}`}>
          <img
            src={require(`../images/${this.props.dealerCards[i].src}.jpg`)}
            alt={`Dealer card number ${i + 1}`}
          />
        </div>
      );
    }
    return newArr;
  };

  renderPlayerCards = () => {
    let newArr = [];
    for (let i = 0; i < this.props.playerCards.length; i++) {
      newArr.push(
        <div className={`playerCard${i}`}>
          <img
            src={require(`../images/${this.props.playerCards[i].src}.jpg`)}
            alt={`Player card number ${i + 1}`}
          />
        </div>
      );
    }
    return newArr;
  };

  render() {
    const faceDown = require(`../images/deck.jpg`);
    const playerPointCount = () => {
      let total = 0;
      for (let i = 0; i < this.props.pPoints.length; i++) {
        total = total + this.props.pPoints[i];
      }
      return total;
    };

    const dealerPointCount = () => {
      let total = 0;
      for (let i = 0; i < this.props.dPoints.length; i++) {
        total = total + this.props.dPoints[i];
      }
      return total;
    };

    if (this.props.inGame === true && playerPointCount() <= 21) {
      return (
        <React.Fragment>
          <div className="dealerCard0">
            <img
              src={require(`../images/${this.props.dealerCards[0].src}.jpg`)}
              alt="Dealer's first card"
            />
          </div>
          <div className="dealerCard1">
            <img src={faceDown} alt="Dealer's second card" />
          </div>
        </React.Fragment>
      );
    }

    if (this.props.inGame === "results") {
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
                this.props.dispatch(newGame());
                let images = this.props.images;
                let card1 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(takeCard(card1));
                images = images.filter(item => item.src !== card1.src);
                let card2 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(takeCard(card2));
                images = images.filter(item => item.src !== card2.src);
                let card3 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(dealerCard(card3));
                this.props.dispatch(inGame(false));
              }}
            >
              New Game
            </button>
            <p className="dealerPoints">Dealer Points: {dealerP}</p>
            <p className="playerPoints">Player Points: {playerP}</p>
            {this.renderPlayerCards()}
            {this.renderDealerCards()}
          </React.Fragment>
        );
      }
      if (dealerPointCount() < playerPointCount() || dealerPointCount() > 21) {
        this.props.dispatch(gameOver("win"));
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
            {this.renderPlayerCards()}
            {this.renderDealerCards()}
            <button
              className="playAgainButton"
              onClick={() => {
                this.props.dispatch(newGame());
                let images = this.props.images;
                let card1 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(takeCard(card1));
                images = images.filter(item => item.src !== card1.src);
                let card2 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(takeCard(card2));
                images = images.filter(item => item.src !== card2.src);
                let card3 =
                  images[Number(Math.floor(Math.random() * images.length))];
                this.props.dispatch(dealerCard(card3));
                this.props.dispatch(inGame(false));
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
            {this.renderDealerCards()}
            {this.renderPlayerCards()}
            <button
              className="playAgainButton"
              onClick={() => {
                this.props.dispatch(newGame());
                let card1 = this.props.images[
                  Number(Math.floor(Math.random() * this.props.images.length))
                ];
                this.props.dispatch(takeCard(card1));
                let card2 = this.props.images[
                  Number(Math.floor(Math.random() * this.props.images.length))
                ];
                this.props.dispatch(takeCard(card2));
                let card3 = this.props.images[
                  Number(Math.floor(Math.random() * this.props.images.length))
                ];
                this.props.dispatch(dealerCard(card3));
                this.props.dispatch(inGame(true));
              }}
            >
              New Game
            </button>
          </React.Fragment>
        );
      }
    } else {
      return "";
    }
  }
}

function mapStateToProps(state) {
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    pPoints: state.takeCardReducer.pPoints,
    dPoints: state.takeCardReducer.dPoints,
    authToken: state.loginReducer.authToken,
    statId: state.statReducer.id,
    gameOver: state.inGameReducer.gameOver
  };
}

export default connect(mapStateToProps)(Dealer);
