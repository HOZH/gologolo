import React, { Component } from 'react'
import {Rnd} from "react-rnd";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


export default class Item extends Component {


    state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: -400, y: 200
        }
      };
    
 
      onStart = (a,b) => {
          console.log(a)
          console.log(b)
        // this.setState({activeDrags: ++this.state.activeDrags});
      };
    
      onStop = (a,b) => {
        console.log(a)
        console.log(b)
        // this.setState({activeDrags: --this.state.activeDrags});
      };
    
   


    handleStart =()=>{
        console.log('starting')
    }

    handleDrag = ()=>{
        console.log('dragging')
    }

    handleStop = (event, dragging) => {
        console.log(event)
        
        console.log(dragging)
        console.log(dragging.x)
        console.log(dragging.y)

       
    }

    render() {
        const currentItem = this.props.item
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

        
        return (

            <Draggable {...dragHandlers}>
<img src="http://placeimg.com/640/480" alt="" width="200" height="200"/>     
     </Draggable>

          
    //         <Draggable
    //         axis="x"
    //         handle=".handle"
    //         defaultPosition={{x: 0, y: 0}}
    //         position={null}
    //         grid={[25, 25]}
    //         scale={1}
    //         onStart={this.handleStart}
    //         onDrag={this.handleDrag}
    //         onStop={this.handleStop}>
    //              <img src="http://placeimg.com/640/480" alt="" width="200" height="200"/>

    //   </Draggable>


        )
    }
}
