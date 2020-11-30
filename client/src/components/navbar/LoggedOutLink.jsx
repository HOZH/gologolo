import React from "react";
import { NavLink } from "react-router-dom";
// import {logoutHandler} from '../../store/database/asynchHandler'

export default class LoggedInLinks extends React.Component {
  // As in SignIn.jsx we need to use a function that gets as an argument firebase object
  logout = () => {
    window.localStorage.clear();
  };

  render() {
    // const {profile, auth} = this.props;
    return (
      <ul style={{ listStyle: "none", display: "inline" }}>
        <li style={{ display: "inline" }}>
          <NavLink className="btn btn-secondary" to="/" onClick={this.logout}>
            Log Out
          </NavLink>
        </li>
        {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}
      </ul>
    );
  }
}
