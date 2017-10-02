import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "whatwg-fetch";

class App extends Component {
  componentDidMount() {
    fetch("/cya")
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log("parsed json", json);
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React!!!!! Choose your adventure. I'm not even reloading!
          </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
