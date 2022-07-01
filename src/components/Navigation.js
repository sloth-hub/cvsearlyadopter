import React from "react";
import { Link, useHistory } from "react-router-dom";
import { authService } from "../fbase";
import Scraper from "../components/Scraper";

const Navigation = ({ isLoggedIn, userObj }) => {

    const history = useHistory();

    const onLogOutClick = () => {
        const ok = window.confirm("Are you sure you want to log out?");
        if (ok) {
            authService.signOut();
            history.push("/");
            window.location.reload();
        }
    }

    return (
        <header>
            <nav>
                <ul className="navi_box left">
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
                <ul className="navi_box right">
                    <li>
                        <Scraper />
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <button onClick={onLogOutClick} className="formBtn">
                                LOGOUT
                            </button>
                            <span>{userObj.displayName}</span>
                        </li>
                    ) : (
                            <li>
                                <Link to="/login" replace>Login</Link>
                            </li>
                        )}

                </ul>
            </nav>
        </header>
    )
}

export default Navigation;