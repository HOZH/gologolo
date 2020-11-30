import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import Banner from "../Banner";
import NavBar from "../navbar/NavBar";

export default class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mode: true,
  };

  doChange = (event) => {
    let { target } = event;
    this.setState((state) => ({
      ...state,
      [target.id]: target.value,
    }));
  };

  doSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    fetch("http://localhost:3000/users/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token == "false") {
          this.setState({ mode: false });
        } else {
          this.setState({ mode: true });
          window.localStorage.setItem("token", " " + data.token.token + " ");
          window.localStorage.setItem("user", JSON.stringify(data.user));
          this.props.history.push("/" + data.user._id);
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <NavBar />
          <form onSubmit={this.doSubmit} className="form-signin">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={this.doChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                required="required"
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={this.doChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                id="firstName"
                onChange={this.doChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                onChange={this.doChange}
              />
            </div>
            <br />
            <div className="input-field">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign Up
              </button>
              {this.state.mode ? null : (
                <div className="red-text center">
                  <p>dup email found in the database</p>
                </div>
              )}
            </div>
          </form>
          <div className="col s8">
            <br />
            <Banner />
          </div>
        </div>
      </div>
    );
  }
}
