

import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Item from './Item'


export default class Temp extends Component {


                  temp_state={
                    height:400,
                    width: 300,
                    backgroundColor:'aqua',
                    borderRadius:2,
                    borderThickness:1,
                    borderColor: 'green',
                    margin:2,
                    padding:2,
                    items: [
                      {id:"1",
                      x:0,
                      y:0,
                      z:1,
                      type:'text',
                      url:null,
                      alt:null,
                      width:null,
                      height:null,
                      text:'once upon       the t1ime',
                      color:'white',
                      fontSize:20,

              
              
                    },
                    {id:"2",
                    x:0,
                    y:0,
                    z:2,
                    type:'text',
                    url:null,
                    alt:null,
                    width:null,
                    height:null,
                    text:'something went wrong',
                    color:'black',
                    fontSize:25,

            
            
                  },
                  {id:"3",
                  x:0,
                  y:0,
                  z:3,
                  type:'img',
                  url:"http://placeimg.com/640/480",
                  alt:'alt text for id 3',
                  width:300,
                  height:300,
                  text:null,
                  color:null,
                  fontSize:null,

          
          
                }
                    ]

                  }
                //  state = {
                //    text: 'once upon    the time',
                //    color: null,
                //    fontSize: null,
                //    borderThickness: null,
                //    borderColor: null,
                //    borderRadius: null,
                //    padding: null,
                //    margin: null,
                //    backgroundColor: null,
                //  };
                state = {...this.temp_state}

