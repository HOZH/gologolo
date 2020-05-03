import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $fontSize: Int!
    $borderThickness: Int!
    $borderColor: String!
    $borderRadius: Int!
    $padding: Int!
    $margin: Int!
    $backgroundColor: String!
  ) {
    addLogo(
      text: $text
      color: $color
      fontSize: $fontSize
      borderThickness: $borderThickness
      borderColor: $borderColor
      borderRadius: $borderRadius
      padding: $padding
      margin: $margin
      backgroundColor: $backgroundColor
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
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
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addLogo, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>
                  <Link to="/">Home</Link>
                </h4>
                <h3 className="panel-title">Create Logo</h3>
              </div>
              <div className="panel-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // console.log(
                    //   "current updating",
                    //   text.value,
                    //   color.value,
                    //   fontSize.value,
                    //   borderThickness.value,
                    //   borderColor.value,
                    //   borderRadius.value,
                    //   backgroundColor.value,
                    //   margin.value,
                    //   padding.value
                    // );
                    addLogo({
                      variables: {
                        variables: {
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
                  <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="text"
                      ref={(node) => {
                        text = node;
                      }}
                      placeholder="Text"
                      //   defaultValue={data.logo.text}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="color"
                      ref={(node) => {
                        color = node;
                      }}
                      placeholder="Color"
                      //   defaultValue={data.logo.color}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fontSize">Font Size:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fontSize"
                      ref={(node) => {
                        fontSize = node;
                      }}
                      placeholder="Font Size"
                      //   defaultValue={data.logo.fontSize}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="borderThickness">Border Thickness:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="borderThickness"
                      ref={(node) => {
                        borderThickness = node;
                      }}
                      placeholder="Border Thickness"
                      //   defaultValue={data.logo.borderThickness}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="backgroundColor">Background Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="backgroundColor"
                      ref={(node) => {
                        backgroundColor = node;
                      }}
                      placeholder="Background Color"
                      //   defaultValue={data.logo.backgroundColor}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="borderColor">Border Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="borderColor"
                      ref={(node) => {
                        borderColor = node;
                      }}
                      placeholder="Border Color"
                      //   defaultValue={data.logo.borderColor}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="borderRadius">Border Radius:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="borderRadius"
                      ref={(node) => {
                        borderRadius = node;
                      }}
                      placeholder="Border Radius"
                      //   defaultValue={data.logo.borderRadius}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="margin">margin:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="margin"
                      ref={(node) => {
                        margin = node;
                      }}
                      placeholder="margin"
                      //   defaultValue={data.logo.margin}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="padding">padding:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="padding"
                      ref={(node) => {
                        padding = node;
                      }}
                      placeholder="Padding"
                      //   defaultValue={data.logo.padding}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
