import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Best from "../routes/Best";
import Detail from "../routes/Detail";
import Navigation from "../components/Navigation";

const Router = () => {
    return (
        <HashRouter>
          <Navigation />
          <Route path="/" exact={true} component={Home} />
          <Route path="/best" component={Best} />
          <Route path="/prod/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </HashRouter>
      );
}

export default Router;