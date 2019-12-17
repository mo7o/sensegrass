import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: ""
};

class Signin extends React.Component {
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

  handleSubmit = (event, SigninUser) => {
    event.preventDefault();

    SigninUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column">
            <div className="box has-text-centered">
              <h1 className="title">Signin</h1>
              <Mutation
                mutation={SIGNIN_USER}
                variables={{ username, password }}
              >
                {(SigninUser, { data, loading, error }) => {
                  return (
                    <form
                      className="form"
                      onSubmit={event => this.handleSubmit(event, SigninUser)}
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
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
              <div class="notification is-white">
                <NavLink to="/signup">Don't have and account?</NavLink>
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
