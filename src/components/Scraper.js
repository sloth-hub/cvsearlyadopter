import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);

    let seData = [];
    let gsData = [];
    let cuData = [];

    useEffect(() => {
        
        axios.get("/scraper").then(res => {
            if (res.status === 200) {
              setIsLoading(false);
            }
          });

    }, []);

    return (
        <>
            { isLoading ?
                <div>Loading...</div>
                : <div>scrap complete!</div>
            }
        </>
    );

}

export default Scraper;