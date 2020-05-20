import React from 'react';
import {NavLink} from 'react-router-dom';

export default  class LoggedOutLinks extends React.Component {
    render() {
        return (
            <ul className="nav-item nav-link">
                <li><NavLink class=""to="/register">Register</NavLink></li>
            </ul>
        );
    }
}

