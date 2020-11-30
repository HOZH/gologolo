import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import NavBar from "./navbar/NavBar";

const ADD_LOGO = gql`
  mutation AddLogo(
    $owner: String!
    $title: String!
    $width: Int!
    $height: Int!
    $items: [ItemInput]
    $backgroundColor: String!
    $borderRadius: Int!
    $borderThickness: Int!
    $borderColor: String!
    $margin: Int!
    $padding: Int!
  ) {
    addLogo(
      owner: $owner
      title: $title
      width: $width
      height: $height
      items: $items
      backgroundColor: $backgroundColor
      borderRadius: $borderRadius
      borderThickness: $borderThickness
      borderColor: $borderColor
      margin: $margin
      padding: $padding
    ) {
      _id
      lastUpdate
    }
  }
`;
export default class Temp extends Component {
  temp_state = {
    title: "temp1",
    height: 400,
    width: 300,
    backgroundColor: "aqua",
    borderRadius: 2,
    borderThickness: 1,
    borderColor: "green",
    margin: 2,
    padding: 2,
    items: [
      {
        id: "1",
        x: 0,
        y: 0,
        z: 1,
        type: "text",
        url: null,
        alt: null,
        imgWidth: null,
        imgHeight: null,
        text: "once upon       the t1ime",
        color: "#ffffff",
        fontSize: 20,
      },
      {
        id: "2",
        x: 20,
        y: 0,
        z: 2,
        type: "text",
        url: null,
        alt: null,
        imgWidth: null,
        imgHeight: null,
        text: "something went wrong",
        color: "#ffff00",
        fontSize: 25,
      },
      {
        id: "3",
        x: 0,
        y: 50,
        z: 3,
        type: "img",
        url: "http://placeimg.com/640/480",
        alt: "alt text for id 3",
        imgWidth: 200,
        imgHeight: 200,
        text: null,
        color: null,
        fontSize: null,
      },
    ],
  };

  state = {
    title: "temp title",

    height: 200,
    width: 200,
    backgroundColor: null,
    borderRadius: 0,
    borderThickness: 0,
    borderColor: null,
    margin: 0,
    padding: 0,
    items: [],
    editingItem: { type: "none" },
  };

  unselect = () => {
    this.setState({ editingItem: { type: "none" } });
  };

  feedbackItem = (e) => {};

  componentDidMount() {}
  componentWillUnmount() {}
  get_max_z_order = () => {
    let maxZ = -1;
    for (let i of this.state.items) {
      if (i.z > maxZ) maxZ = i.z;
    }

    return maxZ;
  };

  addText = () => {
    let newZ = this.get_max_z_order() + 1;
    const textTemplate = {
      id: uuidv4(),
      x: 0,
      y: 0,
      z: newZ,

      type: "text",
      url: null,
      alt: null,
      imgWidth: null,
      imgHeight: null,
      text: "placeHolder",
      color: "#ffffff",
      fontSize: 16,
    };

    this.setState({
      items: [...this.state.items, textTemplate],
      editingItem: textTemplate,
    });
  };

  addImage = () => {
    let newZ = this.get_max_z_order() + 1;
    const textTemplate = {
      id: uuidv4(),
      x: 0,
      y: 0,
      z: newZ,
      type: "img",
      url: "http://placeimg.com/640/480",
      alt: "alt for place holder",
      imgWidth: 100,
      imgHeight: 100,

      text: null,
      color: null,
      fontSize: null,
    };

    this.setState({
      items: [...this.state.items, textTemplate],
      editingItem: textTemplate,
    });
  };

  deleteItem = () => {
    const deletingId = this.state.editingItem.id;
    this.setState({
      items: this.state.items.filter((e) => e.id !== deletingId),
      editingItem: { type: "none" },
    });
  };

  handleSelect = (item) => {
    let current = this.state.items.find((e) => e.id == item.id);
    current.z = this.get_max_z_order() + 1;
    this.setState({
      editingItem: current,
      items: this.state.items.map((e) => {
        if (e.id == current.id) e.z = current.z;

        return e;
      }),
    });
  };

