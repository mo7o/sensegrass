import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from "./Components/App";
import withSession from "./Components/withSession";
import Navbar from "./Components/Navbar";
import store from "./store";

import "./assets/style/default.scss";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  // uri: "http://app.sensegrass.com:8080/graphql",

  //   to send token to backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);

      //   if (networkError.statusCode === 401)
    }
  }
});

const Root = observer(({ refetch, session }) => (
  <Router>
    <Provider {...store}>
      <Fragment>
        <Navbar session={session} />
        <App refetch={refetch} session={session} />
      </Fragment>
    </Provider>
  </Router>
));

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
