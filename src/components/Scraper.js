import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const cheerio = require("cheerio");

    let seData = [];
    let gsData = [];
    let cuData = [];

    useEffect(() => {
        
    }, []);

    // const getSe = axios.get("/seven/product/bestdosirakList.asp");
    // const getGs = axios.get("/gs/gscvs/ko/products/youus-freshfood");
    // const getCu = axios.get("/cu/product/product.do?category=product&depth2=4");

    const scraping = async () => {

        // await axios.all([getGs, getCu])
        //     .then(axios.spread((...res) => {

        //         const resGs = res[0];
        //         const resCu = res[1];

        //         if (resGs.status === 200 && resCu.status === 200) {
        //             scrapingGs(resGs);
        //             scrapingCu(resCu);
        //         }

        //     })).catch(err => console.log(err));

    }
    const scrapingSe = (resSe) => {

    }
    const scrapingGs = (resGs) => {

    }
    const scrapingCu = (resCu) => {

    }

    return (
        <>
            { isLoading ?
                <div>Loading...</div>
                : <div>scrap</div>
            }
        </>
    );

}

export default Scraper;