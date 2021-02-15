import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "../routes/Home";
import Best from "../routes/Best";
import Detail from "../routes/Detail";

const Router = () => {
    return (
        <HashRouter>
          <Route path="/" exact={true} component={Home} />
          <Route path="/best" component={Best} />
          <Route path="/prod/:id" component={Detail} />
        </HashRouter>
      );
}

export default Router;