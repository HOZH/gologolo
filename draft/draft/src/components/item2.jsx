import React, { Component } from 'react'
import {Rnd} from "react-rnd";


export default class Item extends Component {

    handleDrag = (event, dragging) => {
        console.log(dragging)
        console.log(dragging.x)
        console.log(dragging.y)

        // if (this.props.item.selected) {
        //     this.props.item.left = dragging.x;
        //     this.props.item.top = dragging.y;
        //     this.setState(this.props.item);
        //     this.props.handleWorkModified();
        // }
    }

    render() {
        const currentItem = this.props.item
        // console.log(this.props.I)
        
        return (

            // <div 
            // onMouseDown={this.props.handleSelect.bind(this, currentItem)}
            // // onClick={this.props.handleSelect.bind(this, currentItem)}
            // id={currentItem.id} 
            // style={{overflow: "auto"}} 
            // >
            <Rnd
                default={{
                    x: currentItem.x,
                    y: currentItem.y,
               
                }}
                onDragStop={this.handleDrag}
          
            >
                          {  currentItem.type === "text"?   <div
                              
                              style={{
                                color: currentItem.color,
                                fontSize:
                                  currentItem.fontSize + "pt",
                           
                                position: "relative",
                                left: currentItem.x,
                                top: currentItem.y,
                                zIndex:currentItem.z
                                // whiteSpace: "pre",
                              }}
                            >
                              {currentItem.text === null ? "" : currentItem.text}
                            </div>
                  :
                  <img style={{
                      position: "relative",
                      left: currentItem.x,
                      top: currentItem.y,
                      zIndex:currentItem.z
                  
                  }}
                  src={currentItem.url} alt={currentItem.alt} width={currentItem.imgWidth} height={currentItem.imgHeight}></img>
                  }
                  
            </Rnd>

        // </div>

        )
    }
}
