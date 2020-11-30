import React, { Component } from "react";

import NavBar from "../navbar/NavBar";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    mode: "ok",
    fp: "",
    sent: false,
  };

  doChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.id]: target.value,
    }));
  };
  sendEmail = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users/email", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // credentials: 'omit', // include, *same-origin, omit
      headers: {
        // "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email: this.state.fp }),
    }).then((res) => {
      this.setState({ sent: true });
    });
  };
  doSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // credentials: 'omit', // include, *same-origin, omit
      headers: {
        // "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token === "false") {
          if (data.reason === "email") this.setState({ mode: "invalid-email" });
          else {
            this.setState({ mode: "invalid-password" });
          }
        } else {
          this.setState({ mode: "ok" });

          window.localStorage.setItem("token", JSON.stringify(data.token));
          window.localStorage.setItem("user", JSON.stringify(data.user));

          this.props.history.push("/" + data.user._id);

          fetch("http://localhost:3000/graphiql", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            // credentials: 'omit', // include, *same-origin, omit
            headers: {
              // "Access-Control-Allow-Origin":"*",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res)
            .then((data) => {});
        }
      });
  };

  render() {
    let { authError } = this.props;

    return (
      <div className="container">
        <div className="row">
          <NavBar />
          <form onSubmit={this.doSubmit} className="form-signin col-4">
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
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={this.doChange}
              />
            </div>
            <div className="input-field">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Login
              </button>
              {authError ? (
                <div className="red-text center">
                  <p>{authError}</p>
                </div>
              ) : null}
            </div>
            {this.state.mode === "ok" ? null : this.state.mode ===
              "invalid-email" ? (
              <p>email not found in the database</p>
            ) : (
              <p>wrong password</p>
            )}
          </form>
          <div className="col-2"></div>
          <form onSubmit={this.sendEmail} className="form-signin">
            <div className="input-field">
              <label htmlFor="fp">
                forget passwrod: put your email in below box
              </label>
              <input
                className="form-control"
                type="email"
                name="fp"
                id="fp"
                onChange={this.doChange}
              />
            </div>

            <div className="input-field">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Login
              </button>
              {authError ? (
                <div className="red-text center">
                  <p>{authError}</p>
                </div>
              ) : null}
            </div>
          </form>

          {this.state.sent ? (
            <p>
              {
                "password reset email has been sent, you can now close this window"
              }
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}
