import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "../routes/Home";
import Best from "../routes/Best";
import Detail from "../routes/Detail";
import Navigation from "../components/Navigation";
import GS from "../routes/GS";
import SE from "../routes/SE";
import CU from "../routes/CU";

const Router = ({ isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      <Navigation isLoggedIn={isLoggedIn} userObj={userObj} />
      <Route path="/" exact={true} component={Home} userObj={userObj} />
      <Route path="/best" component={Best} />
      <Route path="/gs" component={GS} />
      <Route path="/se" component={SE} />
      <Route path="/cu" component={CU} />
      <Route path="/prod/:id" component={Detail} userObj={userObj} />
    </HashRouter>
  );
}

export default Router;