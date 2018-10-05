import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";
import CreateMico from "./CreateMico/CreateMico";
import MicoManager from "./MicoManager/MicoManager";
import Error from "./Error/Error";
import Home from "./Home/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projectid: "0x12345"
    };
  }

  render() {
    return (
<BrowserRouter>
        <Switch>
          <Route path="/" render={props => <Home {...props} />} exact />
          <Route path="/createnew/:projectname" render={props => <CreateMico {...props} />} exact />
          <Route path="/manage/:projectid" render={props => <MicoManager {...props} />} exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
