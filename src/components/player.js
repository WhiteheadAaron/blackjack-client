import React from "react";
import { connect } from "react-redux";
import { takeCard, inGame } from "../actions/actions";
import { Link } from 'react-router-dom';

export function Player(props) {


  const card1 = props.images[Number(Math.floor(Math.random() * props.images.length))]
  
  const card2 = props.images[Number(Math.floor(Math.random() * props.images.length))]



  const faceDown = require(`../images/deck.jpg`);

  if (!props.inGame) {
    return (
      <button
        onClick={() => {
          props.dispatch(takeCard(card1))
          props.dispatch(takeCard(card2))
          props.dispatch(inGame(true))
        }}
      >
        Hello
      </button>
    )
  }

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
      <button className="hitButton" onClick={() => {}}>
        Hit
      </button>
      <button className="stayButton" onClick={() => {}}>
        Stay
      </button>
      <div className="playerCard1">
        <img
          src={require(`../images/${card1.src}.jpg`)}
          alt="Player's first card"
        />
      </div>
      <div className="playerCard2">
        <img
          src={require(`../images/${card2.src}.jpg`)}
          alt="Player's second card"
        />
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame
  };
}

export default connect(mapStateToProps)(Player);
