
import React from 'react';
import {Link} from 'react-router-dom';
import LoggedInLink from './LoggedInLink';
import LoggedOutLink from './LoggedOutLink';


export default class Navbar extends React.Component {

    render() {
        const {auth, profile} = this.props;
        // const links = auth.uid ? <LoggedInLink profile={profile} auth={auth}/> : <LoggedOutLink/>;
        const links =  <LoggedOutLink/>;


        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to={"/"} className="nav-item nav-link">Gologolo</Link>
                    {/* <Link to="/admin" className="tester">databseTester</Link> */}
                    {/* {databaseTester} */}
                    {links}
                </div>
            </nav>
        );
    };
}
