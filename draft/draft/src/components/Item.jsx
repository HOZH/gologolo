import React, { Component } from 'react'

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
src={currentItem.url} alt={currentItem.alt} width={currentItem.width} height={currentItem.height}></img>



        )
    }
}
