import React, { Component } from "react";
import Item from "../Item";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import html2canvas from "html2canvas";

import NavBar from "../navbar/NavBar";

const GET_LOGO = gql`
  query logo($logoId: String!) {
    logo(id: $logoId) {
      title
      owner
      items {
        type
        text
        color
        fontSize
        url
        imgWidth
        imgHeight
        alt
        id
        z
        x
        y
      }
      backgroundColor
      borderRadius
      borderThickness
      borderColor
      height
      width
      margin
      padding
      lastUpdate
    }
  }
`;
const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id: $id) {
      _id
    }
  }
`;

export default class EditLogoScreen extends Component {
  state = {
    title: "temp title",
    height: 150,
    width: 200,
    backgroundColor: null,
    borderRadius: 0,
    borderThickness: 0,
    borderColor: null,
    margin: 0,
    padding: 0,
    items: [],
    editingItem: { type: "none" },

    need2Load: true,
  };

  handlePositionChange = () => {};
  handleSelect = () => {};

  componentDidMount() {}
  componentWillUnmount() {}

  baz = () => {};
  force = () => {
    this.forceUpdate();
  };

  feedbackItem = (e) => {};
  render() {
    let temp_token = window.localStorage.getItem("token");
    temp_token = temp_token.substring(1, temp_token.length - 1);
    let borderRadius, borderThickness, margin, padding;
    return (
      <Query
        context={{
          headers: {
            authorization: temp_token,
          },
        }}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.debug(data);

          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="row">
                    <NavBar />
                  </div>
                  <h4 className="panel-title bg-danger text-white row">
                    &nbsp;&nbsp;View Logo
                  </h4>{" "}
                </div>
                <div className="panel-body row">
                  <div className="col-2">
                    <div
                      className="btn btn-success"
                      id="p1"
                      onClick={() => {
                        this.props.history.push(
                          `/edit/` + this.props.match.params.id
                        );
                      }}
                    >
                      edit
                    </div>
                    <div
                      className="btn btn-success"
                      onClick={() => {
                        html2canvas(document.querySelector("#pic"), {
                          allowTaint: true,
                          useCORS: true,
                          logging: true,
                          proxy: "http://placeimg.com",
                        }).then(function (canvas) {
                          var link = document.createElement("a");
                          link.id = "a99";

                          if (typeof link.download === "string") {
                            link.href = canvas.toDataURL();
                            link.download = "file-name.png";

                            //Firefox requires the link to be in the body
                            document.body.appendChild(link);

                            //simulate click
                            link.click();

                            //remove the link when done
                            document.body.removeChild(link);
                          } else {
                            // console.log(2)
                            window.open(canvas.toDataURL());
                          }
                        });
                      }}
                    >
                      save
                    </div>

                    <Mutation
                      context={{
                        headers: {
                          authorization: temp_token,
                        },
                      }}
                      mutation={DELETE_LOGO}
                      key={this.props.match.params.id}
                    >
                      {(removeLogo, { loading, error }) => (
                        <div
                          className="btn btn-danger"
                          onClick={() => {
                            removeLogo({
                              variables: { id: this.props.match.params.id },
                            });

                            this.props.history.push(
                              "/" +
                                JSON.parse(window.localStorage.getItem("user"))
                                  ._id
                            );
                          }}
                        >
                          delete
                        </div>
                      )}
                    </Mutation>
                  </div>

                  <div className="col-7">
                    <div
                      id="pic"
                      onClick={() => {
                        console.log("clicking");
                      }}
                      style={{
                        left: "40%",
                        top: "10%",
                        position: "absolute",
                        whiteSpace: "pre",

                        width: data.logo.width + "px",
                        height: data.logo.height + "px",

                        backgroundColor: data.logo.backgroundColor || "#00e100",
                        border:
                          (data.logo.borderThickness || borderThickness) +
                          "px solid " +
                          (data.logo.borderColor || "#000000"),
                        borderRadius:
                          (data.logo.borderRadius || borderRadius) + "px",
                        padding: (data.logo.padding || padding) + "px",
                        margin: (data.logo.margin || margin) + "px",
                      }}
                    >
                      {data.logo.items.map((current) => {
                        return (
                          <Item
                            disableDrag={true}
                            feedbackItem={this.feedbackItem}
                            handlePositionChange={this.handlePositionChange}
                            logoHeight={data.logo.height}
                            logoWidth={data.logo.width}
                            handleSelect={this.handleSelect}
                            item={current}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-2"></div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
