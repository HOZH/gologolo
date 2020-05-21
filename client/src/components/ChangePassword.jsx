
import React, { Component } from "react";

export default class ChangePassword extends Component {
  state = {
    email: this.props.match.params.id,
    token: this.props.match.params.token,
    text: null,
    changed: false,
  };

  doChange = (e) => {
    const { target } = e;

    this.setState((state) => ({
      ...state,
      [target.id]: target.value,
    }));
  };

  doSubmit = (e) => {
    e.preventDefault();
    // console.log(123);

    fetch("http://localhost:3000/users/change_password", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // credentials: 'omit', // include, *same-origin, omit
      headers: {
        // "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ changed: true });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.doSubmit} className="form-signin">
            <div className="input-field">
              <label htmlFor="email">New Password:</label>
              <input
                className="form-control"
                required="required"
                type="password"
                name="text"
                id="text"
                onChange={this.doChange}
              />
            </div>

            <div className="input-field">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                submit
              </button>
            </div>
          </form>
          <p>
            {this.state.changed
              ? "password has been update, you can now close this page"
              : null}
          </p>
        </div>
      </div>
    );
  }
}
