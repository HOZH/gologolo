import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoggedInLink from "./LoggedInLink";
import LoggedOutLink from "./LoggedOutLink";

export default class NavBar extends Component {
  state = {
    isLoggin: window.localStorage.getItem("user"),
  };

  render() {
    let links = this.state.isLoggin ? <LoggedOutLink /> : <LoggedInLink />;

    return (
      <div className="bg-secondary container">
        <div className="row">
          <h4 className=" btn btn-secondary ">
            <Link
              className="text-white"
              to={
                window.localStorage.getItem("user")
                  ? "/" + JSON.parse(window.localStorage.getItem("user"))._id
                  : "/login"
              }
            >
              Home
            </Link>
          </h4>
          {links}
        </div>
      </div>
    );
  }
}
