import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Detail = () => {

    const [prod, setProd] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.push("/");
            return () => setProd("");
        } else {
            setProd(location.state);
        }
    }, [history, location.state]);

    return (
        <>
            <div>
                <img src={prod.image} alt={prod.name} />
                <h4>{prod.name}</h4>
                <h5>{prod.price}</h5>
                <span>{prod.score}</span>
            </div>
        </>
    );

}

export default Detail;