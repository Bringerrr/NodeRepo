import { Route, Switch } from "react-router-dom";
import ValidationForm from "../../components/ValidationForm";
import Vote from "../../components/Vote";
import Postman from "../Postman";
import SQL from "../SQL";
import FormUpload from "../../components/FormUpload";
import React from "react";

const Routes = () => (
  <Switch>
    <Route exact component={ValidationForm} path="/form" />
    <Route exact component={FormUpload} path="/upload-file" />
    <Route exact component={Vote} path="/vote" />
    <Route exact component={Postman} path="/postman" />
    <Route exact component={SQL} path="/sql" />
  </Switch>
);

export default Routes;
