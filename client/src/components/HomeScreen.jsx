import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
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
                                {logo.text === "" ? "unnamed logo" : logo.text}
                              </Link>
                            </div>
                          ))}
                        </div>
                        <div className="col s8">
                          <div id="home_banner_container">
                            Gologolo
                            <br />
                            @Hong
                          </div>
                          <div>
                            <Link
                              class="btn btn-primary col"
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
