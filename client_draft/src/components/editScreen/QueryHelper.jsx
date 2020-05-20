import React from 'react'
import gql from "graphql-tag";
import { Query, Mutation }from "react-apollo";
import {useMutation,useQuery} from '@apollo/react-hooks'
import client from './../../index'

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
export default function QueryHelper(props) {
    
        console.log(234,'\n\n\n\n\n\n')
        console.log(props)
        console.log(props.uid)
        //   const [get_logo,{data}] = useQuery(GET_LOGO)

        // let temp =get_logo()
        // console.error('c mounted')
        // console.log(temp)
    
    return (
        <Query
        query={GET_LOGO}
        variables={{ logoId: props.uid }}
      >


{({ loading, error, data }) => {
          console.debug(data);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // console.log(data.logo);
          // console.log(data.logo.text)
          console.log(data)
          props.foo(data)
 return (
     <div></div>
        );
        }}
</Query>

        
    )
}
