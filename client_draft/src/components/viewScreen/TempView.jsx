import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "../Item";
import { v4 as uuidv4 } from "uuid";
import gql from "graphql-tag";
import { Query, Mutation }from "react-apollo";
import {useMutation,useQuery} from '@apollo/react-hooks'
// import QueryHelper from './QueryHelper'
import html2canvas from 'html2canvas';
import base64url from 'base64url'
import domtoimage from 'dom-to-image';
const GET_LOGO = gql`
  query logo($logoId: String!) {

      logo(id: $logoId){
        title,
        owner,items{type,text,color,fontSize,url,imgWidth,imgHeight,alt,id,z,x,y}
        ,backgroundColor,borderRadius,
        borderThickness,borderColor,
        height,
        width,
        margin,
        padding,lastUpdate
      }
      
  }
`;
const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id: $id) {
      _id
    }
  }
`;


let cLogo = null;

export default class EditLogoScreen extends Component {

  // download = e => {
  //   console.log(e);
  //   fetch(e, {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       "Access-Control-Allow-Origin":"*"
  //     }
  //   })
  //     .then(response => {
  //       response.arrayBuffer().then(function(buffer) {
  //         const url = window.URL.createObjectURL(new Blob([buffer]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", "image.png"); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //         console.log(23333)
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
    
    state = {
        title:"temp title",
        height: 150,
        width: 200,
        backgroundColor: null,
        borderRadius: 0,
        borderThickness: 0,
        borderColor: null,
        margin: 0,
        padding: 0,
        items:[]
        ,editingItem: { type: "none" }
    
        ,need2Load :true
    };

 handlePositionChange = ()=>{}
    handleSelect = ()=>{}
    
    
  
      componentDidMount() {
        console.error("temp1 did mount");
        console.log(cLogo)
        
        // const [get_logo,{data}] = useQuery(GET_LOGO)

        // let temp =get_logo()
        // console.error('c mounted')
        // console.log(temp)
      }
      componentWillUnmount() {
        // window.location.reload(true);
        console.error("temp will unmount");
      }
     
    
    
     baz = ()=>{}
      force=()=>{
          console.log('2djfsakljfskldsajflkajlkdfajslkdfasjlkdafjdslkjdfasljkl')
        this.forceUpdate()
      }
    
    

 
    
    
     

      feedbackItem=(e)=>{
        //   console.error(e)
        //   console.log(this.state.items.length)
        //   this.setState({items:[...this.state.items,e]},console.log(this.state.items.length))
      }
    render() {
      let temp_token=window.localStorage.getItem('token')
      temp_token=temp_token.substring(1,temp_token.length-1)
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
        context={{
          headers: {
            authorization: temp_token
          }
        }}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        
        {({ loading, error, data }) => {
        console.debug(data);
        console.log('fdsalfjhlkadsjfkljdsaklfdjalkSDkjflkasdjlkfj')
        console.log(data)
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return(

          <div className="container">
          {/* <QueryHelper foo={this.foo} uid ={this.props.match.params.id} /> */}
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

         <div className="btn btn-success" id="p1" onClick={()=>{
           this.props.history.push(`/edit/`+this.props.match.params.id);
         }}>
                  edit
                </div>
                <div className="btn btn-success" onClick={
                  ()=>{

       
// this.download("http://placeimg.com/300/300")
                      html2canvas(document.querySelector('#pic'),{
                        allowTaint: true,
                          useCORS: true,
                        logging: true,
                        proxy:"http://placeimg.com"
                      }).then(function(canvas) {
                  
                          console.log(canvas);
                          console.log(canvas.toDataURL())
                          // console.log(base64url.decode())
                          
                          // saveAs(canvas.toDataURL(), 'file-name.png');

                          // saveAs=(canvas.toDataURL, 'file-name.png')=> {

                            var link = document.createElement('a');
                            link.id='a99'
                        
                            if (typeof link.download === 'string') {
                              console.log(1)

                        
                                link.href = canvas.toDataURL();
                                link.download = 'file-name.png';
                        
                                //Firefox requires the link to be in the body
                                document.body.appendChild(link);
                        
                                //simulate click
                                link.click();
                        
                                //remove the link when done
                                document.body.removeChild(link);
                        
                            } else {
                              console.log(2)
                                window.open(canvas.toDataURL());
                        
                            }
                        
                      }
                      
                      
                      );
                  // });
                  }
                }>
                  save
                </div>


                <Mutation
                   context={{
                    headers: {
                      authorization: temp_token
                    }
                  }}
             mutation={DELETE_LOGO}
             key={this.props.match.params.id}
             
            
            //  onCompleted={}
           >
             {(removeLogo, { loading, error }) => (
                  <div className="btn btn-danger" onClick={()=>{
           console.log(123)
           removeLogo({ variables: {id:this.props.match.params.id}})
          //  this.props.history.push("/5ec4af58b0355227fca40fb9")
           console.log(window.localStorage.getItem('user')._id)

           this.props.history.push("/"+JSON.parse(window.localStorage.getItem('user'))._id)


         }}>

           
                    delete
                  </div>
             )}
                  </Mutation>
         </div>
         {/* {loading && <p>Loading...</p>} */}
         {/* {error && <p>Error :( Please try again</p>} */}
         <div className="col-7">
           <div
           id='pic'
             onClick={() => {
               console.log("qwe");
              //  this.unselect();
             }}
             style={{
               left: "40%",
               top: "10%",
               position: "absolute",
               whiteSpace: "pre",

               width: data.logo.width + "px",
               height: data.logo.height + "px",

               backgroundColor: data.logo.backgroundColor || "#00e100",
               border:
                 (data.logo.borderThickness || borderThickness) +
                 "px solid " +
                 (data.logo.borderColor || "#000000"),
               borderRadius:
                 (data.logo.borderRadius || borderRadius) + "px",
               padding: (data.logo.padding || padding) + "px",
               margin: (data.logo.margin || margin) + "px",
             }}
           >
               {/* {this.state.need2Load }
               {23333} */}
             {
              data.logo.items.map((current) => {
                      console.error('current',current)
                      console.log(data.logo.height,data.logo.width)
                return <Item
                   //  position={
                   //    {  x:current.x,
                   //      y:current.y}
                   //  }
                   feedbackItem={this.feedbackItem}
                   handlePositionChange={this.handlePositionChange}
                   logoHeight={data.logo.height}
                   logoWidth={data.logo.width}
                   handleSelect={this.handleSelect}
                   item={current}
                 />
             }
               )
               }
           </div>
         </div>
         
         <div className="col-2">
        
         </div>
       </div>
     </div>
   </div>
        );
        
        
        
        
        }}




      </Query>
      );
    }
  }
  