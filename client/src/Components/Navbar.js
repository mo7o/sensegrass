import React from "react";
import { NavLink } from "react-router-dom";
import Signout from "../Components/Auth/Signout";

import "./Navbar.scss";

const Navbar = ({ session }) => (
  <React.Fragment>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : null}
  </React.Fragment>
);

class NavbarAuth extends React.Component {
  state = {
    showMenu: false
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/" exact>
            <img
              src="http://sensegrass.com/images/Sensegrass-Logo-1.png"
              width="30"
              alt=""
            />
          </NavLink>

          <span
            role="button"
            className={
              this.state.showMenu
                ? "navbar-burger burger is-active"
                : "navbar-burger burger"
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div
          className={
            this.state.showMenu ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          <div className="navbar-start">
            <div className="field navbar-item">
              <input
                className="input text-field w-input"
                type="text"
                placeholder="Ask SANA (Your personal Agronomist)"
              />
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <span style={{ color: "rgb(20, 194, 58)" }}>
                Hi, {this.props.session.getCurrentUser.username}!
              </span>
            </div>
            <NavLink to="/" exact className="navbar-item">
              Dashboard
            </NavLink>
            <NavLink to="/data" className="navbar-item">
              Data
            </NavLink>

            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">Account</span>

              <div className="navbar-dropdown">
                <NavLink to="/settings" className="navbar-item">
                  Settings
                </NavLink>
                <span className="navbar-item">
                  <Signout />
                </span>
              </div>
            </div>
            <div className="navbar-item">
              <span className="add-device">+ Add Device</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
