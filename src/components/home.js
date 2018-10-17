import React from "react";
import { connect } from "react-redux";
import Game from './Game';
import Login from './Login';

function Home(props) {
  console.log(props);
  if (props.user) {
    return (
        <Game />
    )
  }
  else {
      return (
      <Login />
      )
  }

}

function mapStateToProps(state) {
  console.log(state)
  return {
    user: state.loginReducer.user
  };
}

export default connect(mapStateToProps)(Home);