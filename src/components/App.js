import React, { useEffect, useState } from "react";
import Scraper from "./Scraper";

const App = () => {

  const [placeholder, setPlaceholder] = useState('Hi');

  useEffect(() => {
    fetch("/hello").then(res => res.json()).then(data => {
      setPlaceholder(data.result);
    });
  }, []);

  return (
    <div>
      {placeholder}
    </div>
  );
}

export default App;
