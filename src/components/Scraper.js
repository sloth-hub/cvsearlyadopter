import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const cheerio = require("cheerio");

    let sevenElevenData = [];

    useEffect(() => {
        scraping();
    }, []);

    const scraping = () => {

        axios.get("/seven/product/bestdosirakList.asp")
            .then(res => {
                if (res.status === 200) {
                    const html = res.data;
                    const $ = cheerio.load(html);
                    const children = [...$("div.dosirak_list > ul").children("li")];
                    const childs = children.slice(1, -1);
                    childs.forEach(v => {
                        sevenElevenData.push({
                            prodImg: `http://www.7-eleven.co.kr/${$(v).find("div.pic_product img").attr("src")}`,
                            prodName: $(v).find("div.infowrap div.name").text(),
                            prodPrice: $(v).find("div.infowrap div.price span").text()
                        });
                        
                    });
                    console.log(sevenElevenData);
                    if(sevenElevenData.length !== 0) {
                        setIsLoading(false);
                    }
                }
            }, (err) => console.log("error"));

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