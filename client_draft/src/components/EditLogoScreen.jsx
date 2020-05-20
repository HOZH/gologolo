import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      backgroundColor
      fontSize
      borderThickness
      borderColor
      borderRadius
      margin
      padding
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
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
    updateLogo(
      id: $id
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
      lastUpdate
    }
  }
`;

class EditLogoScreen extends Component {
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
      borderThickness,
      borderColor,
      borderRadius,
      padding,
      margin,
      backgroundColor;
    return (
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          // console.log("temp", data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (    
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={(e) => {
                // console.log("current e", e);

                this.props.history.push(`/`);
              }}
            >
              {(updateLogo, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <div className="bg-secondary">
                        <h4 className=" btn btn-secondary">
                          <Link className="text-white" to="/">
                            Home
                          </Link>
                        </h4>
                      </div>
                      <h4 className="panel-title bg-danger text-white">
                        &nbsp;&nbsp;Edit Logo
                      </h4>{" "}
                    </div>
                    <div className="panel-body row">
                      <form
                        className="col-sm-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          // console.log(
                          //   "current updating",
                          //   borderThickness.value,
                          //   borderColor.value,
                          //   borderRadius.value,
                          //   backgroundColor.value,
                          //   margin.value,
                          //   padding.value
                          // );
                          updateLogo({
                            variables: {
                              id: data.logo._id,
                              text: text.value,
                              color: color.value,
                              fontSize: parseInt(fontSize.value),
                              borderThickness: parseInt(borderThickness.value),
                              borderColor: borderColor.value,
                              borderRadius: parseInt(borderRadius.value),
                              backgroundColor: backgroundColor.value,
                              margin: parseInt(margin.value),
                              padding: parseInt(padding.value),
                            },
                          });
                          text.value = "";
                          color.value = "";
                          fontSize.value = "";
                          borderThickness.value = "";
                          borderColor.value = "";
                          borderRadius.value = "";
                          backgroundColor.value = "";
                          margin.value = "";
                          padding.value = "";
                        }}
                      >
                        <div className="form-group ">
                          <label htmlFor="text" style={{ whiteSpace: "pre" }}>
                            Text: {this.state.text || data.logo.text}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="text"
                            ref={(node) => {
                              text = node;
                            }}
                            placeholder="Text"
                            defaultValue={data.logo.text}
                            value={this.state.text}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="color">
                            Color: {this.state.color || data.logo.color}
                          </label>
                          <input
                            type="color"
                            className="form-control"
                            name="color"
                            ref={(node) => {
                              color = node;
                            }}
                            placeholder="Color"
                            defaultValue={data.logo.color}
                            value={this.state.color}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="fontSize">
                            Font Size:{" "}
                            {this.state.fontSize || data.logo.fontSize}
                          </label>
                          <input
                            type="range"
                            min="2"
                            max="144"
                            className="form-control"
                            name="fontSize"
                            ref={(node) => {
                              fontSize = node;
                            }}
                            placeholder="Font Size"
                            defaultValue={data.logo.fontSize}
                            value={this.state.fontSize}
                            onChange={this.handler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="borderThickness">
                            Border Thickness:{" "}
                            {this.state.borderThickness ||
                              data.logo.borderThickness}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="150"
                            className="form-control"
                            name="borderThickness"
                            ref={(node) => {
                              borderThickness = node;
                            }}
                            placeholder="Border Thickness"
                            defaultValue={data.logo.borderThickness}
                            value={this.state.borderThickness}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="backgroundColor">
                            Background Color:{" "}
                            {this.state.backgroundColor ||
                              data.logo.backgroundColor}
                          </label>
                          <input
                            type="color"
                            className="form-control"
                            name="backgroundColor"
                            ref={(node) => {
                              backgroundColor = node;
                            }}
                            placeholder="Background Color"
                            defaultValue={data.logo.backgroundColor}
                            value={this.state.backgroundColor}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="borderColor">
                            Border Color:{" "}
                            {this.state.borderColor || data.logo.borderColor}
                          </label>
                          <input
                            type="color"
                            className="form-control"
                            name="borderColor"
                            ref={(node) => {
                              borderColor = node;
                            }}
                            placeholder="Border Color"
                            defaultValue={data.logo.borderColor}
                            value={this.state.borderColor}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="borderRadius">
                            Border Radius:{" "}
                            {this.state.borderRadius || data.logo.borderRadius}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="150"
                            className="form-control"
                            name="borderRadius"
                            ref={(node) => {
                              borderRadius = node;
                            }}
                            placeholder="Border Radius"
                            defaultValue={data.logo.borderRadius}
                            value={this.state.borderRadius}
                            onChange={this.handler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="margin">
                            margin: {this.state.margin || data.logo.margin}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="60"
                            className="form-control"
                            name="margin"
                            ref={(node) => {
                              margin = node;
                            }}
                            placeholder="margin"
                            defaultValue={data.logo.margin}
                            value={this.state.margin}
                            onChange={this.handler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="padding">
                            padding: {this.state.padding || data.logo.padding}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="60"
                            className="form-control"
                            name="padding"
                            ref={(node) => {
                              padding = node;
                            }}
                            placeholder="Padding"
                            defaultValue={data.logo.padding}
                            value={this.state.padding}
                            onChange={this.handler}
                          />
                        </div>

                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                      <div>
                        <div
                          className=""
                          style={{
                            color: this.state.color || data.logo.color,
                            fontSize:
                              (this.state.fontSize || data.logo.fontSize) +
                              "pt",
                            backgroundColor:
                              this.state.backgroundColor ||
                              data.logo.backgroundColor,
                            border:
                              (this.state.borderThickness ||
                                data.logo.borderThickness) +
                              "px solid " +
                              (this.state.borderColor || data.logo.borderColor),
                            borderRadius:
                              (this.state.borderRadius ||
                                data.logo.borderRadius) + "px",
                            padding:
                              (this.state.padding || data.logo.padding) + "px",
                            margin:
                              (this.state.margin || data.logo.margin) + "px",
                            position: "absolute",
                            left: "40%",
                            top: "10%",
                            whiteSpace: "pre",
                          }}
                        >
                          {this.state.text === null
                            ? data.logo.text
                            : this.state.text}
                          {/* {this.state.text || data.logo.text} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
