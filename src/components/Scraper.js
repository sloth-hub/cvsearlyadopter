import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        // axios.get("/scraper").then(res => {
        //     if (res.status === 200) {
        //       setIsLoading(false);
        //     }
        //   });

    }, []);

    return (
        <div className="scraper_box">
            { isLoading ?
                <div className="scraper_loading">Loading...</div>
                : <div className="scraper_loading">scrap complete!</div>
            }
        </div>
    );

}

export default Scraper;