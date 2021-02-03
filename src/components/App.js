import React, { useEffect, useState } from "react";
import axios from "axios";
import Scraper from "./Scraper";

const App = () => {

  const [placeholder, setPlaceholder] = useState('Hi');

  useEffect(() => {

    axios.get("/scrapper").then(res => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      {placeholder}
    </div>
  );
}

export default App;
