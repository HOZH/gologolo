import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Banner from './Banner'

const GET_LOGOS = gql`
query{
  logos{
    title,
    _id,owner,items{type,text,color,fontSize,url,imgWidth,imgHeight,alt,id,z,x,y}
    ,backgroundColor,borderRadius,
    borderThickness,borderColor,
    margin,
    padding,lastUpdate
  }
  }

`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(12345)
                    console.log(data)

                    return (
                      <div className="container row">
                        <div className="col s4 bg-secondary text-white">
                          <h3>Recent Work</h3>
                          {data.logos.map((logo, index) => (
                            <div
                              key={index}
                              className="bg-danger text-white"
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                whiteSpace: "pre",
                              }}
                            >
                              <Link
                                className=" text-white"
                                to={`/view/${logo._id}`}
                              >
                                {logo.title === "" ? "unnamed logo" : logo.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                        <div className="col s8">
                          <Banner/>
                   
                          <div>
                            <Link
                              className="btn btn-primary col"
                              id="add_logo_button"
                              to="/create"
                            >
                              Add Logo
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
