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
              onCompleted={() => this.props.history.push(`/`)}
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
                            defaultValue={data.logo.text}
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
                            defaultValue={data.logo.color}
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
                            defaultValue={data.logo.fontSize}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="borderThickness">
                            Border Thickness:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="borderThickness"
                            ref={(node) => {
                              borderThickness = node;
                            }}
                            placeholder="Border Thickness"
                            defaultValue={data.logo.borderThickness}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="backgroundColor">
                            Background Color:
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
                            defaultValue={data.logo.borderColor}
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
                            defaultValue={data.logo.borderRadius}
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
                            defaultValue={data.logo.margin}
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
                            defaultValue={data.logo.padding}
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
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
