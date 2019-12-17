import React from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";

const handleSignout = (client, history) => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push("/signin");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      console.log(client);

      return (
        <div onClick={() => handleSignout(client, history)}>Signout</div>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
