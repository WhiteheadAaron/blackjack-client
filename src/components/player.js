import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { takeCard } from '../actions/actions';

export function Player(props) {
  let images = [
    {
      value: 11,
      src: "acespades"
    },
    {
      value: 2,
      src: "twospades"
    },
    {
      value: 3,
      src: "threespades"
    },
    {
      value: 4,
      src: "fourspades"
    },
    {
      value: 5,
      src: "fivespades"
    },
    {
      value: 6,
      src: "sixspades"
    },
    {
      value: 7,
      src: "sevenspades"
    },
    {
      value: 8,
      src: "eightspades"
    },
    {
      value: 9,
      src: "ninespades"
    },
    {
      value: 10,
      src: "tenspades"
    },
    {
      value: 10,
      src: "jackspades"
    },
    {
      value: 10,
      src: "queenspades"
    },
    {
      value: 10,
      src: "kingspades"
    },
    {
      value: 11,
      src: "acediamonds"
    },
    {
      value: 2,
      src: "twodiamonds"
    },
    {
      value: 3,
      src: "threediamonds"
    },
    {
      value: 4,
      src: "fourdiamonds"
    },
    {
      value: 5,
      src: "fivediamonds"
    },
    {
      value: 6,
      src: "sixdiamonds"
    },
    {
      value: 7,
      src: "sevendiamonds"
    },
    {
      value: 8,
      src: "eightdiamonds"
    },
    {
      value: 9,
      src: "ninediamonds"
    },
    {
      value: 10,
      src: "tendiamonds"
    },
    {
      value: 10,
      src: "jackdiamonds"
    },
    {
      value: 10,
      src: "queendiamonds"
    },
    {
      value: 10,
      src: "kingdiamonds"
    },
    {
      value: 11,
      src: "acehearts"
    },
    {
      value: 2,
      src: "twohearts"
    },
    {
      value: 3,
      src: "threehearts"
    },
    {
      value: 4,
      src: "fourhearts"
    },
    {
      value: 5,
      src: "fivehearts"
    },
    {
      value: 6,
      src: "sixhearts"
    },
    {
      value: 7,
      src: "sevenhearts"
    },
    {
      value: 8,
      src: "eighthearts"
    },
    {
      value: 9,
      src: "ninehearts"
    },
    {
      value: 10,
      src: "tenhearts"
    },
    {
      value: 10,
      src: "jackhearts"
    },
    {
      value: 10,
      src: "queenhearts"
    },
    {
      value: 10,
      src: "kinghearts"
    },
    {
      value: 11,
      src: "aceclubs"
    },
    {
      value: 2,
      src: "twoclubs"
    },
    {
      value: 3,
      src: "threeclubs"
    },
    {
      value: 4,
      src: "fourclubs"
    },
    {
      value: 5,
      src: "fiveclubs"
    },
    {
      value: 6,
      src: "sixclubs"
    },
    {
      value: 7,
      src: "sevenclubs"
    },
    {
      value: 8,
      src: "eightclubs"
    },
    {
      value: 9,
      src: "nineclubs"
    },
    {
      value: 10,
      src: "tenclubs"
    },
    {
      value: 10,
      src: "jackclubs"
    },
    {
      value: 10,
      src: "queenclubs"
    },
    {
      value: 10,
      src: "kingclubs"
    }
  ];


  let playerCards = [];



  const playerPoints = function() {
    let points = 0;
    for (let i = 0; i < playerCards.length; i++) {
      points = points + playerCards[i].value;
    }
  };

  const getCardPlayer = function() {
    let myCardNum = Number(Math.floor(Math.random() * images.length));
    let myCard = images[myCardNum];
    // props.dispatch(takeCard(myCard))
    playerCards.push(images[myCardNum]);
    images = images.filter(item => item.src !== myCard);
    playerPoints();
    return myCard.src;
  };

  const faceDown = require(`../images/deck.jpg`);
  return (
    <React.Fragment>
      <Link className="profile" to="/profile">
        <button
          className="profileButton"
          onClick={() => {
          }}
        >
          My Profile
        </button>
      </Link>
      <Link className="signOut" to="/">
        <button
          className="signOutButton"
          onClick={() => {
          }}
        >
          Sign Out
        </button>
      </Link>
     

      <div className="deckImgDiv">
        <img src={faceDown} alt="Deck of Cards" />
      </div>
      <button
        className="hitButton"
        onClick={() => {
        }}
      >
        Hit
      </button>
      <button
        className="stayButton"
        onClick={() => {
        }}
      >
        Stay
      </button>
      <div className="playerCard1">
        <img
          src={require(`../images/${getCardPlayer()}.jpg`)}
          alt="Player's first card"
        />
      </div>
      <div className="playerCard2">
        <img
          src={require(`../images/${getCardPlayer()}.jpg`)}
          alt="Player's second card"
        />
      </div>
    </React.Fragment>
  );
}

export const mapStateToProps = state => ({
  images: state.images,
  playerCards: state.playerCards
});

export default connect(mapStateToProps)(Player);
