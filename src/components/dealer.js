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
    let newArr = this.props.dealerCards.map((item, index) => {
      return (
        <div className={`dealerCard${index}`}>
          <img
            src={require(`../images/${this.props.dealerCards[index].src}.jpg`)}
            alt={`Dealer card number ${index + 1}`}
          />
        </div>
      );
    });
    return newArr;
  };

  renderPlayerCards = () => {
    let newArr = this.props.playerCards.map((item, index) => {
      return (
        <div className={`playerCard${index}`}>
          <img
            src={require(`../images/${this.props.playerCards[index].src}.jpg`)}
            alt={`Player card number ${index + 1}`}
          />
        </div>
      );
    });
    return newArr;
  };

  newGameFunction = () => {
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
  }

  render() {
    const faceDown = require(`../images/deck.jpg`);
    const playerPointCount = () => {
      let total = this.props.pPoints.reduce((sum, val) => sum + val, 0);
      return total;
    };

    const dealerPointCount = () => {
      let total = this.props.dPoints.reduce((sum, val) => sum + val, 0);
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
      console.log(this.props)
      if (this.props.gameOver === "loss") {
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
                this.newGameFunction();
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
      if (this.props.gameOver === 'win') {
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
                this.newGameFunction();
              }}
            >
              New Game
            </button>
          </React.Fragment>
        );
      }
      if (this.props.gameOver === 'tie') {
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
                this.newGameFunction();
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
