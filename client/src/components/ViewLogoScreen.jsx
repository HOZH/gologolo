import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      fontSize
      backgroundColor
      borderColor
      borderRadius
      borderThickness
      margin
      padding
      lastUpdate
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

class ViewLogoScreen extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.debug(data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // console.log(data.logo);
          // console.log(data.logo.text)
let {text,color,fontSize,backgroundColor,borderThickness,borderRadius,borderColor,margin,padding,lastUpdate,_id} = data.logo  ;     
 return (
   <div className="container">
     <div className="panel panel-default">
       <div className="panel-heading">
         <div className="bg-secondary">
           <h4 className=" btn btn-secondary">
             <Link className="text-white" to="/">
               Home
             </Link>
           </h4>
         </div>

         <h4 className="panel-title bg-danger text-white">
           &nbsp;&nbsp;View Logo
         </h4>
       </div>
       <div className="panel-body row">
         <div className="col-4">
           <dl>
             <dt>Text:</dt>
             <dd style={{whiteSpace: "pre"}}>{text}</dd>
             <dt>
               Color:
               <input disabled type="color" value={color}></input>
             </dt>
             <dd>{color}</dd>
             <dt>Font Size:</dt>
             <dd>{fontSize}</dd>

             <dt>
               Background Color:{" "}
               <input disabled type="color" value={backgroundColor}></input>
             </dt>
             <dd>{backgroundColor}</dd>
             <dt>Border Thickness</dt>
             <dd>{borderThickness}</dd>
             <dt>Border Radius</dt>
             <dd>{borderRadius}</dd>
             <dt>
               Border Color
               <input disabled type="color" value={borderColor}></input>
             </dt>
             <dd>{borderColor}</dd>

             <dt>Margin</dt>
             <dd>{margin}</dd>

             <dt>Padding</dt>
             <dd>{padding}</dd>

             <dt>Last Updated:</dt>
             <dd>{lastUpdate}</dd>
           </dl>
           <Mutation
             mutation={DELETE_LOGO}
             key={_id}
             onCompleted={() => this.props.history.push("/")}
           >
             {(removeLogo, { loading, error }) => (
               <div>
                 <form
                   onSubmit={(e) => {
                     e.preventDefault();
                     removeLogo({
                       variables: { id: _id },
                     });
                   }}
                 >
                   <Link to={`/edit/${_id}`} className="btn btn-success">
                     Edit
                   </Link>
                   &nbsp;
                   <button type="submit" className="btn btn-danger">
                     Delete
                   </button>
                 </form>
                 {loading && <p>Loading...</p>}
                 {error && <p>Error :( Please try again</p>}
               </div>
             )}
           </Mutation>
         </div>

         <div>
           <div
             className=""
             style={{
               color: color,
               fontSize: fontSize + "pt",
               backgroundColor: backgroundColor,
               border: borderThickness + "px solid " + borderColor,
               borderRadius: borderRadius + "px",
               padding: padding + "px",
               margin: margin + "px",
               position: "absolute",
               left: "40%",
               top: "10%",
               whiteSpace: "pre",
             }}
           >
             {data.logo.text}
           </div>
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

export default ViewLogoScreen;
