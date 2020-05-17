import React, { Component } from 'react'
import {Rnd} from "react-rnd";


export default class Item extends Component {
    render() {
        const currentItem = this.props.item
        // console.log(this.props.I)
        
        return (


            currentItem.type === "text"?   <div
                              
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



        )
    }
}
