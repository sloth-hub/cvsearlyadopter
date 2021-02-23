import React, { useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    
    const scraping = () => {
        setIsClicked(true);
        axios.get("/scraper").then(res => {
            if (res.status === 200) {
                setIsLoading(false);
                setIsClicked(false);
            }
        });
    }

    return (
        <div className="scraper_box">
            <button onClick={() => scraping()}>
                {isClicked ? (isLoading ?
                    "Loading..."
                    : "scrap complete!"
                ) : "scrap" }
            </button>

        </div>
    );

}

export default Scraper;