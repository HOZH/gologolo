import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "../Item";
import { v4 as uuidv4 } from "uuid";
import gql from "graphql-tag";
import { Query, Mutation }from "react-apollo";
import {useMutation,useQuery} from '@apollo/react-hooks'
import QueryHelper from './QueryHelper'
const GET_LOGO = gql`
  query logo($logoId: String!) {

      logo(id: $logoId){
        title,
        owner,items{text,color,fontSize,url,imgWidth,imgHeight,alt,id,z,x,y}
        ,backgroundColor,borderRadius,
        borderThickness,borderColor,
        height,
        width,
        margin,
        padding,lastUpdate
      }
      
  }
`;
const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!,
    $owner:String!,
   $title:String!,
    $width:Int!,
    $height:Int!,
   $items:[ItemInput],
   $backgroundColor:String!,
   $borderRadius:Int!,
     $borderThickness:Int!,
     $borderColor:String!,
     $margin:Int!,
     $padding:Int!
) {
 


  updateLogo(
      
    id: $id,
      owner:$owner,
    title:$title,
     width:$width,
     height:$height,
    items:$items,
    backgroundColor:$backgroundColor,
    borderRadius:$borderRadius,
      borderThickness:$borderThickness,
      borderColor:$borderColor,
      margin:$margin,
      padding:$padding
      ){
      _id,
      lastUpdate
    }

  }
