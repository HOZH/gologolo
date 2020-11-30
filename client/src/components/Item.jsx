import React, { Component } from "react";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

export default class Item extends Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  };

  onStop = (a, b) => {};

  componentDidMount() {
    this.props.feedbackItem(this.props.item);
  }
  componentWillUnmount() {}
  static getDerivedStateFromProps() {}

  handleStop = (event, dragging) => {
    this.props.handlePositionChange(dragging.x, dragging.y);
  };

  render() {
    const currentItem = this.props.item;
    const dragHandlers = {
      onStop: this.handleStop,
    };

    return (
      <div
        onMouseDown={this.props.handleSelect.bind(this, currentItem)}
        onClick={this.props.handleSelect.bind(this, currentItem)}
        id={currentItem.id}
        style={{}}
      >
        <Draggable
          disabled={this.props.disableDrag}
          onStop={this.handleStop}
          defaultPosition={{
            x: currentItem.x,
            y: currentItem.y,
          }}
        >
          {currentItem.type === "text" ? (
            <div
              style={{
                color: currentItem.color,
                fontSize: currentItem.fontSize + "pt",

                position: "absolute",

                zIndex: currentItem.z,
              }}
            >
              {currentItem.text === null ? "" : currentItem.text}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",

                zIndex: currentItem.z,
              }}
            >
              <img
                src={currentItem.url}
                alt={currentItem.alt}
                width={currentItem.imgWidth}
                height={currentItem.imgHeight}
              />
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}
