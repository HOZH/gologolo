import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class componentName extends Component {
    render() {
        return (
            <div className="bg-secondary">
            <h4 className=" btn btn-secondary">
              <Link className="text-white" to={window.localStorage.getItem('user')?'/'+JSON.parse(window.localStorage.getItem('user'))._id:'/login'}>
                Home
              </Link>
            </h4>
          </div>
        )
    }
}
