import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class componentName extends Component {
    render() {
        return (
            <div className="bg-secondary">
            <h4 className=" btn btn-secondary">
              <Link className="text-white" to="/">
                Home
              </Link>
            </h4>
          </div>
        )
    }
}
