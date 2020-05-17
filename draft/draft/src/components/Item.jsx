import React, { Component } from 'react'
import {Rnd} from "react-rnd";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


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

                 //  onStart = (a, b) => {
                 //    console.log("starting");

                 //    console.log(a);
                 //    console.log(b);
                 //    // this.setState({activeDrags: ++this.state.activeDrags});
                 //  };

                 onStop = (a, b) => {
                   console.log("stopping");
                   console.log(a);
                   console.log(b);
                   // this.setState({activeDrags: --this.state.activeDrags});
                   //  this.props.handlePositionChange(a,)
                 };

                 //  onDrag = (a, b) => {
                 //    console.log("dragging");
                 //    console.log(a);
                 //    console.log(b);
                 //    // this.setState({activeDrags: --this.state.activeDrags});
                 //  };
                 componentDidMount() {
                   console.error("item did mount",this.props.item.id);
                 }
                 componentWillUnmount() {
                   console.error("item will unmount",this.props.item.id);
                 }

                 handleStop = (event, dragging) => {
                   console.log(123);

                   console.log(event);

                   console.log(dragging);
                   console.log(dragging.x);
                   console.log(dragging.y);
                   this.props.handlePositionChange(dragging.x, dragging.y);
                 };

                 render() {
                   const currentItem = this.props.item;
                   const dragHandlers = {
                     //  onStart: this.onStart,
                     //  onDrag:this.onDrag,
                     //  onStop: this.onStop,
                     onStop: this.handleStop,
                   };

                   const leftBoundary = 0 - Number(currentItem.x);
                   const topBoundary = 0 - Number(currentItem.y);

                   const rightBoundary =
                     this.props.logoWidth - Number(currentItem.x);
                   const buttomBoundary =
                     this.props.logoHeight - Number(currentItem.y);

                   console.log(
                     leftBoundary,
                     topBoundary,
                     rightBoundary,
                     buttomBoundary
                   );

                   return (
                     <div
                       onMouseDown={this.props.handleSelect.bind(
                         this,
                         currentItem
                       )}
                       // onClick={this.props.handleSelect.bind(this, currentItem)}
                       id={currentItem.id}
                       // style={{overflow: "auto"}}
                     >
                       <Draggable
                         {...dragHandlers}
                         bounds={{
                           left: leftBoundary,
                           right: rightBoundary,
                           top: topBoundary,
                           bottom: buttomBoundary,
                         }}
                       >
                         {currentItem.type === "text" ? (
                           <div
                             style={{
                               color: currentItem.color,
                               fontSize: currentItem.fontSize + "pt",

                               position: "absolute",
                               left: currentItem.x,
                               top: currentItem.y,
                               zIndex: currentItem.z,
                               // whiteSpace: "pre",
                             }}
                           >
                             {currentItem.text === null ? "" : currentItem.text}
                           </div>
                         ) : (
                           <div
                             style={{
                               position: "absolute",
                               left: currentItem.x,
                               top: currentItem.y,
                               zIndex: currentItem.z,
                               // whiteSpace: "pre",
                             }}
                           >
                             <img
                               src="http://placeimg.com/640/480"
                               alt=""
                               width="200"
                               height="200"
                             />
                           </div>
                         )}
                       </Draggable>
                     </div>
                   );
                 }
               }
