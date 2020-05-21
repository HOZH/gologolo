import React, { Component } from 'react'
import {Rnd} from "react-rnd";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import ReactDOM from 'react-dom';
import base64url from 'base64url'


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

                 onStop = (a, b) => {
                   console.log("stopping");
                   console.log(a);
                   console.log(b);
                   // this.setState({activeDrags: --this.state.activeDrags});
                   //  this.props.handlePositionChange(a,)
                 };

            
                 componentDidMount() {
                   console.error("item did mount123",this.props.item.id);

                  //  ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
                  //    console.log(2223)
                  //    console.log(this)
                  //   event.stopPropagation();
                  //      this.props.handleSelect(
                      
                  //        this.props.item)
                  //             console.log(2223)

                  // }, false);
                  console.log(this.props.feedbackItem)
                  this.props.feedbackItem(this.props.item)
                 }
                 componentWillUnmount() {
                   console.error("item will unmount",this.props.item.id);
                  //  ReactDOM.findDOMNode(this).removeEventListener('click')
                 }
               static  getDerivedStateFromProps(){
                 }

                 handleStop = (event, dragging) => {
                   console.log(123);
                   console.log(1)

                   console.log(event);

                   console.log(dragging);
                   console.log(dragging.x);
                   console.log(dragging.y);
                   this.props.handlePositionChange(dragging.x, dragging.y);

                 };

                 render() {
                   const currentItem = this.props.item;
                   const dragHandlers = {
                 
                     onStop: this.handleStop,
                   };

                  //  const leftBoundary = 0 - Number(currentItem.x);
                  //  const topBoundary = 0 - Number(currentItem.y);

                  //  const rightBoundary =
                  //    this.props.logoWidth - Number(currentItem.x);
                  //  const buttomBoundary =
                  //    this.props.logoHeight - Number(currentItem.y);

                  //  console.log(
                  //    leftBoundary,
                  //    topBoundary,
                  //    rightBoundary,
                  //    buttomBoundary
                  //  );

                   
                   return (
                     <div

                     onMouseDown={this.props.handleSelect.bind(this, currentItem)}
                 onClick={this.props.handleSelect.bind(this, currentItem)}
                   
                       id={currentItem.id}
                       style= {{                             
                          //  padding: "inherit"
                      }}
                       // style={{overflow: "auto"}}
                     >
                       <Draggable 
                       disabled={this.props.disableDrag}
                        //  {...dragHandlers}
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
                              //  "width": "100%",
                              //  "height": "100%",

                               position: "absolute",
                              //  left: currentItem.x,
                              //  top: currentItem.y,
                               zIndex: currentItem.z,
                              //  padding: "inherit"

                               // whiteSpace: "pre",
                             }}
                           >
                             {currentItem.text === null ? "" : currentItem.text}
                           </div>
                         ) : (
                           <div
                             style={{
                              // "width": "100%",
                              // "height": "100%",
                               position: "absolute",
                              //  left: currentItem.x,
                              //  top: currentItem.y,
                               zIndex: currentItem.z,
                              //  padding: "inherit"
                               // whiteSpace: "pre",
                             }}
                           >
                             <img
                               src={currentItem.url}
                              // src={'data:image/png;base64,'+base64url.decode(currentItem.url)}

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
