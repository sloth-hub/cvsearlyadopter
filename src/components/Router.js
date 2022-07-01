import React from "react";
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

  return (
    <HashRouter>
      <Navigation isLoggedIn={isLoggedIn} userObj={userObj} />
      <Route exact path="/">
        <Home userObj={userObj} />
      </Route>
      <Route exact path="/best">
        <Best userObj={userObj} />
      </Route>
      <Route exact path="/gs">
        <GS userObj={userObj} />
      </Route>
      <Route exact path="/se">
        <SE userObj={userObj} />
      </Route>
      <Route exact path="/cu">
        <CU userObj={userObj} />
      </Route>
      <Route path="/prod/:id">
        <Detail userObj={userObj} />
      </Route>
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