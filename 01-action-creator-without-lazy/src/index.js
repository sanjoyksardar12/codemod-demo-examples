require("@babel/polyfill");

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

import {
  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index.js';
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

const Routess = (props) =>
  <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
  </Router>;


ReactDOM.render(
<Provider store={store}>
  <Routess/>

</Provider>, document.getElementById("root"));
