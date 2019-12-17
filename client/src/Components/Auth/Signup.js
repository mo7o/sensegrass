import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends React.Component {
  state = {
    ...initialState
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();

    signupUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column">
            <div className="box has-text-centered">
              <h1 className="title">Signup</h1>
              <Mutation
                mutation={SIGNUP_USER}
                variables={{ username, email, password }}
              >
                {(signupUser, { data, loading, error }) => {
                  return (
                    <form
                      className="form"
                      onSubmit={event => this.handleSubmit(event, signupUser)}
                    >
                      <div class="field">
                        <div class="control">
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={this.handleChange}
                            className="input is-success is-rounded"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                            className="input is-success is-rounded"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                            className="input is-success is-rounded"
                          />
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            value={passwordConfirmation}
                            onChange={this.handleChange}
                            className="input is-success is-rounded"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="button is-success is-rounded"
                        disabled={loading || this.validateForm()}
                      >
                        Submit
                      </button>
                      {error && <p error={error}></p>}
                    </form>
                  );
                }}
              </Mutation>

              <div class="notification  is-white">
                <NavLink to="/signin">Already have an account?</NavLink>
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
