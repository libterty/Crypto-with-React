import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';
import './index.css';

render(
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>{' '}
      <Route exact path="/blocks">
        <Blocks />
      </Route>{' '}
      <Route exact path="/conduct-transaction">
        <ConductTransaction />
      </Route>{' '}
      <Route exact path="/transaction-pool">
        <TransactionPool />
      </Route>{' '}
    </Switch>{' '}
  </Router>,
  document.getElementById('root')
);
