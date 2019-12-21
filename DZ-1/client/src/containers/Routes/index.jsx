import { Route, Switch } from "react-router-dom";
import ValidationForm from "../../components/ValidationForm";
import Vote from "../../components/Vote";
import Postman from "../Postman";
import React from "react";

const Routes = () => (
  <Switch>
    <Route exact component={ValidationForm} path="/form" />
    <Route exact component={Vote} path="/vote" />
    <Route exact component={Postman} path="/postman" />
  </Switch>
);

export default Routes;
