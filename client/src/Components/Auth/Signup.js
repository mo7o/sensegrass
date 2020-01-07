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
      this.props.history.push("/select-field");
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
      <div className="body-auth">
        <div class="form-block w-form">
          <div class="div-block">
            <div class="div-block-2">
              <img
                src={require("../../assets/images/Sensegrass-Logo-1.png")}
                width="87"
                alt=""
                class="image"
              />
            </div>
            <div class="div-block-3">
              <h1 class="heading">SenseGrass</h1>
            </div>
          </div>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ username, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <form
                  class="form"
                  onSubmit={event => this.handleSubmit(event, signupUser)}
                >
                  <label for="name" class="field-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="w-input-auth"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <label for="name" class="field-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    class="w-input-auth"
                  />
                  <label for="password" class="field-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="w-input-auth"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <label for="password" class="field-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                    class="w-input-auth"
                  />

                  <button
                    type="submit"
                    class="button-auth w-button"
                    disabled={loading || this.validateForm()}
                  >
                    Signup
                  </button>
                  {error && <p error={error}></p>}
                </form>
              );
            }}
          </Mutation>
          <div class="notification has-text-centered is-white">
            <NavLink to="/signin">Already have an account?</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
