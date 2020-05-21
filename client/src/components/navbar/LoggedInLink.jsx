

import React from 'react';
import {NavLink} from 'react-router-dom';
// import {logoutHandler} from '../../store/database/asynchHandler'

export default  class LoggedInLinks extends React.Component {

  
    render() {
        return (
            <ul style={{listStyle: 'none', display:'inline'}}className="">
                <li  style={{display:'inline'}}><NavLink  className="btn btn-secondary" to="/register">Register</NavLink></li>
                <li style={{ display:'inline'}}><NavLink className="btn btn-secondary" to="/">Login</NavLink></li>
            </ul>
        );
        
    };
}
