import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from './components/HomeScreen';
import EditLogoScreen from './components/EditLogoScreen';
import CreateLogoScreen from './components/CreateLogoScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import tempCreate from './components/TempCreate'
// import Navbar from './components/navbar/Navbar';
import Navbar from './components/navbar/Navtemp'
import LoginScreen from './components/loginScreen/LoginScreen'
import TempHome from './components/TempHome'
import RegisterScreen from './components/registerScreen/RegisterScreen'
<<<<<<< HEAD
import TempView from './components/viewScreen/TempView'
import TempEdit from './components/editScreen/TempEdit'
const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Navbar/>
               <Switch>
               {/* <Route exact path='/' component={HomeScreen} /> */}
               <Route exact path='/' component={HomeScreen} />
               <Route path='/register' component={RegisterScreen} />
{/* 
                <Route path='/edit/:id' component={EditLogoScreen} /> */}
                
                <Route path='/edit/:id' component={TempEdit} />
                <Route path='/create' component={tempCreate}/> />
                <Route path='/view/:id' component={TempEdit} />

                {/* <Route path='/view/:id' component={ViewLogoScreen} /> */}
                <Route path="/login" component={LoginScreen}/>

               </Switch>
            </div>
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
=======
import ChangePassword from './components/ChangePassword'

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Navbar />
        <Switch>
          {/* <Route exact path='/' component={HomeScreen} /> */}
          <Route exact path="/" component={HomeScreen} />
          <Route path="/change_password/:id/:token" component={ChangePassword} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/edit/:id" component={EditLogoScreen} />
          <Route path="/create" component={tempCreate} /> />
          <Route path="/view/:id" component={ViewLogoScreen} />
          <Route path="/login" component={LoginScreen} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
>>>>>>> 4b45f1880b3bf00bd8b705f1970a9369df75f6a5
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();
export {client}