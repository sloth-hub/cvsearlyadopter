import React, { useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Best from "../routes/Best";
import Detail from "../routes/Detail";
import Navigation from "../components/Navigation";
import GS from "../routes/GS";
import SE from "../routes/SE";
import CU from "../routes/CU";
import Login from "../routes/Login";

const Router = ({ isLoggedIn, userObj }) => {

  useEffect(() => {
    console.log(isLoggedIn, userObj);
  }, []);
  return (
    <HashRouter>
      <Navigation isLoggedIn={isLoggedIn} userObj={userObj} />
      <Route path="/" exact={true} component={Home} userObj={userObj} />
      <Route path="/best" component={Best} />
      <Route path="/gs" component={GS} />
      <Route path="/se" component={SE} />
      <Route path="/cu" component={CU} />
      <Route path="/prod/:id" component={Detail} userObj={userObj} />
      <Redirect from="*" to="/" />
      <Switch>
        {isLoggedIn ? (
          <>
            <Redirect from="*" to="/" />
          </>
        ) : (
            <>
              <Route path="/login" component={Login} userObj={userObj} />
              <Redirect from="*" to="/" />
            </>
          )}
      </Switch>
    </HashRouter >
  );
}

export default Router;