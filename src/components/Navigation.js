import React from "react";
import { Link } from "react-router-dom";
import Scraper from "../components/Scraper";

const Navigation = () => {
    return (
        <header>
            <nav>
                <ul className="navi_box">
                    <li>
                        <Link to="/" replace>편리어답터</Link>
                    </li>
                    <li>
                        <Link to="/best" replace>BEST</Link>
                    </li>
                    <li>
                        <Link to="/gs" replace>GS25</Link>
                    </li>
                    <li>
                        <Link to="/se" replace>7-ELEVEN</Link>
                    </li>
                    <li>
                        <Link to="/cu" replace>CU</Link>
                    </li>
                </ul>
                <Scraper />
            </nav>
        </header>
    )
}

export default Navigation;