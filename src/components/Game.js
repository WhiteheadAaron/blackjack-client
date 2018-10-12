import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function Game(props) {
  let deck = "deck";
  const card = require(`../images/${deck}.jpg`);
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <Link className="profile" to="/profile">
          <button
            className="profileButton"
            onClick={() => {
              console.log("Going to Profile");
            }}
          >
            My Profile
          </button>
        </Link>
        <Link className="signOut" to="/">
          <button
            className="signOutButton"
            onClick={() => {
              console.log("Signed Out");
            }}
          >
            Sign Out
          </button>
        </Link>

        <div className="dealerCard1">
          <img src={card} alt="Dealer's first card" />
        </div>
        <div className="dealerCard2">
          <img src={card} alt="Dealer's second card" />
        </div>
        <div className="deckImgDiv">
          <img src={card} alt="Deck of Cards" />
        </div>
        <button
          className="hitButton"
          onClick={() => {
            console.log("hit");
          }}
        >
          Hit
        </button>
        <button
          className="stayButton"
          onClick={() => {
            console.log("stay");
          }}
        >
          Stay
        </button>
        <div className="playerCard1">
          <img src={card} alt="Player's first card" />
        </div>
        <div className="playerCard2">
          <img src={card} alt="Player's second card" />
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  inGame: state.inGame
});

export default connect(mapStateToProps)(Game);
