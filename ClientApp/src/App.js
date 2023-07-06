import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Transaction from "./components/Transaction";
import { NavMenu } from "./components/NavMenu";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/transactions" element={<Transaction />} />
        </Routes>
    );
  }
}
