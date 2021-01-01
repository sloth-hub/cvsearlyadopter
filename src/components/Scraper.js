import React, { useEffect, useState } from "react";
import axios from "axios";

const Scraper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const cheerio = require("cheerio");

    let seData = [];
    let gsData = [];
    let cuData = [];

    useEffect(() => {
        scraping();
    }, []);
    
    const getSE = axios.get("/seven/product/bestdosirakList.asp");
    const getGs = axios.get("/gs/gscvs/ko/products/youus-freshfood");
    const getCu = axios.get("/cu/product/product.do?category=product&depth2=4&depth3=1");
    
    const scraping = () => {

        axios.all([getSE, getGs, getCu])
            .then(axios.spread((...res) => {

                const resSe = res[0];
                const resGs = res[1];
                const resCu = res[2];

                if (resSe.status === 200 && resGs.status === 200 && resCu.status === 200) {
                    scrapingSE(resSe);
                    scrapingGs(resGs);
                    scrapingCu(resCu);
                }

            })).catch(err => console.log("error", err));

    }
    const scrapingSE = (resSe) => {

        const html = resSe.data;
        const $ = cheerio.load(html);
        const children = [...$("div.dosirak_list > ul").children("li")];
        const childs = children.slice(1, -1);
        childs.forEach(v => {
            seData.push({
                prodImg: `http://www.7-eleven.co.kr/${$(v).find("div.pic_product img").attr("src")}`,
                prodName: $(v).find("div.infowrap div.name").text(),
                prodPrice: $(v).find("div.infowrap div.price span").text()
            });

        });
        if(seData.length !== 0) {
            console.log(seData);
            setIsLoading(false);
        }

    }
    const scrapingGs = (resGs) => {
        const html = resGs.data;
        const $ = cheerio.load(html);
        // const children = $("ul.prod_list");
    }
    const scrapingCu = (resCu) => {
        const html = resCu.data;
        const $ = cheerio.load(html);
        // console.log(html);
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