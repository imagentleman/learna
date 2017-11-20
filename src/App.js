import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Learna from "./Learna.js";
import Examples from "./Examples.js";
import Home from "./Home.js";
import "./codemirror.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/learna" component={Learna} />
          <Route path="/examples" component={Examples} />
        </div>
      </Router>
    );
  }
}

export default App;
