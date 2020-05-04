import React, {Component} from 'react'
import {Rnd} from "react-rnd";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

export default class Drag extends Component {

    handleResize = (e, direction, ref, delta, position) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'

        console.log('handleResize');
        // let item = this.props.item;

        // item.width = ref.style.width;
        // item.height = ref.style.height;
        // this.setState(this.props.item);
        // this.props.handleWorkModified();
    }


    handleDrag = (event, dragging) => {
        console.log('handle drag')
        // if (this.props.item.selected) {
        //     this.props.item.left = dragging.x;
        //     this.props.item.top = dragging.y;
        //     this.setState(this.props.item);
        //     this.props.handleWorkModified();
        // }
    }

    buildControl = () => {
        let item = this.props.item;
        let {borderRadius, borderColor, borderWidth, fontSize, backgroundColor} = item
        let textStyle = {
            text,
    //   color,
    //   fontSize,
    //   borderThickness,
    //   borderColor,
    //   borderRadius,
    //   padding,
    //   margin,
    //   backgroundColor;
            "width": "100%",
            "height": "100%",
            "borderRadius": borderRadius + "px",
            "borderColor": borderColor + "",
            "borderWidth": borderWidth + "",
            "fontSize": fontSize + "px",
            "backgroundColor": backgroundColor + "",
            // borderStyle:"solid"

        }
        if (item.type === "text")
            return (<div className="dragger" style={textStyle}>{item ? item.property : ""}</div>);
        if (item.type === "image")
            // return (<button className="dragger" style={itemStyle}>{item ? item.property : ""}</button>);
            // return (<input type="button"></input>)
            return (<button className="dragger btn--floating btn_large waves-effect waves-light"
                // style={itemStyle}
                            style={{...textStyle, background: "inherit"}}
            >{item ? item.property : ""}</button>);

    
        return null;
    }

    render() {
        const current_control = this.props.item;
        const {fontSize, borderWidth, borderRadius, borderColor, backGroundColor} = current_control;
        let style = {
            // height:"70%",
            borderRadius: borderRadius + "px",
            borderColor: borderColor,
            borderStyle: "solid",
            backgroundColor: backGroundColor + "",
            fontSize: fontSize + "px",
            borderWidth: borderWidth + "px",

        }
        const cornerStyle = {
            border: "1px solid black",
            width: 10,
            height: 10,

        }

        return (

            <div id={current_control.id} style={{overflow: "auto"}} className={this.typeControll}>
                <Rnd
                    style={style}
                    default={{
                        x: current_control.left,
                        y: current_control.top,
                        width: current_control.width,
                        height: current_control.height
                    }}
                    onDragStop={this.handleDrag}
                    onResizeStop={this.handleResize}
                    resizeHandleStyles={{


                        topRight: current_control.selected ? cornerStyle : "",
                        topLeft: current_control.selected ? cornerStyle : "",
                        bottomRight: current_control.selected ? cornerStyle : "",
                        bottomLeft: current_control.selected ? cornerStyle : "",

                    }}
                >{this.buildControl()}
                </Rnd>

            </div>
        )
    }
}
