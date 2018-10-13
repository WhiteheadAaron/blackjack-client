import React from "react";
import { connect } from "react-redux";
import { takeCard } from "../actions/actions";

export function Profile(props) {
  console.log(props);
  return (
    <div className="App">
      <h1>My Profile</h1>
      <button
        onClick={() => {
          props.dispatch(takeCard({ src: "jackspades", value: 10 }));
        }}
      >
        Hello
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    playerCards: state.inGameReducer.playerCards
  };
}

export default connect(mapStateToProps)(Profile);