                 handler = (event) => {
                   // console.log(
                   //   "handle" + event.target.name + "Change to " + event.target.value
                   // );
                   this.setState({ [event.target.name]: event.target.value });

                   // console.log(123);
                 };
                 render() {
                   let text,
                     color,
                     fontSize,
                     imgUrl,
                     imgAlt,
                     imgWidth,
                     imgHeight,
                     height,
                     width,
                     backgroundColor,
                     borderColor,
                     borderThickness,
                     borderRadius,
                     margin,
                     padding;
                   return (
                     <div className="container">
                       <div className="panel panel-default">
                         <div className="panel-heading">
                           <div className="bg-secondary row">
                             <h4 className=" btn btn-secondary">
                               {/* <Link className="text-white" to="/">
                                 Home
                               </Link> */}
                             </h4>
                           </div>
                           <h4 className="panel-title bg-danger text-white row">
                             &nbsp;&nbsp;Create Logo
                           </h4>{" "}
                         </div>
                         <div className="panel-body row">
                           <div className="col-2">
                             <form
                               // className="col-sm-4"
                               onSubmit={(e) => {
                                 e.preventDefault();
                               
                                 text.value = "";
                                 color.value = "";
                                 fontSize.value = "";
                                 backgroundColor.value = "";
                                 borderColor.value = "";
                                 borderThickness.value = "";
                                 borderRadius.value = "";
                                 margin.value = "";
                                 padding.value = "";
                               }}
                             >
                               <div className="form-group">
                                 <label
                                   style={{ whiteSpace: "pre" }}
                                   htmlFor="text"
                                 >
                                   Text:&nbsp; {this.state.text || ""}
                                 </label>
                                 <input
                                   type="text"
                                   className="form-control"
                                   name="text"
                                   ref={(node) => {
                                     text = node;
                                   }}
                                   placeholder="Text"
                                   defaultValue=""
                                   value={this.state.text}
                                   onChange={this.handler}
                                 />
                               </div>


                               <div className="form-group">
                                 <label htmlFor="color">
                                   Color:&nbsp; {this.state.color || "#00000"}
                                 </label>
                                 <input
                                   type="color"
                                   className="form-control"
                                   name="color"
                                   ref={(node) => {
                                     color = node;
                                   }}
                                   placeholder="Color"
                                   defaultValue="#000000"
                                   value={this.state.color}
                                   onChange={this.handler}
                                 />
                               </div>
                               <div className="form-group">


                                 <label htmlFor="fontSize">
                                   Font Size:&nbsp;{" "}
                                   {this.state.fontSize || "16"}
                                 </label>
                                 <input
                                   type="range"
                                   min="2"
                                   max="144"
                                   defaultValue="16"
                                   className="form-control"
                                   name="fontSize"
                                   ref={(node) => {
                                     fontSize = node;
                                   }}
                                   placeholder="Font Size"
                                   value={this.state.fontSize}
                                   onChange={this.handler}
                                 />
                               </div>


                               <div className="form-group">
                                 <label
                                   style={{ whiteSpace: "pre" }}
                                   htmlFor="imgUrl"
                                 >
                                   img url:&nbsp; {this.state.text || ""}
                                 </label>
                                 <input
                                   type="text"
                                   className="form-control"
                                   name="imgUrl"
                                   ref={(node) => {
                                     imgUrl = node;
                                   }}
                                   placeholder="img url"
                                   defaultValue=""
                                   value={this.state.text}
                                   onChange={this.handler}
                                 />
                               </div>
                                  

                               <div className="form-group">
                                 <label
                                   style={{ whiteSpace: "pre" }}
                                   htmlFor="imgAlt"
                                 >
                                   img alt:&nbsp; {this.state.text || ""}
                                 </label>
                                 <input
                                   type="text"
                                   className="form-control"
                                   name="imgAlt"
                                   ref={(node) => {
                                     imgAlt = node;
                                   }}
                                   placeholder="img alt"
                                   defaultValue=""
                                   value={this.state.text}
                                   onChange={this.handler}
                                 />
                               </div>




                                 <div className="form-group">


                                 <label htmlFor="imgHeight">
                                   img height:&nbsp;{" "}
                                   {this.state.fontSize || "16"}
                                 </label>
                                 <input
                                   type="range"
                                   min="20"
                                   max="200"
                                   defaultValue="100"
                                   className="form-control"
                                   name="imgHeight"
                                   ref={(node) => {
                                     imgHeight = node;
                                   }}
                                   placeholder="img height"
                                   value={this.state.fontSize}
                                   onChange={this.handler}
                                 />
                               </div>


                                  <div className="form-group">


                                 <label htmlFor="imgWidth">
                                   img height:&nbsp;{" "}
                                   {this.state.fontSize || "16"}
                                 </label>
                                 <input
                                   type="range"
                                   min="20"
                                   max="200"
                                   defaultValue="100"
                                   className="form-control"
                                   name="imgWidth"
                                   ref={(node) => {
                                     imgWidth = node;
                                   }}
                                   placeholder="img width"
                                   value={this.state.fontSize}
                                   onChange={this.handler}
                                 />
                               </div>


                               











                                   
                               

                              

                               
                             

                              
                               <button
                                 type="submit"
                                 className="btn btn-success"
                               >
                                 Submit
                               </button>
                             </form>
                           </div>
                           {/* {loading && <p>Loading...</p>} */}
                           {/* {error && <p>Error :( Please try again</p>} */}

                           <div  className="col-7">
                      







<div style={{
     left: "40%",
    top: "10%",
    position:"absolute",
    whiteSpace: "pre",

    width: this.state.width,
    height: this.state.height,







    backgroundColor:
    this.state.backgroundColor || "#00e100",
  border:
    (this.state.borderThickness ||
      borderThickness) +
    "px solid " +
    (this.state.borderColor || "#000000"),
  borderRadius:
    (this.state.borderRadius || borderRadius) +
    "px",
  padding:
    (this.state.padding || padding) + "px",
  margin: (this.state.margin || margin) + "px",
}}>


{this.state.items&& this.state.items.map(
  current=> (<Item item ={current}/>)
)}
<Item item ={this.state.items[0]}/>
<div
                              
                              style={{
                                color: "pink",
                                fontSize:
                                  (this.state.fontSize || fontSize) + "pt",
                                // backgroundColor:
                                //   this.state.backgroundColor || "#00e100",
                                // border:
                                //   (this.state.borderThickness ||
                                //     borderThickness) +
                                //   "px solid " +
                                //   (this.state.borderColor || "#000000"),
                                // borderRadius:
                                //   (this.state.borderRadius || borderRadius) +
                                //   "px",
                                // padding:
                                //   (this.state.padding || padding) + "px",
                                // margin: (this.state.margin || margin) + "px",
                                position: "relative",
                                left: "45%",
                                top: "15%",
                                zIndex:1
                                // whiteSpace: "pre",
                              }}
                            >
                              {this.state.text === null ? "" : this.state.text}
                            </div>







                            <div
                              
                              style={{
                                color: "white",
                                fontSize:
                                  (this.state.fontSize || fontSize) + "pt",
                                // backgroundColor:
                                //   this.state.backgroundColor || "#00e100",
                                // border:
                                //   (this.state.borderThickness ||
                                //     borderThickness) +
                                //   "px solid " +
                                //   (this.state.borderColor || "#000000"),
                                // borderRadius:
                                //   (this.state.borderRadius || borderRadius) +
                                //   "px",
                                // padding:
                                //   (this.state.padding || padding) + "px",
                                // margin: (this.state.margin || margin) + "px",
                                position: "absolute",
                                left: "45%",
                                top: "35%",
                                zIndex:2
                                // whiteSpace: "pre",
                              }}
                            >
                              {this.state.text === null ? "" : this.state.text}
                            </div>


                            <img style={{
                                position: "absolute",
                                left: "45%",
                                top: "35%",
                                zIndex:2

                            }}
                            src="http://placeimg.com/640/480" alt="" width="200" height="200"></img>




</div>















                           </div>1



























                           <div className="col-2">
                             <form
                               // className="col-sm-4"
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
                                   //   defaultValue={data.logo.backgroundColor}
                                 />
                               </div>

                               <div className="form-group">
                                 <label htmlFor="borderColor">
                                   Border Color:&nbsp;{" "}
                                   {this.state.borderColor || "#00000"}
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
                                   //   defaultValue={data.logo.borderColor}
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
                                   //   defaultValue={data.logo.borderThickness}
                                 />
                               </div>
                               <div className="form-group">
                                 <label htmlFor="borderRadius">
                                   Border Radius:&nbsp;{" "}
                                   {this.state.borderRadius || "0"}
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
                                   //   defaultValue={data.logo.borderRadius}
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

                                   //   defaultValue={data.logo.margin}
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

                                   //   defaultValue={data.logo.padding}
                                 />
                               </div>

                               <button
                                 type="submit"
                                 className="btn btn-success"
                               >
                                 Submit
                               </button>
                             </form>
                           </div>





                         </div>
                       </div>
                     </div>
                   );
                 }
               }
