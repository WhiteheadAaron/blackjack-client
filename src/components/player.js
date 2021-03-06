import React from "react";
import { connect } from "react-redux";
import {
  takeCard,
  inGame,
  help,
  dealerCard,
  newGame,
  gameOver,
  removeAce,
  removeDealerAce,
  getStatsAction,
  statWin,
  statLoss,
  statTie,
  bet,
  bankrupt
} from "../actions/actions";
import { resultAction } from "../actions/results";

export function Player(props) {
  function playerPointCount() {
    let total = props.pPoints.reduce((val, sum) => sum + val, 0);
    return total;
  }

  const dealerPointCount = () => {
    let total = props.dPoints.reduce((val, sum) => sum + val, 0);
    return total;
  };

  const getNewCard = async (newArr, images) => {
    let pointTotal = newArr.reduce((sum, val) => sum + val, 0);
    let card;
    if (pointTotal < 17 && newArr.length < 6) {
      card = images[Math.floor(Math.random() * images.length)];
      props.dispatch(dealerCard(card));
      let newImages = images.filter(item => item.src !== card.src);
      return {
        inputValue: [...newArr, card.value],
        newImages
      };
    }
    if (pointTotal > 21) {
      if (newArr.includes(11)) {
        let anArray = newArr;
        let newArr2 = anArray.filter(item => item === 11);
        newArr2[0] = 1;
        let newArr3 = anArray.filter(item => item !== 11);
        let inputValue = newArr3.concat(newArr2);
        props.dispatch(removeDealerAce(inputValue));
        let newImages = images;
        return {
          inputValue,
          newImages
        };
      }
      let newImages = images;
      return {
        inputValue: newArr,
        newImages
      };
    }
    return {
      inputValue: newArr,
      newImages: images
    };
  };

  const dealerCardsFunction = async (input, lastCard) => {
    const value = await input;
    let images = props.images.filter(item => item.src !== lastCard.src);
    let newArr = [value];
    const value1 = await getNewCard(newArr, images);
    newArr = value1.inputValue;
    images = value1.newImages;
    const value2 = await getNewCard(newArr, images);
    newArr = value2.inputValue;
    images = value2.newImages;
    const value3 = await getNewCard(newArr, images);
    newArr = value3.inputValue;
    images = value3.newImages;
    const value4 = await getNewCard(newArr, images);
    newArr = value4.inputValue;
    images = value4.newImages;
    const value5 = await getNewCard(newArr, images);
    newArr = value5.inputValue;
    images = value5.newImages;
    const value6 = await getNewCard(newArr, images);
    newArr = value6.inputValue;
    images = value6.newImages;
    const value7 = await getNewCard(newArr, images);
    newArr = value7.inputValue;
    images = value7.newImages;
    const value8 = await getNewCard(newArr, images);
    newArr = value8.inputValue;
    images = value8.newImages;
    const value9 = await getNewCard(newArr, images);
    newArr = value9.inputValue;
    images = value9.newImages;
    const value10 = await getNewCard(newArr, images);
    return value10.inputValue.reduce((sum, val) => sum + val, 0);
  };

  const winning = async () => {
    props.dispatch(gameOver("win"));
    let newPlayed = props.played + 1;
    let newWins = props.wins + 1;
    let newMoney = props.money + props.bet * 2;
    let hello = await props.dispatch(
      resultAction(
        newPlayed,
        newWins,
        props.losses,
        props.ties,
        newMoney,
        props.netGain + props.bet,
        props.bankruptcies,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statWin(props.bet * 2));
    props.dispatch(inGame("results"));
    return {
      hello,
      authToken: props.authToken
    };
  };

  const losing = async () => {
    props.dispatch(gameOver("loss"));
    let newPlayed = props.played + 1;
    let newLosses = props.losses + 1;
    let hello = await props.dispatch(
      resultAction(
        newPlayed,
        props.wins,
        newLosses,
        props.ties,
        props.money,
        props.netGain - props.bet,
        props.bankruptcies,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statLoss(-props.bet));
    props.dispatch(inGame("results"));
    return {
      hello,
      authToken: props.authToken
    };
  };

  const tying = async () => {
    props.dispatch(gameOver("tie"));
    let newPlayed = props.played + 1;
    let newTies = props.ties + 1;
    let newMoney = props.money + props.bet;
    let hello = await props.dispatch(
      resultAction(
        newPlayed,
        props.wins,
        props.losses,
        newTies,
        newMoney,
        props.netGain,
        props.bankruptcies,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statTie(props.bet));
    props.dispatch(inGame("results"));
    return {
      hello,
      authToken: props.authToken
    };
  };
  const faceDown = require(`../images/deck.jpg`);

  const getStatsPostGame = async func => {
    let myAuth = await func()
    props.dispatch(getStatsAction(myAuth.authToken));
  };
  if (props.inGame === false && props.help === true) {
    return (
      <div className="helpScreen">
        <div className="helpInfo">
          <header role="banner">Blackjack</header>
          <ul className="rules">
            <li>
              You start with two cards and a point total. You decide if you want
              to gamble and take another card, or stick with what you have. You
              and the dealer are limited to a maximum of 6 cards.
            </li>
            <li>
              The game is over once you either stay, have 21 points, or go over
              21 points. If you have more than the dealer, but less than 21, you
              win.
            </li>
            <li>
              Every card is worth the same value as the number on the card,
              except for aces and face cards. Aces are worth either 1 or 11,
              whichever benefits you more. Jacks, Queens and Kings are worth 10
              points each.
            </li>
            <li>Lastly, all bets are 1 for 1.</li>
          </ul>
          <button
            className="helpButton"
            onClick={() => {
              props.dispatch(help(false));
            }}
          >
            Ready
          </button>
        </div>
      </div>
    );
  }

  if (props.inGame === false && props.help === false && props.money === 0) {
    return (
      <div className="bankruptDiv">
        <p className="bankruptInfo">
          Uh Oh! It looks like you ran out of money. Click below to get some
          more!
        </p>
        <button
          className="bankruptButton"
          onClick={() => {
            props.dispatch(
              resultAction(
                props.played,
                props.wins,
                props.losses,
                props.ties,
                100,
                props.netGain,
                props.bankruptcies + 1,
                props.authToken,
                props.statId
              )
            );
            props.dispatch(bankrupt());
          }}
        >
          Get Money!
        </button>
      </div>
    );
  }

  if (props.inGame === false && props.help === false) {
    return (
      <form
        className="bettingForm"
        onSubmit={e => {
          e.preventDefault();
          props.dispatch(newGame());
          let images = props.images;
          let card1 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(takeCard(card1));
          images = images.filter(item => item.src !== card1.src);
          let card2 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(takeCard(card2));
          images = images.filter(item => item.src !== card2.src);
          props.dispatch(bet(Number(e.currentTarget.betNumber.value)));
          let card3 = images[Number(Math.floor(Math.random() * images.length))];
          props.dispatch(dealerCard(card3));
          props.dispatch(inGame(true));
        }}
      >
        <label className="betLabel">How much would you like to bet?</label>
        <input
          className="betInput"
          type="number"
          name="betNumber"
          placeholder="Place Bet Here"
          min="1"
          max={props.money}
          required
        />
        <button type="submit" className="betButton">
          Let's Play!
        </button>
        <button
          className="showHelp"
          onClick={() => {
            props.dispatch(help(true));
          }}
        >
          Help
        </button>
      </form>
    );
  }

  if (
    props.inGame === true &&
    playerPointCount() === 22 &&
    props.playerCards.length === 2
  ) {
    props.dispatch(removeAce([1, 11]));
  }

  if (props.inGame === true && playerPointCount() <= 21) {
    const renderPlayerCards = () => {
      let newArr = props.playerCards.map((item, index) => {
        return (
          <div key={index} className={`playerCard${index}`}>
            <img
              src={require(`../images/${props.playerCards[index].src}.jpg`)}
              alt={`Player card number ${index + 1}`}
            />
          </div>
        );
      });
      return newArr;
    };
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
            if (props.pPoints.length === 5 && newValue <= 21) {
              const getTheScore = async () => {
                const dScore = await dealerCardsFunction(
                  dealerPointCount(),
                  card
                );
                if (dScore === newValue) {
                  getStatsPostGame(tying);
                }
                if (newValue > dScore || dScore > 21) {
                  getStatsPostGame(winning);
                }
                if (newValue < dScore) {
                  getStatsPostGame(losing);
                }
              };
              getTheScore();
            }

            if (newValue > 21) {
              if (props.pPoints.includes(11) || card.value === 11) {
                let anArray = [...props.pPoints, card.value];
                let newArr = anArray.filter(item => item === 11);
                newArr[0] = 1;
                let newArr2 = anArray.filter(item => item !== 11);
                let newPlayerPoints = newArr2.concat(newArr);
                props.dispatch(removeAce(newPlayerPoints));
              }
              if (!props.pPoints.includes(11) && card.value !== 11) {
                dealerCardsFunction(dealerPointCount(), card);
                getStatsPostGame(losing);
              }
            }
            if (newValue === 21) {
              const getTheScore = async () => {
                const dScore = await dealerCardsFunction(
                  dealerPointCount(),
                  card
                );
                if (dScore === 21) {
                  getStatsPostGame(tying);
                } else {
                  getStatsPostGame(winning);
                }
              };
              getTheScore();
            }
          }}
        >
          Hit
        </button>
        <button
          className="stayButton"
          onClick={() => {
            const myFunction = async () => {
              const dScore = await dealerCardsFunction(dealerPointCount(), {
                src: null
              });
              if (dScore > playerPointCount() && dScore <= 21) {
                getStatsPostGame(losing);
              }
              if (
                dScore < playerPointCount() ||
                (dScore > 21 && playerPointCount() <= 21)
              ) {
                getStatsPostGame(winning);
              }
              if (dScore === playerPointCount()) {
                getStatsPostGame(tying);
              }
            };
            myFunction();
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
  return state;
}

export default connect(mapStateToProps)(Player);
