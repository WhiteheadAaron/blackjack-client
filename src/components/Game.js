import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


export function Game(props) {
  return (
    <div className="gameBack">
      <div className="gameGrid">
        <div className="gameNav">
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
        </div>
        <div className="deckImgDiv">
              <img src={require('../images/deck.jpg')} alt="Deck of Cards" />
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = state => ({
  inGame: state.inGame
});

export default connect(mapStateToProps)(Game);
