import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

const Detail = () => {

    const [prod, setProd] = useState();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.push("/");
        } else {
            console.log(location.state);
        }
    }, [history, location.state]);

    return (
        <>
            <Navigation />
            <div>
                <img src={location.state.image} alt={location.state.name} />
                <h4>{location.state.name}</h4>
                <h5>{location.state.price}</h5>
                <span>{location.state.score}</span>
            </div>
        </>
    );

}

export default Detail;