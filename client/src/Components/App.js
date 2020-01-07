import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Data from "./Data/Data";
import Map from "./Map/Map";
import SelectField from "./SelectField/SelectField";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

import "bulma/css/bulma.css";
import "./App.scss";
 
function App({ refetch, session }) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/data" component={Data} />
        <Route path="/map" component={Map} />
        <Route
          path="/select-field"
          render={() => <SelectField session={session} />}
        />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default inject("mapStore")(withRouter(observer(App)));
