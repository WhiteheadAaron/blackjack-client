import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './components/login.css';
import './components/game.css';
import Login from './components/Login';
import Game from './components/Game';
import Profile from './components/Profile';
import { connect } from 'react-redux';


const AppRouter = (props) => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path='/game' component={Game} exact={true} />
        <Route path='/profile' component={Profile} exact={true} />
        <Route path='/' component={Login} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

function mapStateToProps(state) { return state; }

export default connect(mapStateToProps)(AppRouter);