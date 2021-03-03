import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../fbase";

const App = () => {

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="container">
      {init ? 
      <Router isLoggedIn={Boolean(userObj)} 
      userObj={userObj} /> 
      : <div>Loading...</div>
      }
      <footer>&copy; 2021 편리어답터. All rights reserved.</footer>
    </div>
  )
}

export default App;
