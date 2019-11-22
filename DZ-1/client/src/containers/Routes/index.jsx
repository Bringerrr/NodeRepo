import { Route, Switch } from 'react-router-dom';
import ValidationForm from '../../components/ValidationForm';
import Vote from '../../components/Vote';
import React from 'react';

const Routes = () => (
  <Switch>
    <Route exact component={ValidationForm} path="/form" />
    <Route exact component={Vote} path="/vote" />
  </Switch>
);

export default Routes;
