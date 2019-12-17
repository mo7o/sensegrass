import React from "react";
import { NavLink } from "react-router-dom";
import Signout from "../Components/Auth/Signout";

const Navbar = ({ session }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <React.Fragment>
    <div className="navbar-brand">
      <NavLink className="navbar-item" to="/" exact>
        <img
          src="http://sensegrass.com/images/Sensegrass-Logo-1.png"
          width="30"
        />
      </NavLink>

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <div className="field navbar-item">
          <div className="control">
            <input
              className="input is-success is-rounded"
              type="text"
              placeholder="Ask SANA (Your personal Agronomist)"
              style={{ width: 400 }}
            />
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          Hi, {session.getCurrentUser.username}!
        </div>
        <NavLink to="/" exact className="navbar-item">
          Dashboard
        </NavLink>
        <NavLink to="/data" className="navbar-item">
          Data
        </NavLink>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Account</a>

          <div className="navbar-dropdown">
            <NavLink to="/settings" className="navbar-item">
              Settings
            </NavLink>
            <a className="navbar-item">
              <Signout />
            </a>
          </div>
        </div>

        <div className="navbar-item">
          <a className="button is-success is-rounded">+ Add Device</a>
        </div>
      </div>
    </div>
  </React.Fragment>
);

const NavbarUnAuth = () => (
  <div className="navbar-brand">
    <NavLink className="navbar-item" to="/" exact>
      <img
        src="http://sensegrass.com/images/Sensegrass-Logo-1.png"
        width="30"
      />
    </NavLink>

    <a
      role="button"
      className="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
);

export default Navbar;
