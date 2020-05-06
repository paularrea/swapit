import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import Landing from "./pages/Landing";
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {
  render() {
    return (
      <AuthProvider>
       
        <div>
          

          <Switch>
          <AnonRoute exact path="/" component={Landing} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
       
      </AuthProvider>
    );
  }
}

export default App;
