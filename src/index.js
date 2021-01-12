/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Router, Route, Switch, HashRouter } from "react-router-dom";

// core components
import Dashboard from "layouts/Dashboard.js";
import SignIn from "layouts/SignIn.js";
import SignUp from "layouts/SignUp.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createHashHistory();

ReactDOM.render(
  <HashRouter history={hist}>
    <Switch>
      <Route path="/dashboard/" component={Dashboard} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={SignIn} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
