import React from "react";
import { Link } from "react-router-dom";
import Scraper from "../components/Scraper";

const Navigation = () => {
    return (
        <nav>
            <ul className="navi_box">
                <li>
                    <Link to="/">편리어답터</Link>
                </li>
                <li>
                    <Link to="/best">BEST</Link>
                </li>
                <li>
                    <Link to="/">GS25</Link>
                </li>
                <li>
                    <Link to="/">7-ELEVEN</Link>
                </li>
                <li>
                    <Link to="/">CU</Link>
                </li>
            </ul>
            <Scraper />
        </nav>
    )
}

export default Navigation;