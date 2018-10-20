import React from "react";
import { connect } from "react-redux";
import {
  takeCard,
  inGame,
  dealerCard,
  newGame,
  gameOver,
  removeAce,
  removeDealerAce,
  getStatsAction,
  statWin,
  statLoss
} from "../actions/actions";
import { statAction } from "../actions/register";
import { resultAction } from "../actions/results";

export function Player(props) {
  const checkCards = () => {
    let dealerValue = 0;
    let card;
    let card2;
    let card3;
    let card4;
    let images = props.images;
    if (dealerPointCount() < 17) {
      console.log(dealerPointCount());
      card = images[Number(Math.floor(Math.random() * images.length))];
      props.dispatch(dealerCard(card));
      dealerValue = card.value;
      images = images.filter(item => item.src !== card.src);
      if (dealerPointCount() + dealerValue < 17) {
        card2 = images[Number(Math.floor(Math.random() * images.length))];
        props.dispatch(dealerCard(card2));
        dealerValue = dealerValue + card2.value;
        images = images.filter(item => item.src !== card2.src);
        if (dealerPointCount() + dealerValue < 17) {
          card3 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(dealerCard(card3));
          dealerValue = dealerValue + card3.value;
          images = images.filter(item => item.src !== card3.src);
          if (dealerPointCount() + dealerValue < 17) {
            card4 = images[Number(Math.floor(Math.random() * images.length))];
            props.dispatch(dealerCard(card4));
            images = images.filter(item => item.src !== card4.src);
            dealerValue = dealerValue + card4.value
          }

          if (dealerPointCount() + dealerValue > 21) {
            if (props.dPoints.includes(11) || card3.value === 11) {
              props.dispatch(removeDealerAce());
            }
          }
        }
        if (dealerPointCount() + dealerValue > 21) {
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
      return [dealerPointCount(), dealerValue];
    }
    if (dealerPointCount() > 21) {
      if (props.dPoints.includes(11) || dealerValue === 11) {
        props.dispatch(removeDealerAce());
      }
    }
  };
  const winning = () => {
    console.log("win");
    props.dispatch(inGame("results"));
    props.dispatch(gameOver("win"));
    props.dispatch(getStatsAction(props.authToken));
    let newPlayed = props.played + 1;
    let newWins = props.wins + 1;
    props.dispatch(
      resultAction(
        newPlayed,
        newWins,
        props.losses,
        props.user.id,
        props.user.username,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statWin());
  };

  const losing = () => {
    console.log("loss");
    props.dispatch(inGame("results"));
    props.dispatch(gameOver("loss"));
    props.dispatch(getStatsAction(props.authToken));
    let newPlayed = props.played + 1;
    let newLosses = props.losses + 1;
    props.dispatch(
      resultAction(
        newPlayed,
        props.wins,
        newLosses,
        props.user.id,
        props.user.username,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statLoss());
  };
  const faceDown = require(`../images/deck.jpg`);
  console.log(playerPointCount());

  function playerPointCount() {
    let total = 0;
    for (let i = 0; i < props.pPoints.length; i++) {
      total = total + props.pPoints[i];
    }
    return total;
  }

  const dealerPointCount = () => {
    let total = 0;
    for (let i = 0; i < props.dPoints.length; i++) {
      total = total + props.dPoints[i];
    }
    return total;
  };

  if (props.inGame === false) {
    return (
      <button
        onClick={() => {
          props.dispatch(newGame());
          let images = props.images;
          let card1 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(takeCard(card1));
          images = images.filter(item => item.src !== card1.src);
          let card2 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(takeCard(card2));
          images = images.filter(item => item.src !== card2.src);
          let card3 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(dealerCard(card3));
          props.dispatch(inGame(true));
        }}
      >
        Hello
      </button>
    );
  }

  if (props.inGame === true && playerPointCount() === 22) {
    props.dispatch(removeAce());
  }

  if (props.inGame === true && playerPointCount() === 21) {
    props.dispatch(inGame("results"));
  }

  if (props.inGame === true && playerPointCount() <= 21) {
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
    return (
      <React.Fragment>
        <div className="deckImgDiv">
          <img src={faceDown} alt="Deck of Cards" />
        </div>
        <p className="playerPointCount">
          Your Current Points: {playerPointCount()}
        </p>
        <button
          className="hitButton"
          onClick={() => {
            let card =
              props.images[
                Number(Math.floor(Math.random() * props.images.length))
              ];
            props.dispatch(takeCard(card));
            let newValue = playerPointCount() + card.value;

            if (newValue > 21) {
              if (props.pPoints.includes(11) || card.value === 11) {
                props.dispatch(removeAce());
              }
              if (!props.pPoints.includes(11) && card.value !== 11) {
                checkCards();
                losing();
              }
            }
          }}
        >
          Hit
        </button>
        <button
          className="stayButton"
          onClick={() => {
            const myFunction = async () => {
              const myScore = await checkCards();
              const dScore = myScore.reduce((sum, val) => sum + val, 0)
              if (
                dScore > playerPointCount() &&
                dScore <= 21
              ) {
                console.log(dScore, playerPointCount());
                losing();
              }
              if (
                dScore < playerPointCount() ||
                (dScore > 21 && playerPointCount() <= 21)
              ) {
                console.log(
                  dScore,
                  playerPointCount(),
                  props.dPoints
                );
                winning();
              }
            }
            myFunction()
            // return Promise.all([checkCards()]).then((value) => {
            //   console.log(props.dPoints)
            //   if (
            //     dealerPointCount() > playerPointCount() &&
            //     value <= 21
            //   ) {
            //     console.log(value, playerPointCount());
            //     losing();
            //   }
            //   if (
            //     value < playerPointCount() ||
            //     (value > 21 && playerPointCount() <= 21)
            //   ) {
            //     console.log(
            //       value,
            //       playerPointCount(),
            //       props.dPoints
            //     );
            //     winning();
            //   }
            // });
          }}
        >
          Stay
        </button>
        {renderPlayerCards()}
      </React.Fragment>
    );
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
    pPoints: state.takeCardReducer.pPoints
  };
}

export default connect(mapStateToProps)(Player);
