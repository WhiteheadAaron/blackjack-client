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
  statLoss,
  statTie,
  bet
} from "../actions/actions";
import { resultAction } from "../actions/results";

export function Player(props) {
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

  const getNewCard = async (newArr, images) => {
    console.log(newArr, images);
    let pointTotal = newArr.reduce((sum, val) => sum + val, 0);
    console.log(pointTotal);
    let card;
    if (pointTotal < 17) {
      card = images[Math.floor(Math.random() * images.length)];
      props.dispatch(dealerCard(card));
      images = images.filter(item => item !== card.src);
      return {
        inputValue: [...newArr, card.value],
        images
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
        return {
          inputValue,
          images
        };
      }
      return {
        inputValue: newArr,
        images
      };
    }
    return {
      inputValue: newArr,
      images
    };
  };

  const dealerCardsFunction = async () => {
    const value = await dealerPointCount();
    let images = props.images;
    let newArr = [value];
    console.log(images);
    const value1 = await getNewCard(newArr, images);
    newArr = value1.inputValue;
    images = value1.images;
    console.log(images);
    const value2 = await getNewCard(newArr, images);
    newArr = value2.inputValue;
    images = value2.images;
    console.log(images);
    const value3 = await getNewCard(newArr, images);
    newArr = value3.inputValue;
    images = value3.images;
    const value4 = await getNewCard(newArr, images);
    newArr = value4.inputValue;
    images = value4.images;
    const value5 = await getNewCard(newArr, images);
    newArr = value5.inputValue;
    images = value5.images;
    const value6 = await getNewCard(newArr, images);
    newArr = value6.inputValue;
    images = value6.images;
    const value7 = await getNewCard(newArr, images);
    newArr = value7.inputValue;
    images = value7.images;
    const value8 = await getNewCard(newArr, images);
    newArr = value8.inputValue;
    images = value8.images;
    const value9 = await getNewCard(newArr, images);
    newArr = value9.inputValue;
    images = value9.images;
    const value10 = await getNewCard(newArr, images);
    return value10.inputValue.reduce((sum, val) => sum + val, 0);
  };

  const winning = async () => {
    props.dispatch(inGame("results"));
    props.dispatch(gameOver("win"));
    await props.dispatch(getStatsAction(props.authToken));
    let newPlayed = (await props.played) + 1;
    let newWins = (await props.wins) + 1;
    let newMoney = (await props.money) + (props.bet * 2);
    props.dispatch(
      resultAction(
        newPlayed,
        newWins,
        props.losses,
        props.ties,
        newMoney,
        props.netGain + props.bet,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statWin(props.bet));
    props.dispatch(getStatsAction(props.authToken));
  };

  const losing = async () => {
    props.dispatch(inGame("results"));
    props.dispatch(gameOver("loss"));
    await props.dispatch(getStatsAction(props.authToken));
    let newPlayed = (await props.played) + 1;
    let newLosses = (await props.losses) + 1;
    props.dispatch(
      resultAction(
        newPlayed,
        props.wins,
        newLosses,
        props.ties,
        props.money,
        props.netGain - props.bet,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statLoss(-props.bet));
    props.dispatch(getStatsAction(props.authToken));
  };

  const tying = async () => {
    props.dispatch(inGame("results"));
    props.dispatch(gameOver("tie"));
    await props.dispatch(getStatsAction(props.authToken));
    let newPlayed = (await props.played) + 1;
    let newTies = (await props.ties) + 1;
    props.dispatch(
      resultAction(
        newPlayed,
        props.wins,
        props.losses,
        newTies,
        props.authToken,
        props.statId
      )
    );
    props.dispatch(statTie());
    props.dispatch(getStatsAction(props.authToken));
  };
  const faceDown = require(`../images/deck.jpg`);

  if (props.inGame === false) {
    return (
      <React.Fragment>
        <form
          className="bettingForm"
          onSubmit={e => {
            e.preventDefault();
            props.dispatch(newGame());
            let images = props.images;
            let card1 =
              images[Number(Math.floor(Math.random() * images.length))];
            props.dispatch(takeCard(card1));
            images = images.filter(item => item.src !== card1.src);
            let card2 =
              images[Number(Math.floor(Math.random() * images.length))];
            props.dispatch(takeCard(card2));
            images = images.filter(item => item.src !== card2.src);
            let card3 =
              images[Number(Math.floor(Math.random() * images.length))];
            props.dispatch(dealerCard(card3));
            props.dispatch(inGame(true));
            props.dispatch(bet(Number(e.currentTarget.betNumber.value)));
          }}
        >
          <input type="number" name="betNumber" placeholder="Place Your Bet" min="1" max={props.money} />
          <button type="submit" className="betButton">
            Hello
          </button>
        </form>
      </React.Fragment>
    );
  }

  if (
    props.inGame === true &&
    playerPointCount() === 22 &&
    props.playerCards.length === 2
  ) {
    props.dispatch(removeAce([1, 11]));
  }

  if (props.inGame === true && playerPointCount() === 21) {
    const dScore = dealerCardsFunction();
    if (dScore === 21) {
      tying();
    }
    if (dScore !== 21) {
      winning();
    }
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
                let anArray = [...props.pPoints, card.value];
                let newArr = anArray.filter(item => item === 11);
                newArr[0] = 1;
                let newArr2 = anArray.filter(item => item !== 11);
                let newPlayerPoints = newArr2.concat(newArr);
                props.dispatch(removeAce(newPlayerPoints));
              }
              if (!props.pPoints.includes(11) && card.value !== 11) {
                dealerCardsFunction();
                losing();
              }
            }
            if (newValue === 21) {
              const dScore = dealerCardsFunction();
              if (dScore === 21) {
                tying();
              } else {
                winning();
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
              const dScore = await dealerCardsFunction();
              console.log(dScore);
              console.log(playerPointCount());
              if (dScore > playerPointCount() && dScore <= 21) {
                console.log(dScore, playerPointCount());
                losing();
              }
              if (
                dScore < playerPointCount() ||
                (dScore > 21 && playerPointCount() <= 21)
              ) {
                console.log(dScore, playerPointCount(), props.dPoints);
                winning();
              }
              if (dScore === playerPointCount()) {
                tying();
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
  return {
    images: state.takeCardReducer.images,
    playerCards: state.takeCardReducer.playerCards,
    inGame: state.takeCardReducer.inGame,
    dealerCards: state.takeCardReducer.dealerCards,
    pPoints: state.takeCardReducer.pPoints,
    money: state.statReducer.money,
    netGain: state.statReducer.netGain
  };
}

export default connect(mapStateToProps)(Player);
