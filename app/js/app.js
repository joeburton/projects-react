// Include jQuery and Bootstrap 4

// @todo remove jQuery and all the other guff.
window.$ = window.jQuery = require("jquery");
window.Popper = require("popper.js");
require("bootstrap");

// Import CSS
import "../css/app.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store from "./store";

// Layouts
import MainLayout from "./layouts/main-layout";

// Components
import Home from "./ui/home";
import CompaniesContainer from "./ui/companies-container";
import ProjectsContainer from "./ui/projects-container";

// Log state changes
store.subscribe(() => {
  console.log("Store updated: ", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={Home} />
        <Route path="/projects" component={ProjectsContainer} />
        <Route path="/companies" component={CompaniesContainer} />
      </Route>
      <Route>
        <Route path="/contact" />
        <Route path="/logout" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
