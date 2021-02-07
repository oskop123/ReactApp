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
import { Route, Switch, HashRouter } from "react-router-dom";

// core components
import Dashboard from "layouts/Dashboard.js";
import SignIn from "layouts/SignIn.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createHashHistory();

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("access_token");
    return tokenString;
  };

  const [token, setToken] = React.useState(getToken());

  const saveToken = (tokens) => {
    sessionStorage.setItem("access_token", tokens.access_token);
    sessionStorage.setItem("refresh_token", tokens.refresh_token);
    setToken(tokens.access_token);
  };

  return { setToken: saveToken, token };
}

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <HashRouter history={hist}>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
