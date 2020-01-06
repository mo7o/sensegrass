import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";

import "./Auth.scss";

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

  // render() {
  //   const { username, password } = this.state;

  //   return (
  //     <div className="container">
  //       <div className="columns">
  //         <div className="column"></div>
  //         <div className="column">
  //           <div className="box has-text-centered">
  //             <h1 className="title">Signin</h1>
  //             <Mutation
  //               mutation={SIGNIN_USER}
  //               variables={{ username, password }}
  //             >
  //               {(SigninUser, { data, loading, error }) => {
  //                 return (
  //                   <form
  //                     className="form"
  //                     onSubmit={event => this.handleSubmit(event, SigninUser)}
  //                   >
  //                     <div class="field">
  //                       <div class="control">
  //                         <input
  //                           type="text"
  //                           name="username"
  //                           placeholder="Username"
  //                           value={username}
  //                           onChange={this.handleChange}
  //                           className="input is-success is-rounded"
  //                         />
  //                       </div>
  //                     </div>
  //                     <div class="field">
  //                       <div class="control">
  //                         <input
  //                           type="password"
  //                           name="password"
  //                           placeholder="Password"
  //                           value={password}
  //                           onChange={this.handleChange}
  //                           className="input is-success is-rounded"
  //                         />
  //                       </div>
  //                     </div>
  //                     <button
  //                       type="submit"
  //                       className="button is-success is-rounded"
  //                       disabled={loading || this.validateForm()}
  //                     >
  //                       Submit
  //                     </button>
  //                     {error && <p error={error}></p>}
  //                   </form>
  //                 );
  //               }}
  //             </Mutation>
  //             <div class="notification is-white">
  //               <NavLink to="/signup">Don't have an account?</NavLink>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="column"></div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const { username, password } = this.state;

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
          <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
            {(SigninUser, { data, loading, error }) => {
              return (
                <form
                  class="form"
                  onSubmit={event => this.handleSubmit(event, SigninUser)}
                >
                  <label for="name" class="field-label">
                    Username or Email ID
                  </label>
                  <input
                    type="text"
                    class="w-input-auth"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
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
                  {/* <a href="../app/dashboard.html" class="button w-button">
                Login
              </a> */}
                  <button
                    type="submit"
                    class="button-auth w-button"
                    disabled={loading || this.validateForm()}
                  >
                    Login
                  </button>
                  {error && <p error={error}></p>}
                </form>
              );
            }}
          </Mutation>
          <div class="notification is-white has-text-centered">
            <NavLink to="/signup">Don't have an account?</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
