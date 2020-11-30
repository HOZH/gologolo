import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from "./components/HomeScreen";

import tempCreate from "./components/CreateLogoScreen";
import LoginScreen from "./components/loginScreen/LoginScreen";
import RegisterScreen from "./components/registerScreen/RegisterScreen";
import ChangePassword from "./components/ChangePassword";
import TempEdit from "./components/editScreen/EditScreen";
import TempView from "./components/viewScreen/ViewScreen";

const client = new ApolloClient({ uri: "http://localhost:3000/graphql" });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginScreen} />

          <Route
            path="/change_password/:id/:token"
            component={ChangePassword}
          />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/edit/:id" component={TempEdit} />
          <Route path="/create" component={tempCreate} />
          <Route path="/view/:id" component={TempView} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/:id" component={HomeScreen} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();