  handler = (event) => {
    console.log(
      "handle" + event.target.name + "Change to " + event.target.value
    );
    console.log(event.target.value, typeof event.target.value);

    this.setState({ [event.target.name]: event.target.value });
  };

  itemHandler = (event) => {
    console.log(
      "handle" + event.target.name + "Change to " + event.target.value
    );
    let current = this.state.editingItem;
    console.log(event.target.value, typeof event.target.value);
    if (["imgHeight", "imgWidth", "fontSize"].includes(event.target.name)) {
      current[event.target.name] = parseInt(event.target.value);
    } else {
      current[event.target.name] = event.target.value;
    }
    console.log(current);
    this.setState({ editingItem: current });
  };

  handlePositionChange = (x, y) => {
    let current = this.state.editingItem;

    current.x = x;
    current.y = y;

    this.setState({ editingItem: current });
  };
  render() {
    let owner,
      title,
      width,
      height,
      items,
      backgroundColor,
      borderRadius,
      borderThickness,
      borderColor,
      margin,
      padding;
    let temp_token = window.localStorage.getItem("token");
    temp_token = temp_token.substring(1, temp_token.length - 1);
    return (
      <Mutation
        context={{
          headers: {
            authorization: temp_token,
          },
        }}
        mutation={ADD_LOGO}
        onCompleted={() =>
          this.props.history.push(
            "/" + JSON.parse(window.localStorage.getItem("user"))._id
          )
        }
      >
        {(addLogo, { loading, error }) => (
          <div className="container ">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <NavBar />
                </div>
                <h4 className="panel-title bg-danger text-white row">
                  &nbsp;&nbsp;Create Logo
                </h4>{" "}
              </div>
              <div className="panel-body row">
                <div className="col-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      addLogo({
                        variables: {
                          owner:
                            JSON.parse(window.localStorage.getItem("user"))
                              ._id || "no user",
                          title: title.value,
                          width: parseInt(width.value),
                          height: parseInt(height.value),
                          items: this.state.items,
                          backgroundColor: backgroundColor.value,
                          borderRadius: parseInt(borderRadius.value),
                          borderThickness: parseInt(borderThickness.value),
                          borderColor: borderColor.value,
                          margin: parseInt(margin.value),
                          padding: parseInt(padding.value),
                        },
                      });

                      width.value = "";
                      height.value = "";
                      backgroundColor.value = "";
                      borderRadius.value = "";
                      borderThickness.value = "";
                      borderColor.value = "";
                      margin.value = "";
                      padding.value = "";
                    }}
                  >
                    {this.state.editingItem.type == "text" ? (
                      <React.Fragment>
                        <div className="form-group">
                          <label style={{ whiteSpace: "pre" }} htmlFor="text">
                            Text:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.text
                              : ""}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="text"
                            ref={(node) => {}}
                            placeholder="Text"
                            defaultValue=""
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.text
                            }
                            onChange={this.itemHandler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="color">
                            Color:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.color
                              : "#00000"}
                          </label>
                          <input
                            type="color"
                            className="form-control"
                            name="color"
                            ref={(node) => {}}
                            placeholder="Color"
                            defaultValue="#00000"
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.color
                            }
                            onChange={this.itemHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="fontSize">
                            Font Size:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.fontSize
                              : 16}
                          </label>
                          <input
                            type="range"
                            min="2"
                            max="144"
                            defaultValue="16"
                            className="form-control"
                            name="fontSize"
                            ref={(node) => {}}
                            placeholder="Font Size"
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.fontSize
                            }
                            onChange={this.itemHandler}
                          />
                        </div>
                      </React.Fragment>
                    ) : null}
                    {this.state.editingItem.type === "img" ? (
                      <React.Fragment>
                        <div className="form-group">
                          <label style={{ whiteSpace: "pre" }} htmlFor="imgUrl">
                            img url:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.url
                              : ""}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="url"
                            ref={(node) => {}}
                            placeholder="img url"
                            defaultValue=""
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.url
                            }
                            onChange={this.itemHandler}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ whiteSpace: "pre" }} htmlFor="imgAlt">
                            img alt:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.alt
                              : ""}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="alt"
                            ref={(node) => {}}
                            placeholder="img alt"
                            defaultValue=""
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.alt
                            }
                            onChange={this.itemHandler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="imgHeight">
                            img height:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.imgHeight
                              : "100"}
                          </label>
                          <input
                            type="range"
                            min="20"
                            max="500"
                            defaultValue="100"
                            className="form-control"
                            name="imgHeight"
                            ref={(node) => {}}
                            placeholder="img height"
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.imgHeight
                            }
                            onChange={this.itemHandler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="imgWidth">
                            img width:&nbsp;{" "}
                            {this.state.editingItem
                              ? this.state.editingItem.imgWidth
                              : "100"}
                          </label>
                          <input
                            type="range"
                            min="20"
                            max="500"
                            defaultValue="100"
                            className="form-control"
                            name="imgWidth"
                            ref={(node) => {}}
                            placeholder="img width"
                            value={
                              this.state.editingItem &&
                              this.state.editingItem.imgWidth
                            }
                            onChange={this.itemHandler}
                          />
                        </div>
                      </React.Fragment>
                    ) : null}

                    <br />
                    <div className="btn btn-success" onClick={this.addText}>
                      add text
                    </div>
                    <br />
                    <div className="btn btn-success" onClick={this.addImage}>
                      add image
                    </div>
                    {this.state.editingItem.type !== "none" ? (
                      <div className="btn btn-danger" onClick={this.deleteItem}>
                        delete item
                      </div>
                    ) : null}
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-7">
                  <div
                    onClick={() => {
                      console.log("qwe");
                      this.unselect();
                    }}
                    style={{
                      left: "40%",
                      top: "10%",
                      position: "absolute",
                      whiteSpace: "pre",

                      width: this.state.width + "px",
                      height: this.state.height + "px",

                      backgroundColor: this.state.backgroundColor || "#00e100",
                      border:
                        (this.state.borderThickness || borderThickness) +
                        "px solid " +
                        (this.state.borderColor || "#000000"),
                      borderRadius:
                        (this.state.borderRadius || borderRadius) + "px",
                      padding: (this.state.padding || padding) + "px",
                      margin: (this.state.margin || margin) + "px",
                    }}
                  >
                    {this.state.items &&
                      this.state.items.map((current) => (
                        <Item
                          disableDrag={false}
                          feedbackItem={this.feedbackItem}
                          handlePositionChange={this.handlePositionChange}
                          logoHeight={this.state.height}
                          logoWidth={this.state.width}
                          handleSelect={this.handleSelect}
                          item={current}
                        />
                      ))}
                  </div>
                </div>
                1
                <div className="col-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      backgroundColor.value = "";
                      borderColor.value = "";
                      borderThickness.value = "";
                      borderRadius.value = "";
                      margin.value = "";
                      padding.value = "";
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="title">
                        Title:&nbsp;
                        {this.state.title || "temp title"}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        ref={(node) => {
                          title = node;
                        }}
                        placeholder="title"
                        defaultValue="temp title"
                        value={this.state.title}
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
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="height">
                        height:&nbsp; {this.state.height || "0"}
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="500"
                        defaultValue="200"
                        className="form-control"
                        name="height"
                        ref={(node) => {
                          height = node;
                        }}
                        placeholder="Height"
                        value={this.state.height}
                        onChange={this.handler}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="width">
                        width:&nbsp; {this.state.width || "0"}
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="500"
                        defaultValue="200"
                        className="form-control"
                        name="width"
                        ref={(node) => {
                          width = node;
                        }}
                        placeholder="width"
                        value={this.state.width}
                        onChange={this.handler}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
