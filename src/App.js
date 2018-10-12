import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './components/login.css';
import Login from './components/Login';
import Game from './components/Game';
import Profile from './components/Profile';


const AppRouter = () => (
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

export default AppRouter;