`;


export default class EditLogoScreen extends Component {
    
    state = {
        title:"temp title",
        height: 200,
        width: 200,
        backgroundColor: null,
        borderRadius: 0,
        borderThickness: 0,
        borderColor: null,
        margin: 0,
        padding: 0,
        items:[]
        ,editingItem: { type: "none" } };
    
    
      unselect = () => {
        this.setState({ editingItem: { type: "none" } });
      };
    
      componentDidMount() {
        console.error("temp1 did mount");
        // const [get_logo,{data}] = useQuery(GET_LOGO)

        // let temp =get_logo()
        // console.error('c mounted')
        // console.log(temp)
      }
      componentWillUnmount() {
        console.error("temp will unmount");
      }
      get_max_z_order = () => {
        let maxZ = -1;
        console.log(this.state.items);
        for (let i of this.state.items) {
          console.log(i);
          if (i.z > maxZ) maxZ = i.z;
        }
    
        return maxZ;
      };
    
      addText = () => {
        console.log(1);
        // console.log(this.get_max_z_order())
        let newZ = this.get_max_z_order() + 1;
        // let newZ =1;
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
    
        // console.log(textTemplate)
        this.setState({
          items: [...this.state.items, textTemplate],
          editingItem: textTemplate,
        });
      };
    
      addImage = () => {
        console.log(2);
    
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
    
        // console.log(textTemplate)
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
        console.error("222222222222222222222222222222");
    
        console.log(item);
        let current = this.state.items.find((e) => e.id == item.id);
        console.log(current);
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
        this.setState({ [event.target.name]: event.target.value });
    
        // console.log(123);
      };
    
      itemHandler = (event) => {
        console.log(
          "handle" + event.target.name + "Change to " + event.target.value
        );
        let current = this.state.editingItem;
        console.log(event.target.value,typeof event.target.value)
        if(['imgHeight','imgWidth','fontSize'].includes(event.target.name))
        {current[event.target.name] = parseInt(event.target.value)}
        else{
          current[event.target.name] = event.target.value;
        }
        console.log(current);
        this.setState({ editingItem: current });
        // this.setState({ [event.target.name]: event.target.value });
    
        // console.log(123);
      };
      handlePositionChange = (x, y) => {
        console.error(234);
        console.log(x, y);
        let current = this.state.editingItem;
    
        current.x = x;
        current.y = y;
        console.log(current);
        this.setState({ editingItem: current });
      
      };

      loadData2State =(eles)=>{
          console.log('loading data 2 state')
          console.log(eles)
          const { title,
          height,
          width,
          backgroundColor,
          borderRadius,
          borderThickness,
          borderColor,
          margin,
          padding,
          items } =eles.logo
          console.log(title,
            height,
            width,
            backgroundColor,
            borderRadius,
            borderThickness,
            borderColor,
            margin,
            padding,
            items )
          this.setState({height:height,
    //       width:width,
    //       backgroundColor:backgroundColor,
    //       borderRadius:borderRadius,
    //       borderThickness:borderThickness,
    //       borderColor:borderColor,
    //       margin:margin,
    //       padding:padding,
    //     title:title,
    items:items})
      }


      foo = (logo)=>{
          console.log(23333)
          console.log(logo)
          this.setState({height:logo.height})
      }
    render() {
        let 
    owner,
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
      return (
        <Query
          query={GET_LOGO}
          variables={{ logoId: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            console.log("temp", data);
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            // this.loadData2State(data)
  
            return (    
               
              <Mutation
                mutation={UPDATE_LOGO}
                key={data.logo._id}
                onCompleted={(e) => {
  
                  this.props.history.push(`/`);
                }}
              >
                {(updateLogo, { loading, error }) => (
               
               <div className="container">
                    <QueryHelper foo={this.foo} uid ={this.props.match.params.id} />
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
                         console.log(123)
       
                         // console.log(width,height,this.state.items,backgroundColor,borderRadius,borderColor,borderThickness,margin,padding)
       
                         console.log( "temp owner",
                        "temp title",
                        width.value,
                       height.value,
                       this.state.items,
                backgroundColor.value,
                     parseInt(borderRadius.value),
                        parseInt(borderThickness.value),
                    borderColor.value,
                   parseInt(margin.value),
                    parseInt(padding.value))
       
       
                         updateLogo({
                           variables: {
                               id:this.props.match.params.id,
                             owner:JSON.parse(window.localStorage.getItem('user'))["_id"]||"no user",
                             title:title.value,
                              width:parseInt(width.value),
                              height:parseInt(height.value),
                             items:this.state.items,
                             backgroundColor:backgroundColor.value,
                             borderRadius:parseInt(borderRadius.value),
                               borderThickness:parseInt(borderThickness.value),
                               borderColor:borderColor.value,
                               margin:parseInt(margin.value),
                               padding:parseInt(padding.value)
                           },
                         });
       
                         // owner.value=""
                         // title.value=""
                         width.value=""
                         height.value=""
                         // items.value=""
                         backgroundColor.value=""
                         borderRadius.value=""
                         borderThickness.value=""
                         borderColor.value=""
                         margin.value=""
                         padding.value="";
                       }
                     
                     
                     }
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
                               ref={(node) => {
                                 // text = node;
                               }}
                               placeholder="Text"
                               defaultValue=""
                               value={
                                 this.state.editingItem && this.state.editingItem.text
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
                               ref={(node) => {
                                 // color = node;
                               }}
                               placeholder="Color"
                               defaultValue="#00000"
                               value={
                                 this.state.editingItem && this.state.editingItem.color
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
                               ref={(node) => {
                                 // fontSize = node;
                               }}
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
                               ref={(node) => {
                                 // imgUrl = node;
                               }}
                               placeholder="img url"
                               defaultValue=""
                               value={
                                 this.state.editingItem && this.state.editingItem.url
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
                               ref={(node) => {
                                 // imgAlt = node;
                               }}
                               placeholder="img alt"
                               defaultValue=""
                               value={
                                 this.state.editingItem && this.state.editingItem.alt
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
                               ref={(node) => {
                                 // imgHeight = node;
                               }}
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
                               ref={(node) => {
                                 // imgWidth = node;
                               }}
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
                   {/* {loading && <p>Loading...</p>} */}
                   {/* {error && <p>Error :( Please try again</p>} */}
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
                       {/* {
                         this.state.items||data.logo.items.map((current) => {
                                console.error('current',current)
                                console.log(data.logo.height,data.logo.width)
                          return <Item
                             //  position={
                             //    {  x:current.x,
                             //      y:current.y}
                             //  }
                             handlePositionChange={this.handlePositionChange}
                             logoHeight={this.state.height}
                             logoWidth={this.state.width}
                             handleSelect={this.handleSelect}
                             item={current}
                           />
                       }
                         )} */}
                     </div>
                   </div>
                   1
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
                           //   defaultValue={data.logo.backgroundColor}
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
                           //   defaultValue={data.logo.backgroundColor}
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
                           //   defaultValue={data.logo.borderColor}
                         />
                       </div>
       
                       <div className="form-group">
                         <label htmlFor="borderThickness">
                           Border Thickness:&nbsp; {this.state.borderThickness || "0"}
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
       
                           //   defaultValue={data.logo.padding}
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
       
                           //   defaultValue={data.logo.padding}
                         />
                       </div>
       
                       {/* <button type="submit" className="btn btn-success">
                         Submit
                       </button> */}
                     </form>
                   </div>
                 </div>
               </div>
             </div>
                )}
              </Mutation>
            );
          }}
        </Query>
      );
    }
  }
  