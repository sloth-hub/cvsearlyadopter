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
                window.location.reload();
            }
        });
    }

    return (
        <button onClick={() => scraping()}>
            {isClicked ? (isLoading ?
                <img src="/images/Reload-1s-30px.gif" alt="loading..." className="icon_loading" />
                : "scrap complete!"
            ) : <img src="/images/Reload-1s-30px.png" alt="scrap" className="icon_scrap" />}
        </button>
    );

}

export default Scraper;