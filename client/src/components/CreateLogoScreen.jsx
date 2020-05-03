import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $fontSize: Int!
    $backgroundColor: String!
    $borderColor: String!
    $borderThickness: Int!
    $borderRadius: Int!
    $margin: Int!
    $padding: Int!
  ) {
    addLogo(
      text: $text
      color: $color
      fontSize: $fontSize
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderThickness: $borderThickness
      borderRadius: $borderRadius
      margin: $margin
      padding: $padding
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
  state = {
    text: null,
    color: null,
    fontSize: null,
    borderThickness: null,
    borderColor: null,
    borderRadius: null,
    padding: null,
    margin: null,
    backgroundColor: null,
  };

  handler = (event) => {
    // console.log(
    //   "handle" + event.target.name + "Change to " + event.target.value
    // );
    this.setState({ [event.target.name]: event.target.value });

    // console.log(123);
  };

  render() {
    let text,
      color,
      fontSize,
      backgroundColor,
      borderColor,
      borderThickness,
      borderRadius,
      margin,
      padding;
    return (
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addLogo, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="bg-secondary row">
                  <h4 className=" btn btn-secondary">
                    <Link className="text-white" to="/">
                      Home
                    </Link>
                  </h4>
                </div>
                <h4 className="panel-title bg-danger text-white row">
                  &nbsp;&nbsp;Create Logo
                </h4>{" "}
              </div>
              <div className="panel-body row">
                <div className="col-sm-4`">
                  <form
                    // className="col-sm-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addLogo({
                        variables: {
                          text: text.value,
                          color: color.value,
                          fontSize: parseInt(fontSize.value),
                          backgroundColor: backgroundColor.value,
                          borderColor: borderColor.value,
                          borderThickness: parseInt(borderThickness.value),
                          borderRadius: parseInt(borderRadius.value),
                          margin: parseInt(margin.value),
                          padding: parseInt(padding.value),
                        },
                      });
                      text.value = "";
                      color.value = "";
                      fontSize.value = "";
                      backgroundColor.value = "";
                      borderColor.value = "";
                      borderThickness.value = "";
                      borderRadius.value = "";
                      margin.value = "";
                      padding.value = "";
                    }}
                  >
                    <div className="form-group">
                      <label style={{ whiteSpace: "pre" }} htmlFor="text">
                        Text:&nbsp; {this.state.text || ""}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="text"
                        ref={(node) => {
                          text = node;
                        }}
                        placeholder="Text"
                        defaultValue=""
                        value={this.state.text}
                        onChange={this.handler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="color">
                        Color:&nbsp; {this.state.color || "#00000"}
                      </label>
                      <input
                        type="color"
                        className="form-control"
                        name="color"
                        ref={(node) => {
                          color = node;
                        }}
                        placeholder="Color"
                        defaultValue="#000000"
                        value={this.state.color}
                        onChange={this.handler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fontSize">
                        Font Size:&nbsp; {this.state.fontSize || "16"}
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="144"
                        defaultValue="16"
                        className="form-control"
                        name="fontSize"
                        ref={(node) => {
                          fontSize = node;
                        }}
                        placeholder="Font Size"
                        value={this.state.fontSize}
                        onChange={this.handler}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="backgroundColor">
                        Background Color:&nbsp;
                        {this.state.backgroundColor || "#00e100"}
                      </label>
                      <input
                        type="color"
                        className="form-control"
                        name="backgroundColor"
                        ref={(node) => {
                          backgroundColor = node;
                        }}
                        placeholder="Background Color"
                        defaultValue="#00e100"
                        value={this.state.backgroundColor}
                        onChange={this.handler}
                        //   defaultValue={data.logo.backgroundColor}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="borderColor">
                        Border Color:&nbsp; {this.state.borderColor || "#00000"}
                      </label>
                      <input
                        type="color"
                        className="form-control"
                        name="borderColor"
                        ref={(node) => {
                          borderColor = node;
                        }}
                        placeholder="Border Color"
                        defaultValue="#000000"
                        value={this.state.borderColor}
                        onChange={this.handler}
                        //   defaultValue={data.logo.borderColor}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="borderThickness">
                        Border Thickness:&nbsp;{" "}
                        {this.state.borderThickness || "0"}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        defaultValue="0"
                        className="form-control"
                        name="borderThickness"
                        ref={(node) => {
                          borderThickness = node;
                        }}
                        placeholder="Border Thickness"
                        value={this.state.borderThickness}
                        onChange={this.handler}
                        //   defaultValue={data.logo.borderThickness}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="borderRadius">
                        Border Radius:&nbsp; {this.state.borderRadius || "0"}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        defaultValue="0"
                        className="form-control"
                        name="borderRadius"
                        ref={(node) => {
                          borderRadius = node;
                        }}
                        placeholder="Border Radius"
                        value={this.state.borderRadius}
                        onChange={this.handler}
                        //   defaultValue={data.logo.borderRadius}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="margin">
                        margin:&nbsp; {this.state.margin || "0"}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        defaultValue="0"
                        className="form-control"
                        name="margin"
                        ref={(node) => {
                          margin = node;
                        }}
                        placeholder="margin"
                        value={this.state.margin}
                        onChange={this.handler}

                        //   defaultValue={data.logo.margin}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="padding">
                        padding:&nbsp; {this.state.padding || "0"}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        defaultValue="0"
                        className="form-control"
                        name="padding"
                        ref={(node) => {
                          padding = node;
                        }}
                        placeholder="Padding"
                        value={this.state.padding}
                        onChange={this.handler}

                        //   defaultValue={data.logo.padding}
                      />
                    </div>

                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}

                <div>
                  <div
                    className=""
                    style={{
                      color: this.state.color || "#000000",
                      fontSize: (this.state.fontSize || fontSize) + "pt",
                      backgroundColor: this.state.backgroundColor || "#00e100",
                      border:
                        (this.state.borderThickness || borderThickness) +
                        "px solid " +
                        (this.state.borderColor || "#000000"),
                      borderRadius:
                        (this.state.borderRadius || borderRadius) + "px",
                      padding: (this.state.padding || padding) + "px",
                      margin: (this.state.margin || margin) + "px",
                      position: "absolute",
                      left: "40%",
                      top: "10%",
                      whiteSpace: "pre",
                    }}
                  >
                    {this.state.text === null ? "" : this.state.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
