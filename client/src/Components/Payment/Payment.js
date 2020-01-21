import React from "react";
import { withRouter } from "react-router-dom";

class Payment extends React.Component {
  render() {
    return (
      <div className="has-text-centered" style={{ marginTop: "20%" }}>
        <h1>Payment Gateway</h1>
        <button
          className="button is-success"
          onClick={this.props.history.goBack}
        >
          Go Back
        </button>
      </div>
    );
  }
}

export default withRouter(Payment);
