import React from "react";
import "bulma/css/bulma.css";

import { Query } from "react-apollo";
import { GET_ALL_LANDS } from "../queries";

function App() {
  return (
    <div className="container has-text-centered">
      {/* <h1 className="title">Home</h1> */}
      <Query query={GET_ALL_LANDS}>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div>
                <button class="button is-white is-loading">Loading</button>
              </div>
            );
          if (error) return <div>Error..</div>;
          console.log(data);

          return (
            <div className="columns" style={{ marginTop: 40 }}>
              <div className="column">
                <div className="hero is-success is-large">
                  <div class="hero-body">
                    <div class="container">
                      <h1 class="title">Field Insights</h1>
                      <h2 class="subtitle">Field Details</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="box">
                  <iframe
                    width="600"
                    height="600"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=santiago&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                  ></iframe>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
