import React from "react";
import { connect } from "react-redux";
import { takeCard, inGame, dealerCard, newGame } from "../actions/actions";
import { Link } from "react-router-dom";

export function Player(props) {
  const faceDown = require(`../images/deck.jpg`);

  if (props.playerPoints > 21) {
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
    props.playerCards.length <= 2 &&
    props.playerPoints < 21
  ) {
    return (
      <React.Fragment>
        <Link className="profile" to="/profile">
          <button className="profileButton" onClick={() => {}}>
            My Profile
          </button>
        </Link>
        <Link className="signOut" to="/">
          <button className="signOutButton" onClick={() => {}}>
            Sign Out
          </button>
        </Link>

        <div className="deckImgDiv">
          <img src={faceDown} alt="Deck of Cards" />
        </div>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
          }}
        >
          Hit
        </button>
        <button className="stayButton" onClick={() => {
          props.dispatch(inGame('results'))
        }}>
          Stay
        </button>
        <div className="playerCard0">
          <img
            src={require(`../images/${props.playerCards[0].src}.jpg`)}
            alt="Player's first card"
          />
        </div>
        <div className="playerCard1">
          <img
            src={require(`../images/${props.playerCards[1].src}.jpg`)}
            alt="Player's second card"
          />
        </div>
      </React.Fragment>
    );
  }
  if (
    props.inGame === true &&
    props.playerCards.length === 3 &&
    props.playerPoints <= 21
  ) {
    return (
      <React.Fragment>
        <Link className="profile" to="/profile">
          <button className="profileButton" onClick={() => {}}>
            My Profile
          </button>
        </Link>
        <Link className="signOut" to="/">
          <button className="signOutButton" onClick={() => {}}>
            Sign Out
          </button>
        </Link>

        <div className="deckImgDiv">
          <img src={faceDown} alt="Deck of Cards" />
        </div>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
          }}
        >
          Hit
        </button>
        <button className="stayButton" onClick={() => {
          props.dispatch(inGame('results'))
        }}>
          Stay
        </button>
        <div className="playerCard0">
          <img
            src={require(`../images/${props.playerCards[0].src}.jpg`)}
            alt="Player's first card"
          />
        </div>
        <div className="playerCard1">
          <img
            src={require(`../images/${props.playerCards[1].src}.jpg`)}
            alt="Player's second card"
          />
        </div>
        <div className="playerCard2">
          <img
            src={require(`../images/${props.playerCards[2].src}.jpg`)}
            alt="Player's third card"
          />
        </div>
      </React.Fragment>
    );
  }
  if (
    props.inGame === true &&
    props.playerCards.length === 4 &&
    props.playerPoints <= 21
  ) {
    return (
      <React.Fragment>
        <Link className="profile" to="/profile">
          <button className="profileButton" onClick={() => {}}>
            My Profile
          </button>
        </Link>
        <Link className="signOut" to="/">
          <button className="signOutButton" onClick={() => {}}>
            Sign Out
          </button>
        </Link>

        <div className="deckImgDiv">
          <img src={faceDown} alt="Deck of Cards" />
        </div>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
          }}
        >
          Hit
        </button>
        <button className="stayButton" onClick={() => {
          props.dispatch(inGame('results'))
        }}>
          Stay
        </button>
        <div className="playerCard0">
          <img
            src={require(`../images/${props.playerCards[0].src}.jpg`)}
            alt="Player's first card"
          />
        </div>
        <div className="playerCard1">
          <img
            src={require(`../images/${props.playerCards[1].src}.jpg`)}
            alt="Player's second card"
          />
        </div>
        <div className="playerCard2">
          <img
            src={require(`../images/${props.playerCards[2].src}.jpg`)}
            alt="Player's third card"
          />
        </div>
        <div className="playerCard3">
          <img
            src={require(`../images/${props.playerCards[3].src}.jpg`)}
            alt="Player's fourth card"
          />
        </div>
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
    dealerPoints: state.takeCardReducer.dealerPoints,
    playerPoints: state.takeCardReducer.playerPoints
  };
}

export default connect(mapStateToProps)(Player);
